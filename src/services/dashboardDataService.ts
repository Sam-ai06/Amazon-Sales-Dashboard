import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { BarChartItem, DashboardData, DonutChartItem } from "../types/dashboardData";

function normalizeArray<T>(raw: unknown): T[] {
    if (Array.isArray(raw)) {
        return raw as T[];
    }
    if (raw && typeof raw === "object") {
        return Object.values(raw) as T[];
    }
    return [];
}

export async function obtenerDashboardData(ruta: string): Promise<DashboardData | null> {
    // Si las reglas de Firebase protegen la raíz "/" y habilitan lectura por nodo,
    // leemos los nodos principales en paralelo para armar el objeto DashboardData.
    if (ruta === "/") {
        const [kpisSnap, barSnap, donutSnap] = await Promise.all([
            get(ref(database, "kpis")),
            get(ref(database, "barChart")),
            get(ref(database, "donutChart")),
        ]);

        if (!kpisSnap.exists() && !barSnap.exists() && !donutSnap.exists()) {
            return null;
        }

        return {
            kpis: kpisSnap.exists() ? kpisSnap.val() : {},
            barChart: barSnap.exists() ? normalizeArray<BarChartItem>(barSnap.val()) : [],
            donutChart: donutSnap.exists() ? normalizeArray<DonutChartItem>(donutSnap.val()) : [],
        } as DashboardData;
    }

    const referencia = ref(database, ruta);
    const snapshot = await get(referencia);
    if (snapshot.exists()) {
        const value = snapshot.val() as DashboardData;
        return {
            ...value,
            barChart: normalizeArray<BarChartItem>(value.barChart),
            donutChart: normalizeArray<DonutChartItem>(value.donutChart),
        };
    }
    return null;
}
