import { useState, useEffect } from "react";
import Papa from 'papaparse'
import { PieChart, pieClasses } from "@mui/x-charts/PieChart";

interface RatingData{
    rango_rating: string;
    count: number;
}

export default function DonutChart(){
    const [ratings, setRatings] = useState<RatingData[]>([]);

    //useEffect: ejecuta codigo cada vez que un componente se renderiza
    useEffect(() =>{
        fetch('/public/data/rango_ratings.csv')
        .then((response) => {
            if (!response.ok){
                throw new Error("Error al cargar el csv. Revisa la ruta de acceso a datos")
            }
            return response.text();
        })
        .then((csv) =>{
            const result = Papa.parse<RatingData>(csv,{
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            });

            setRatings(result.data)
        })
        .catch(console.error)
        
    }, []); //un array vacío significa que se ejecuta una sola vez al montar el componente
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