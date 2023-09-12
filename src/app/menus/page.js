'use client'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash/debounce';

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import Loading from '../loading'

import { Input } from "@/components/ui/input"
const Page = () => {

    const [menus, setMenus] = useState([])
    const [loading, setLoading] = useState(true);



    // search
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMenus, setFilteredMenus] = useState([]);

    const handleSearch = () => {
      debouncedGetMenus(searchTerm);
    }

    const getMenus = async (search = '') => {
      const URL_API = 'http://localhost:3001/api/'
      try {
          const response = await fetch(`${URL_API}menus?q=${search}`);
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
          console.log(data)
          setFilteredMenus(data);
          setLoading(false)
      }
      catch (error) {
          console.log(error);
      }
    }

    const debouncedGetMenus = debounce(getMenus, 300);

    useEffect(() => {
      debouncedGetMenus(searchTerm);
    }, [searchTerm])

    return (
        <div>
            <div class="flex justify-end pb-10 pt-10">
              <Button> 
                <Link href="/menus/add">
                  <div class="flex items-center">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 12h8M12 16V8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    Añadir menu 
                  </div>
                </Link>
              </Button>
            </div>
            <div class="pt-6">
              <div class="pb-6">
                <div className="flex items-center w-full max-w-sm space-x-2">
                  <Input type="text" placeholder="Buscar menus..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                  />
                  <Button type="submit" onClick={handleSearch}>Buscar</Button>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-5">
              {loading ? (
                  <Loading />
              ) : (
                filteredMenus.map((menu) => (
                    <Link href={'/menus/' + menu.id }>
                      <div className="relative flex items-center bg-white border rounded-lg shadow hover:bg-gray-400/25" key={menu.id}>
                          <div className="flex-1 pl-5">
                              <h2 className="text-base">{menu.nombre}</h2>
                              <p className="text-sm text-gray-500">{menu.descripcion}</p>
                              <p>{menu.precio}</p>
                          </div>
                          <div className="flex-1 rounded-lg header-img">
                              {menu.imagen ? (
                                  <div>
                                    <Image class="rounded-lg" alt={menu.nombre} src={menu.imagen} width={200} height={200} />
                                  </div>
                              ) : (
                                <div>
                                  asd
                                </div>
                              )}
                            
                          </div>
                      </div>
                    </Link>
                    
                  ))
                )}
              </div>
            </div>
        </div>
    )
}

export default Page