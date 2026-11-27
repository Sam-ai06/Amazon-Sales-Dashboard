import { useState, useEffect } from "react";
import { PieChart, pieClasses } from "@mui/x-charts/PieChart";
import {
    DASHBOARD_DATA_URL,
    fetchDashboardData,
    type DonutChartItem,
} from "../types/dashboardData";

interface DonutChartProps {
    data?: DonutChartItem[] | null;
    url?: string;
}

export default function DonutChart({ data, url }: DonutChartProps = {}) {
    const usesExternalData = data !== undefined;
    const [fetchedRatings, setFetchedRatings] = useState<DonutChartItem[]>([]);

    // Cargar la sección donutChart del JSON compartido si no llega vía props
    useEffect(() => {
        if (usesExternalData) {
            return;
        }

        let isMounted = true;
        fetchDashboardData(url ?? DASHBOARD_DATA_URL)
            .then((json) => {
                if (!isMounted) return;
                setFetchedRatings(json.donutChart ?? []);
            })
            .catch(console.error);

        return () => {
            isMounted = false;
        };
    }, [usesExternalData, url]);

    const ratings = (usesExternalData ? (data ?? []) : fetchedRatings).map((item) => ({
        ...item,
        count: Number(item.count),
    }));
    return (
        <PieChart
      series={[
        {
          data: ratings.map((item, index) => ({
            id: index,
            value: item.count,
            label: item.rango_rating,
          })),
          innerRadius: 75, // lo convierte en donut
          outerRadius: 110,
          cx: "55%",
          paddingAngle: 1,
          startAngle: 45,
          cornerRadius: 2,
          highlightScope: { fade: 'global', highlight: 'item' }
        },
        
      ]}    
      width={360}
      height={280}
      sx={{ //con esto elimino el borde que contiene cada sector del chart
            [`& .${pieClasses.arc}`]: {
                stroke: "none",
            },
        [`& .${pieClasses.focusIndicator}`]: {
            stroke: "none",
            },
      }}
    />
    )
}