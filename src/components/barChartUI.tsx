import { useState, useEffect } from "react";
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import {
    DASHBOARD_DATA_URL,
    fetchDashboardData,
    type BarChartItem,
} from "../types/dashboardData";

interface BarChartProps {
    data?: BarChartItem[] | null;
    url?: string;
}

export default function BarChart({ data, url }: BarChartProps = {}) {
    const usesExternalData = data !== undefined;
    const [fetchedCounts, setFetchedCounts] = useState<BarChartItem[]>([]);

    useEffect(() => {
        if (usesExternalData) {
            return;
        }

        let isMounted = true;
        fetchDashboardData(url ?? DASHBOARD_DATA_URL)
            .then((json) => {
                if (!isMounted) return;
                setFetchedCounts(json.barChart ?? []);
            })
            .catch(console.error);

        return () => {
            isMounted = false;
        };
    }, [usesExternalData, url]);

    const counts = (usesExternalData ? (data ?? []) : fetchedCounts).map((item) => ({
        ...item,
        count: Number(item.count),
    }));

    const topCategories = [...counts]
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

    return (
        <MuiBarChart 
            xAxis={[
                {
                    scaleType: "band",
                    data: topCategories.map((item) => item.category),
                    tickLabelInterval: () => true,
                    tickLabelStyle: {
                    angle: -30,
                    textAnchor: 'end',
                    fontSize: 11,
                    },
                    colorMap: {
                        type: 'ordinal',
                        colors: ['#29E872', '#FF306C', '#9F54DC', '#1E6BF0', '#5E5E87', '#3a3a3a']
                    },
                    categoryGapRatio: 0.2,   
                    height: 110,
                },
            ]}
            series={[
                {
                    data: topCategories.map((item,) => item.count),
                    barLabel: 'value', barLabelPlacement: 'outside'
                },
            ]}
            height={300}
            margin={{ bottom: 8, left: 45, right: 20, top: 20 }}
            grid={{ horizontal: true }}
            borderRadius={5}

        />  
    )
}
