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

    const [imageUrl, setImageUrl] = React.useState('http://via.placeholder.com/640x360')
    const [nombre, setNombre] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const [tipo, setTipo] = React.useState(null)
    const [precio, setPrecio] = React.useState(null)
    const [descripcion, setDescripcion] = React.useState(null)
    const [fileImage, setFileImage] = React.useState(null)
    const [id, setId] = React.useState(null)



    const { data: session, status } = useSession()
    console.log(session, status)
    
    const { toast } = useToast()

    const uploadToCloud = async (e) => {
  
        const formData = new FormData()
        formData.append('image', file)
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const data = await response.json()
        console.log(data)
        setImageUrl(data.result)
        setFileImage(data.result)
    }

  

    const handlerSubmit = async  (e) => {
        const URL_API = 'http://localhost:3001/api/'
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const nombre = formData.get('nombre')
        const descripcion = formData.get('descripcion')
        const precio = formData.get('precio')
        const tipo = formData.get('tipo')

    
      
        if (!nombre) {
            return
        }
        
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
        
        
        const response = await fetch(URL_API + 'menus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
          body: JSON.stringify({ nombre, descripcion, precio, tipo, imagen: fileImage, user_id: 2, createdAt, updatedAt /*session.user.id*/ })
            
        })

        if (response.ok) {
            const menu = await response.json()
            setId(menu.id)
            console.log(menu)
            toast({
                title: "Menu creado exitosamente",
                description:  "El menu " + menu.nombre + " ha sido creado exitosamente",
                action: <ToastAction altText="Try again"><Link href={'/menus/' + menu.id }>Ver menu </Link></ToastAction>,
            })
        }


        
    }

  return (
    <div class="">
        <div class="px-4 py-4 grid grid-cols-2">
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
                        <Input id="nombre" onChange={e => setNombre(e.target.value)} name="nombre" type="text" />
                    </div>


                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="nombre">Descripción</Label>
                        <Input id="descripcion" onChange={e => setDescripcion(e.target.value)} name="descripcion" type="text" />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                      <Label htmlFor="nombre">Precio</Label>
                      <Input id="precio" name="precio" onChange={e => setPrecio(e.target.value)} type="text" />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                      <Label htmlFor="tipo">Tipo de comida</Label>
                      <Input id="tipo" name="tipo" type="text"  onChange={e => setTipo(e.target.value)} />
                    </div>


                    <div className="grid w-full max-w-sm items-center gap-1.5 ">
                        <Label htmlFor="picture">Foto de la comida</Label>
                        <Input id="picture" type="file" onChange={(e) => {
                            console.log(e.target.files[0])
                            setFile(e.target.files[0])
                          }} />
                    </div>
                    <div class="">
                      {fileImage ? (
                        <div>
                            Imagen subida a cloud
                        </div>
                      ) : (
                        <Button type="button" onClick={uploadToCloud}>Subir imagen</Button>
                      )}
                    </div>
                  
                    
                        <div class="pt-5">
                            <Button type="submit" className="w-full">
                                Agregar comida
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


              <div class="px-7">
                  <div class="flex items-center border rounded-lg mt-4">
                    <div class="w-20 h-20">
                      {imageUrl && <img class="w-full h-full" src={imageUrl} />}
                    </div>
                    <div class="flex flex-col pl-4 py-2">
                        <span class="mb-1 flex items-center text text-xs">Nombre: {nombre && <p  class="ml-1"> {nombre}</p>} </span>
                        <span class="text-xs mb-1 flex items-center">Descripción: {descripcion && <p  class="ml-1"> {descripcion}</p>}</span>
                        <span class="text-xs flex items-center">Tipo: {tipo && <p  class="ml-1"> {tipo}</p>}</span>
                    </div>
                    <div class="ml-auto pr-3">
                      <span class="text-xs flex">Precio: {precio && <p class="ml-1">{precio}</p>}</span>
                    </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}
