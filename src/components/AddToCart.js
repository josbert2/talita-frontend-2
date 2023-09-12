'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addToCart } from '../app/redux/slices/cartSlice'
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react'


export default function AddToCart({
  product,
  showQty = true,
  redirect = true,
  increasePerClick = false,
}) {
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const { data: session, status } = useSession()

  const createItemCart = async (id_user, id_menu, qty) => {
    const URL_API = 'http://localhost:3001/api/'
    try {
        const response = await fetch(`${URL_API}cart`, {
            method: 'POST',
            body: {
              "id_usuario": 29,
              "menu_id": 5,
              "cantidad": 2
            }
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log(data)
        
    }
    catch (error) {
        console.log(error);
    }
  }

  const addToCartHandler =  async () => {
    let newQty = qty

    if (increasePerClick) {
      const existItem = cartItems.find((x) => x.id === product.id)

      if (existItem) {
        if ( product.stock) {
          newQty = existItem.qty + 1
        } else {
          return alert('No more product exist')
        }
      }
    }
    createItemCart(session.user.id, product.id, qty)
    console.log(session.user.id, product.id, qty)

    
  

    dispatch(addToCart({ ...product, qty: newQty }))
    

    

    
    //if (redirect) router.push('/cart')
  }

  return (
    <>
      {product.countInStock > 0 && showQty && (
        <div className="flex justify-between mb-2">
          <div>Qty</div>
          <div>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>{' '}
          </div>
        </div>
      )}
      <div>
        {true ? (
          <Button className="w-full primary-button" onClick={addToCartHandler}>
            Hacer pedido
          </Button>
        ) : (
          <Button disabled>Out of stock</Button>
        )}
      </div>
    </>
  )
}