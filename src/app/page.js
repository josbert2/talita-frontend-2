'use client'

import { useState } from 'react'

export default function page() {

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  return (
    <div>
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

     </div>
  )
}
