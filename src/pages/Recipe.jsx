import { useParams, Link } from "react-router-dom";
import { useGetADocument } from "../hooks/useGetADocument";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Recipe() {
  const { id } = useParams();
  const { getDocument } = useGetADocument();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [cartNum, setCartNum] = useState(1);
  const dispatch = useDispatch();

  const cartIncrease = () => {
    setCartNum(cartNum + 1);
  };

  const cartDecrease = () => {
    if (cartNum > 1) {
      setCartNum(cartNum - 1);
    }
  };

  const addToCartHandler = () => {
    const cartProduct = {
      id: crypto.randomUUID(),
      quantity: cartNum,
      title: document.title,
      images: document.images, // Assuming images is an array
      cookingTime: document.cookingTime,
    };
    dispatch(addItemToCart(cartProduct));
    toast.success("Added to cart!");
  };

  // Fetch document data on component mount
  useEffect(() => {
    getDocument("recipe", id)
      .then((data) => setDocument(data))
      .catch((error) => setError(error));
  }, [id, getDocument]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
        {document && (
          <button
            onClick={addToCartHandler}
            className="btn btn-success text-white px-4 py-2"
          >
            <FaPlus className="mr-2" /> Add to Cart
          </button>
        )}
      </div>
      {document ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 overflow-hidden rounded-lg shadow-md">
            <Carousel className="bg-slate-500" showThumbs={false}>
              {document.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Recipe Image ${index + 1}`}
                    className="object-cover p-6 w-full h-80 md:h-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="flex flex-col justify-center">
            <div className="p-4 bg-orange-100 font-mono shadow-lg rounded-lg">
              <h2 className="text-3xl font-semibold mb-4">{document.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-lg">{document.cookingTime} mins</span>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside">
                  {document.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-1">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Method:</h3>
                <p className="text-base">{document.method}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn btn-accent" onClick={cartDecrease}>
                  <FaMinus />
                </button>
                <span className="text-xl">{cartNum}</span>
                <button className="btn btn-accent" onClick={cartIncrease}>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          {error ? (
            <p className="text-red-500">
              Failed to load recipe details. Please try again later.
            </p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Recipe;
