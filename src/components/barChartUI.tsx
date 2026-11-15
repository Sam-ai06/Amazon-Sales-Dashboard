import { useState, useEffect } from "react";
import Papa from 'papaparse'
import { BarChart as MuiBarChart} from '@mui/x-charts/BarChart';



interface CSVRow{
    category: string
    count: number
}

export default function BarChart(){
    const [counts, setCounts] = useState<CSVRow[]>([])

    useEffect(() => {
        fetch('/public/data_extracted/products_per_category_barChart.csv')
        .then((response) =>{
            if(!response.ok){
                throw new Error("Error al cargar el csv. Revisa la ruta e intentalo de nuevo.")
            }
            return response.text();
        })
        .then((csv) =>{
            const result = Papa.parse<CSVRow>(csv,{
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            });
            setCounts(result.data)

            
        })
        .catch(console.error)

    }, [])

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
            width = {800}
            height = {500}
            margin = {{bottom: -3}}
            grid={{ horizontal: true }}
            borderRadius={5}

        />  
    )
}
