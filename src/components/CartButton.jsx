import { useDispatch, useSelector } from "react-redux"
import { increaseEl, decreaseEl } from '../features/cart/cartSlice'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

function CartButton({ itemId }) {
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === itemId))

    const decreaseHandle = () => {
        dispatch(decreaseEl(itemId))
    }

    const increaseHandle = () => {
        dispatch(increaseEl(itemId))
    }
  return (
    <div className="flex gap-5 items-center">
        <button className="btn btn-error" onClick={decreaseHandle}>
            <FaMinus/>
        </button>
        <span>
            {cartItem && cartItem.quantity}
        </span>
        <button className="btn btn-success" onClick={increaseHandle}>
            <FaPlus/>
        </button>
    </div>
  )
}

export default CartButton