import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import toast from "react-hot-toast";
import { clear } from '../features/cart/cartSlice'
import { Link } from "react-router-dom";

function Store() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    toast.success("Thanks for your order!")
    dispatch(clear())
  }

  return (
    <div className="max-container flex gap-5 md:flex-row flex-col">
      <ul className="pt-5 w-4/5">
      <h2 className="font-bold text-3xl pb-5 border-b">Shopping Cart</h2>
        {cart.items.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </ul>
      <div className="mt-16 border py-7 px-10">
         <h2 className="font-bold text-xl mb-4">
           Order Summary
         </h2>
         <div className="border-b pb-5">
          <label className="label text-blue-600">Promo Code</label>
          <div className="items-center flex w-full justify-between bg-gray-200 gap-3 rounded-lg pl-1">
            <input className="py-2 w-full px-4 bg-gray-200 placeholder:text-blue-600" type="text" placeholder="Enter promo code..." />
            <button className="btn btn-primary">Apply</button>
          </div>
         </div>
         <div className="py-5 border-b flex items-center justify-between">
          <p className="text-blue-600">Item: {cart.totalQuantity}</p>
          <p className="text-blue-600 font-semibold">Rp 149.995</p>
         </div>
         <div className="py-4">
            <div className="flex items-center justify-between text-sm text-blue-600">
            <span className="mb-2">
              Subtotal: 
            </span>
            <p>Rp 149.995</p>
            </div>
            <p className="text-sm text-blue-600 mb-3">Promo</p>
            <div className="flex items-center justify-between text-blue-600 mb-4">
              <span>Total:</span>
              <p className="font-semibold">Rp 149.995</p>
            </div>
            <Link to='/'>
              <button onClick={handleCheckout} className="btn btn-primary w-full">
                Checkout
              </button>
            </Link>
         </div>
      </div>
    </div>
  );
}

export default Store;
