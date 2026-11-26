export interface KPIData {
    title?: string;
    count?: number | string;
    value?: number | string;
    [key: string]: unknown;
}

export type KPIKey = 'totalProducts' | 'averageRating' | 'averageDiscount';

export interface BarChartItem {
    category: string;
    count: number;
}

export interface DonutChartItem {
    rango_rating: string;
    count: number;
}

export interface DashboardData {
    kpis: Record<KPIKey, KPIData>;
    barChart: BarChartItem[];
    donutChart: DonutChartItem[];
}

export const DASHBOARD_DATA_URL = '/data_extracted/dashboard_data.json';

export async function fetchDashboardData(url: string = DASHBOARD_DATA_URL): Promise<DashboardData> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al cargar el JSON compartido desde ${url}.`);
    }
    return response.json() as Promise<DashboardData>;
}
