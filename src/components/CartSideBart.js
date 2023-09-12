import { addToCart, removeFromCart } from '../app/redux/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const pathname = usePathname()

  return (
    <div
      className={
        loading
          ? ''
          : cartItems.length > 0 &&
            (pathname === '/' || pathname.indexOf('/product/') >= 0)
          ? 'fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-gary-700 overflow-scroll'
          : 'hidden'
      }
    >
      {loading ? (
        <div className="px-2 py-5">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="px-2 py-5">Cart is empty</div>
      ) : (
        <>
          <div className="flex flex-col items-center p-2 border-b border-b-gary-600">
            <div>subtotal</div>
            <div className="font-bold text-orange-700">${itemsPrice}</div>
            <div>
              <Link
                href="/cart"
                className="w-full p-1 text-center border-2 rounded-2xl"
              >
                Go to cart
              </Link>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-2 border-b border-b-gary-600"
              >
                <Link
                  href={`/product/${item.id}`}
                  className="flex items-center"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="p-1"
                  ></Image>
                </Link>
                <select
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="mt-2 default-button"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}