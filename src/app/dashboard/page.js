'use client'
import React, { useState, useEffect, Suspense } from "react";
import Loading from './loading.js';
import { Card, Title, BarChart, Subtitle } from "@tremor/react";

import { useSession } from 'next-auth/react'

const Page = () => {

    const { data: session, status } = useSession()
    console.log(session, status)

    const URL_API = 'http://localhost:3001/api/'
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    function formatToCLP(value) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    }

    const chartdata = [
        {
          name: "Amphibians",
          "Precio": 2488,
        },
        {
          name: "Birds",
          "Precio": 1445,
        },
        {
          name: "Crustaceans",
          "Precio": 743,
        },
    ];

    const dataFormatter = (number) => {
        return "$ " + Intl.NumberFormat("us").format(number).toString();
    };
      

    const getMenusCount = async () => {
        try {
            const response = await fetch(URL_API + 'menus');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            console.log(data)
            setCount(data.length)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        
    }

    const getTotalPrice = async () => {
        try {
            const response = await fetch(URL_API + 'menus');
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            
            let totalPrice = 0;
            

            data.map((menu) => {
                if (totalPrice == undefined) totalPrice = 0
                totalPrice += Number(menu.precio)
            })
            console.log(totalPrice)
            const precioFormatted = formatToCLP(Number(totalPrice));
            setTotalPrice(precioFormatted)
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getMenusCount();
        getTotalPrice();
    }, []);
    
    
    
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h2>Menus disponibles: {count}</h2>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-white rounde-lg shadow">
                            <BarChart
                                className="mt-6"
                                data={chartdata}
                                index="name"
                                categories={["Number of threatened species"]}
                                colors={["blue"]}
                                valueFormatter={dataFormatter}
                                yAxisWidth={48}
                            />
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m7.33 14.49 2.38-3.09c.34-.44.97-.52 1.41-.18l1.83 1.44c.44.34 1.07.26 1.41-.17l2.31-2.98" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                            <h2>Precio total: {totalPrice}</h2>
                        </div>
                        <div class="">
                            <h2 class="scroll-m-20 text-4xl font-bold tracking-tight">Productos mas vendidos</h2>
                        </div>
                    </div>
                </div>
            ) }
            
        </div>
    );
}

export default Page;