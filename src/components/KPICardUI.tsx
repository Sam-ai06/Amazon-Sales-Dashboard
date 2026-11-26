import { useState, useEffect } from "react";
import {
    DASHBOARD_DATA_URL,
    type DashboardData,
    type KPIData,
    type KPIKey,
} from "../types/dashboardData";

export type { KPIData, KPIKey };

export interface KPICardProps {
    data?: KPIData | null;
    kpiKey?: KPIKey;
    isLoading?: boolean;
    url?: string;
    dataUrl?: string;
    title?: string;
    count?: number | string;
    link?: string;
    formatter?: (value: number | string, item?: KPIData) => string;
}

function extractKpiItem(payload: unknown, kpiKey?: KPIKey): KPIData | null {
    if (Array.isArray(payload) && payload.length > 0) {
        return payload[0] as KPIData;
    }
    if (payload && typeof payload === "object") {
        const record = payload as Partial<DashboardData>;
        if (record.kpis && kpiKey && record.kpis[kpiKey]) {
            return record.kpis[kpiKey];
        }
        return payload as KPIData;
    }
    return null;
}

export default function KPICardUI({
    data,
    kpiKey,
    isLoading,
    url,
    dataUrl,
    title,
    count,
    link,
    formatter,
}: KPICardProps = {}) {
    const usesExternalData = data !== undefined;
    const fetchUrl = url || dataUrl || (kpiKey ? DASHBOARD_DATA_URL : undefined);
    const [fetchedItem, setFetchedItem] = useState<KPIData | null>(null);
    const [fetchLoading, setFetchLoading] = useState<boolean>(!usesExternalData && Boolean(fetchUrl));

    // Cargar datos dinámicamente desde el JSON compartido cuando no se reciben vía props
    useEffect(() => {
        if (usesExternalData || !fetchUrl) {
            return;
        }

        let isMounted = true;
        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    // Intento con ruta alternativa si la principal falla
                    return fetch("/public" + fetchUrl);
                }
                return response;
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el JSON desde ${fetchUrl}.`);
                }
                return response.json();
            })
            .then((payload: unknown) => {
                if (!isMounted) return;
                setFetchedItem(extractKpiItem(payload, kpiKey));
                setFetchLoading(false);
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error(err);
                setFetchLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [usesExternalData, fetchUrl, kpiKey]);

    const kpiItem = usesExternalData ? data : fetchedItem;
    const loading = isLoading ?? (usesExternalData ? false : fetchLoading);

    // Resolver título: prop explícito -> título de la data -> fallback
    let displayTitle = title ?? kpiItem?.title ?? "Métrica";
    if (!title && displayTitle === "Rating promedio de productos") {
        displayTitle = "Rating promedio";
    }

    // Resolver valor: prop explícito -> valor de la data -> 0
    const rawValue = count ?? kpiItem?.count ?? kpiItem?.value ?? 0;

    // Formatear valor para que se muestre correctamente según el tipo de métrica
    const formatValue = (raw: number | string, itemTitle: string, targetUrl: string): string => {
        if (formatter) {
            return formatter(raw, kpiItem || undefined);
        }

        // Si ya viene preformateado (ej. "4.09/5" o "47.7%")
        if (typeof raw === "string" && (raw.includes("%") || raw.includes("/"))) {
            return raw;
        }

        const strVal = String(raw).trim();
        const num = typeof raw === "number" ? raw : parseFloat(strVal);

        if (isNaN(num)) {
            return strVal || "0";
        }

        // Si es métrica de rating (ej. "4.0965846..." -> "4.09/5")
        const isRating =
            kpiKey === "averageRating" ||
            /rating/i.test(itemTitle) ||
            /rating/i.test(targetUrl) ||
            (num > 0 && num <= 5 && !Number.isInteger(num));

        // Si es métrica de porcentaje o descuento (ej. 47.6914... -> "47.7%")
        const isDiscount =
            kpiKey === "averageDiscount" ||
            /descuento|discount|porcentaje|%/i.test(itemTitle) ||
            /discount|descuento/i.test(targetUrl);

        if (isRating) {
            const truncated = (Math.floor(num * 100) / 100).toFixed(2);
            return `${truncated}/5`;
        }

        if (isDiscount) {
            const val = num % 1 === 0 ? num : (Math.round(num * 10) / 10).toFixed(1);
            return `${val}%`;
        }

        // Número entero estándar (ej. 1465 -> "1.465")
        if (Number.isInteger(num)) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        return num.toLocaleString("es-ES", { maximumFractionDigits: 2 });
    };

    const formattedValue = formatValue(rawValue, displayTitle, fetchUrl || "");

    return (
        <div className="kpi-card">
            <div className="kpi-content">
                <div className="kpi-header">
                    <span className="kpi-title">{displayTitle}</span>
                    <a
                        href={link ?? "#"}
                        className="kpi-link-btn"
                        aria-label={`Ver más sobre ${displayTitle}`}
                        title="Ver detalle"
                    >
                        <svg
                            className="kpi-external-icon"
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </div>

                <div className="kpi-value-container">
                    <span className="kpi-value">
                        {loading ? "..." : formattedValue}
                    </span>
                </div>
            </div>

            {/* Parte inferior estilo bandeja / footer del prototipo de Figma */}
            <div className="kpi-footer-bar" />
        </div>
    );
}

export { KPICardUI as KPICard };
