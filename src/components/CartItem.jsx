import CartButton from './CartButton'
import { FaClock } from 'react-icons/fa6'

function CartItem({ item }) {
  return (
    <li className='flex items-center md:justify-between justify-center gap-5 md:flex-row flex-col shadow-xl p-5'>
        <div className='w-[100px]'>
            <img src={item.images} alt="" />
        </div>
        <div className='flex flex-col gap-5'>
            <p>
                {item.title}
            </p>
            <p className='flex items-center gap-3'>
                <FaClock />
                {item.cookingTime}
            </p>
        </div>
        <div>
            <CartButton itemId={item.id} qty={item.quantity} />
        </div>
    </li>
  )
}

export default CartItem