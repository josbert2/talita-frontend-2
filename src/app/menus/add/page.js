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

import { useSession } from 'next-auth/react'



export default function page() {

    const { data: session, status } = useSession()
    console.log(session, status)
    
    const { toast } = useToast()

    const handlerSubmit = async  (e) => {
        const URL_API = 'http://localhost:3001/api/'
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const nombre = formData.get('nombre')

        
        
        const response = await fetch(URL_API + 'menus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
            
        })

        if (response.ok) {
            const menu = await response.json()
            console.log(menu)
            toast({
                title: "Menu creado exitosamente",
                description:  "El menu " + menu.nombre + " ha sido creado exitosamente",
            })
        }


        
    }

  return (
    <div class="">
        <div class="px-4 py-4">
          <Card className={cn("w-[380px] mx-auto")}>
            <CardHeader>
              <CardTitle>Agregar una nueva comida</CardTitle>
              <CardDescription>Intenta ser lo mas claro posible.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handlerSubmit}>
                <div className="   rounded-mdr">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="nombre">Nombre del plato</Label>
                        <Input id="nombre" name="nombre" type="text" />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                    <Label htmlFor="nombre">Precio</Label>
                    <Input id="nombre" type="text" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 ">
                        <Label htmlFor="picture">Foto de la comida</Label>
                        <Input id="picture" type="file" />
                    </div>
                    
                        <div class="pt-5">
                            <Button className="w-full">
                                Agregar comida
                            </Button>
                        </div>
                    
                </div>
              </form>
            </CardContent>
            
          </Card>
        </div>
    </div>
  )
}
