'use client'

import { useState } from 'react'

import { Button } from "@/components/ui/button"

export default function page() {

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  return (
    <div>
      <div class="aside overflow-hidden bg-white fixed flex flex-col h-screen top-0 border-r px-3 py-3 ">
        <div class="flex items-center justify-center rounded-lg  px-6 py-5 shadow-[15px_16px_100px_20px_rgba(0,0,0,0.1)]">
          <svg class="mx-auto w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="m8 16 4-9 4 9M8 12h4" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10"></path></svg>
          
        </div>
      </div>
      <div class="main-content">
        main content
        <div>
          
  
        
        </div>
      </div>
      page
      <form onSubmit={async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const data = await response.json()
        console.log(data)
        setImageUrl(data.result)
      }}>
        <input type="file" onChange={(e) => {
          console.log(e.target.files[0])
          setFile(e.target.files[0])
        }} />
        <button type="submit">Submit</button>
      </form>
      {imageUrl && <img src={imageUrl} />}

      <Button>Button</Button>

     </div>
  )
}
