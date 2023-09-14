import React from 'react'
import { Button } from "@/components/ui/button"

import Link from "next/link"

import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Badge } from "@/components/ui/badge"
  

export default function Header() {
    const { data: session, status } = useSession()
    const { loading, cartItems } = useSelector((state) => state.cart)
    const pathname = usePathname()
    console.log(session, status)

    const rutasActivas = [
        '/dashboard/menus',
        '/dashboard/settings',
        '/dashboard/profile',
        // ... puedes agregar tantas rutas como necesites
    ];
    const isActive = rutasActivas.includes(pathname);

  return (
    <>
        <header class="pl-[150px] supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div class="container flex h-14 items-center">
                <div class="mr-4 hidden md:flex">
                    <a class="mr-6 flex items-center space-x-2" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="h-6 w-6">
                            <rect width="256" height="256" fill="none"></rect>
                            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                        </svg>
                        <span class="hidden font-bold sm:inline-block">Talita Restaurant</span>
                    </a>
                    <nav class="flex items-center space-x-6 text-sm font-medium">
                        
                        
                        <Link activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/dashboard">
                            Dashboard
                        </Link>
                        <Link  activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/menus">
                            Menus
                        </Link>
                        <Link  activeClassName="active" className='transition-colors hover:text-foreground/80 text-foreground/60' href="/categorias">
                            Categorías
                        </Link>
                        
                    </nav>
                </div>
                <button
                    class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:R15hja:"
                    data-state="closed"
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                        <path
                            d="M8 2H13.5C13.7761 2 14 2.22386 14 2.5V12.5C14 12.7761 13.7761 13 13.5 13H8V2ZM7 2H1.5C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H7V2ZM0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V2.5Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span class="sr-only">Toggle Menu</span>
                </button>
                <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    
                    <nav class="flex items-center">
                    
                    {session ? (
                            <div class="mr-4">
                                {session.user && (
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>{session.user.nombre}</DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Mis ventas</DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href="api/auth/signout" class="text-red-500">
                                                        Cerrar sesión
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    
                                    
                                )}
                            </div>
                        ) : (
                            <div>
                                <Link href="/login" class="px-5">
                                    <div
                                        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                                    >
                                        Login
                                    </div>
                                </Link>
                                <Link href="/signup" class="px-5">
                                    <div
                                        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                                    >
                                        Signup
                                    </div>
                                </Link>
                            </div>
                        )}
                        <div class="flex items-center">
                            
                            <Badge variant="outline" >{loading ? '' : cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>
                            
                            <Link href="/cart" class="ml-4">
                                <Badge variant="outline">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                    <path
                                        stroke="#FF8A65"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="1.5"
                                        d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 002.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M16.25 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm-8 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM9 8h12"
                                    ></path>
                                    </svg>
                                </Badge>
                            </Link>
                            
                            
                        </div>


                        
                        
                    </nav>
                </div>
            </div>
        </header>

        <div class="aside z-[100] overflow-hidden bg-white fixed flex flex-col h-screen top-0 border-r px-3 py-3 ">
            <div class="flex items-center justify-center rounded-lg  px-6 py-5 shadow-[15px_16px_100px_20px_rgba(0,0,0,0.1)]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                className="w-6 h-6 mx-auto"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="#FF8A65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M8 16l4-9 4 9m-8-4h4"
                ></path>
                <path
                    stroke="#FF8A65"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                ></path>
                </svg>
            </div>
            <div class="flex items-center justify-center">
                <Button  className={`bg-white mt-5 w-full h-[60px] relative by-items-aside ${pathname == '/dashboard/' ? 'active' : ''} `} variant="outline" size="icon">
                    <div class="inner-content-icon bg-cyan-500 shadow shadow-[#FF6A49]/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            className="w-6 h-6 mx-auto"
                            viewBox="0 0 24 24"
                            >
                            <path
                                stroke="#FF8A65"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="1.5"
                                d="M8 16l4-9 4 9m-8-4h4"
                            ></path>
                            <path
                                stroke="#FF8A65"
                                strokeMiterlimit="10"
                                strokeWidth="1.5"
                                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            ></path>
                            </svg>
                    </div>
                </Button>
            </div>

            <div class="flex items-center justify-center">
                <Link href="/dashboard/menus" class="flex w-full">
            
                    <Button className={`bg-white mt-5 w-full h-[60px] relative by-items-aside ${pathname == '/dashboard/menus' ? 'active' : ''} `} variant="outline" size="icon">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                
                                    <div class="inner-content-icon bg-cyan-500 shadow shadow-[#FF6A49]/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M3.5 18V7c0-4 1-5 5-5h7c4 0 5 1 5 5v10c0 .14 0 .28-.01.42" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.35 15H20.5v3.5c0 1.93-1.57 3.5-3.5 3.5H7c-1.93 0-3.5-1.57-3.5-3.5v-.65C3.5 16.28 4.78 15 6.35 15ZM8 7h8M8 10.5h5" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    </div>
                                
                                </TooltipTrigger>
                                <TooltipContent side={"right"} sideOffset={20}>
                                    <p>Lista de menu</p>
                                    
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Button>
                </Link>
            </div>

            <div class="flex items-center justify-center">
                <Link href="/dashboard/ventas" class="flex w-full">
            
                    <Button className={`bg-white mt-5 w-full h-[60px] relative by-items-aside ${pathname == '/dashboard/ventas' ? 'active' : ''} `} variant="outline" size="icon">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                
                                    <div class="inner-content-icon bg-cyan-500 shadow shadow-[#FF6A49]/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9.5 13.75c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.99-.53-.99-1.45 0-.84.65-1.53 1.45-1.53h1.88c.92 0 1.67.78 1.67 1.75M12 7.5v9" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2M22 6V2h-4M17 7l5-5" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    </div>
                            
                                
                                </TooltipTrigger>
                                <TooltipContent side={"right"} sideOffset={20}>
                                    <p>Ventas</p>
                                    
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Button>
                </Link>
            </div>

            <div class="flex items-center justify-center">
                <Link href="/dashboard/caja" class="flex w-full">
                    <Button className={`bg-white mt-5 w-full h-[60px] relative by-items-aside ${pathname == '/dashboard/caja' ? 'active' : ''} `} variant="outline" size="icon">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div class="inner-content-icon bg-cyan-500 shadow shadow-[#FF6A49]/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M23 17.91c.02.75-.18 1.46-.54 2.07-.2.36-.47.69-.77.96-.69.64-1.6 1.03-2.61 1.06-1.46.03-2.75-.72-3.46-1.87-.38-.59-.61-1.3-.62-2.05-.03-1.26.53-2.4 1.43-3.15.68-.56 1.54-.91 2.48-.93A4 4 0 0 1 23 17.91Z" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="m17.44 18.03 1.01.96 2.09-2.02M3.17 7.44 12 12.55l8.77-5.08M12 21.61v-9.07" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.61 9.17v5.66c0 .05 0 .09-.01.14-.7-.61-1.6-.97-2.6-.97-.94 0-1.81.33-2.5.88A3.97 3.97 0 0 0 15 18c0 .75.21 1.46.58 2.06.09.16.2.31.32.45l-1.83 1.01c-1.14.64-3 .64-4.14 0l-5.34-2.96c-1.21-.67-2.2-2.35-2.2-3.73V9.17c0-1.38.99-3.06 2.2-3.73l5.34-2.96c1.14-.64 3-.64 4.14 0l5.34 2.96c1.21.67 2.2 2.35 2.2 3.73Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side={"right"} sideOffset={20}>
                                    <p>Caja</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Button>
                </Link>
            </div>
        </div>
        
    </>
  )
}
