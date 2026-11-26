import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { DashboardData } from "../types/dashboardData";


export async function obtenerDashboardData(ruta: string): Promise<DashboardData | null> {
    const referencia = ref(database, ruta);
    const snapshot = await get(referencia);
    if (snapshot.exists()) {
        return snapshot.val() as DashboardData;
    }
    return null;
}