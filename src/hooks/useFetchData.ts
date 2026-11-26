import { useEffect, useState } from "react";
import { obtenerDashboardData } from "../services/dashboardDataService";
import type { DashboardData } from "../types/dashboardData";

export default function useFetchData(info: string) {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        if (!info) {
            return;
        }

        let isMounted = true;

        async function loadData() {
            try {
                const datos = await obtenerDashboardData(info);
                if (isMounted) {
                    setData(datos);
                }
            } catch (error) {
                console.error("Error al obtener los datos de Firebase:", error);
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, [info]);

    return { data };
}
