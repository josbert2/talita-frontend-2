'use client'
import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'


export default function page() {


    const { toast } = useToast()

  
  

    const handlerSubmit = async  (e) => {
        const URL_API = 'http://localhost:3001/api/'
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const nombre = formData.get('nombre')
        const descripcion = formData.get('descripcion')
    
    
    
        
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un 0 inicial si el mes es menor a 10
        const day = String(date.getDate()).padStart(2, '0'); // Agrega un 0 inicial si el día es menor a 10
        const hours = String(date.getHours()).padStart(2, '0'); // Agrega un 0 inicial si la hora es menor a 10
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Agrega un 0 inicial si los minutos son menores a 10
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Agrega un 0 inicial si los segundos son menores a 10
        
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const createdAt = formattedDate
        const updatedAt = formattedDate
        
        
        const response = await fetch(URL_API + 'categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
          body: JSON.stringify({ nombre, descripcion, createdAt, updatedAt /*session.user.id*/ })
            
        })

        if (response.ok) {
            const menu = await response.json()
          
            toast({
                title: "Menu creado exitosamente",
                description:  "La categoría: " + menu.nombre + " ha sido creado exitosamente",
                action: <ToastAction altText="Try again"><Link href={'/categorias/' + menu.id }>Ver categoría </Link></ToastAction>,
            })
        }


        
    }

  return (
    <div class="">
        <div class="px-4 py-4 grid grid-cols-2">
          <Card className={cn("w-[380px] mx-auto")}>
            <CardHeader>
              <CardTitle>Agregar una nueva categoría</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handlerSubmit}>
                <div className=" rounded-mdr">

                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="nombre">Nombre de la categoría</Label>
                        <Input id="nombre" name="nombre" type="text" />
                    </div>


                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="nombre">Descripción</Label>
                        <Input id="descripcion"  name="descripcion" type="text" />
                    </div>



                  
                  
                  
                    
                        <div class="pt-5">
                            <Button type="submit" className="w-full">
                                Agregar categoría
                            </Button>
                        </div>
                    
                </div>
              </form>
            </CardContent>
            
          </Card>
          <div class="preview-html-menu border rounded-lg">
              <div class="font-light leading-none text-center tracking-tight py-3 px-5">
                  Aquí verás una vista previa de como se verá tu comida
              </div>


            
          </div>
        </div>
    </div>
  )
}
