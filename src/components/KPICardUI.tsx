import { useState, useEffect } from "react";

interface KPIData {
    title: string;
    count: number;
}

interface KPICardProps {
    title?: string;
    count?: number;
    link?: string;
    dataUrl?: string;
}

export default function KPICardUI({
    title,
    count,
    link,
    dataUrl = "/data_extracted/total_products.json"
}: KPICardProps = {}) {
    const [kpiData, setKpiData] = useState<KPIData[]>([]);

    // useEffect: ejecuta codigo cada vez que un componente se renderiza
    useEffect(() => {
        fetch(dataUrl)
            .then((response) => {
                if (!response.ok) {
                    // Intento con ruta alternativa si la principal falla
                    return fetch("/public" + dataUrl);
                }
                return response;
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar el JSON. Revisa la ruta de acceso a datos");
                }
                return response.json() as Promise<KPIData[]>;
            })
            .then((data) => {
                setKpiData(
                    data.map((item) => ({
                        ...item,
                        count: Number(item.count),
                    }))
                );
            })
            .catch(console.error);
    }, [dataUrl]); // un array con dependencias asegura que solo se recargue si cambia la URL

    const currentItem = kpiData[0];
    const displayTitle = title ?? currentItem?.title ?? "Total de productos";
    const rawCount = count ?? currentItem?.count ?? 0;

    // Formatear con separador de miles en español (ej. 1.465) igual al prototipo
    const formattedCount = rawCount ? rawCount.toLocaleString("es-ES") : "0";

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
                    <span className="kpi-value">{formattedCount}</span>
                </div>
            </div>

            {/* Parte inferior estilo bandeja / footer del prototipo de Figma */}
            <div className="kpi-footer-bar" />
        </div>
    );
}

export { KPICardUI as KPICard };
