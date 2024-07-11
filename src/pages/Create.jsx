import { useEffect, useRef, useState } from "react";
import { useAddNewDoc } from "../hooks/useAddNewDoc";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Preview from "../components/Preview";

function Create() {
  const { user } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const { addNewDoc, isPending, newRecipe } = useAddNewDoc(null);
  const title = useRef();
  const [method, setMethod] = useState("");
  const photoUrl = useRef();
  const cookingTime = useRef();
  const ingredient = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const handleAddIngredient = (e) => {
    e.preventDefault();
    let newIng = ingredient.current.value.trim();
    if (!ingredients.includes(newIng)) {
      setIngredients((prev) => {
        return [...prev, newIng];
      });
    }
    ingredient.current.value = "";
  };

  const handleCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 4) {
      toast.error("Please, add at least 4 images!");
    } else {
      addNewDoc("recipe", {
        title: title.current.value,
        cookingTime: cookingTime.current.value + " minutes",
        method,
        ingredients,
        images,
        category,
        uid: user.uid,
      });
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg|JPEG|JPG|GIF|PNG|SVG)$/i;

    let newImage = photoUrl.current.value.trim();
    if (imageUrlRegex.test(newImage)) {
      setImages((prev) => {
        return [...prev, newImage];
      });
    }
    photoUrl.current.value = "";
  };

  const handlePreview = () => {
    if (
      title &&
      method &&
      category &&
      cookingTime &&
      ingredients.length &&
      images.length
    ) {
      document.getElementById("my_modal_1").showModal();
    } else {
      toast.error("Please, fill all inputs complately !");
    }
  };

  useEffect(() => {
    if (!isPending && newRecipe) {
      navigate("/");
    }
  }, [isPending, newRecipe]);

  return (
    <div className="max-container font-mono">
      <Preview
        title={title}
        method={method}
        cookingTime={cookingTime}
        ingredients={ingredients}
        category={category}
        images={images}
      />
      <h1 className="my-10 text-center text-4xl text-orange-400 font-semibold">
        Add New Recipe
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col mb-7 items-center">
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Title</span>
          </div>
          <input
            ref={title}
            type="text"
            placeholder="Type here"
            required
            className="input input-bordered w-full max-w-lg"
          />
        </label>
        <div className="w-full max-w-lg mb-4">
          <div className="label">
            <span className="label-text text-2xl">Category</span>
          </div>
          <select
            onChange={handleCategory}
            className="select select-bordered w-full max-w-lg"
          >
            <option disabled selected>
              Category
            </option>
            <option value={"Milliy Taomlar"}>Milliy Taomlar</option>
            <option value={"Fast Food"}>Europa</option>
            <option value={"Turkey"}>Turkey</option>
            <option value={"Others"}>Others</option>
          </select>
        </div>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Cooking time</span>
          </div>
          <input
            ref={cookingTime}
            type="number"
            placeholder="Type here"
            required
            className="input input-bordered w-full max-w-lg"
          />
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Ingredients</span>
          </div>
          <div className="flex">
            <input
              ref={ingredient}
              type="text"
              placeholder="Type here"
              className="mr-5 mb-3 input w-full input-bordered max-w-lg"
            />
            <button
              onClick={handleAddIngredient}
              className="btn bg-orange-400 text-white"
            >
              Add
            </button>
          </div>
          <div>
            {ingredients.length > 0 &&
              ingredients.map((ing, index, ingArray) => {
                return (
                  <span style={{ display: "inline-block" }} key={ing}>
                    {ing}
                    {index == ingArray.length - 1 ? "." : " ,"}
                  </span>
                );
              })}
          </div>
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Images URL</span>
          </div>
          <div className="flex">
            <input
              type="text"
              ref={photoUrl}
              placeholder="Type here"
              className="mr-5 input w-full input-bordered max-w-lg"
            />
            <button
              onClick={handleAddImage}
              className="btn bg-orange-400 text-white"
            >
              Add
            </button>
          </div>
          <div className="py-2 grid grid-cols-2 md:grid-cols-4 items-center gap-4">
            {images.length > 0 &&
              images.map((image) => {
                return (
                  <img
                    src={image}
                    className="bg-center object-cover"
                    key={image}
                    width={100}
                    height={100}
                    alt=""
                  />
                );
              })}
          </div>
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Method</span>
          </div>
          <textarea
            style={{ resize: "none" }}
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            type="text"
            placeholder="Type here"
            required
            className="textarea textarea-bordered"
          />
        </label>
        <div className="flex justify-between gap-5 flex-col md:flex-row w-full md:w-[130px] md:-ml-48">
          <button className="btn btn-sm md:btn-md bg-orange-400 md:w2/5 w-full text-white">
            Add Recipe
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className=" md:block btn btn-sm md:btn-md text-white btn-success md:w2/5 w-full"
          >
            Prewiev
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
