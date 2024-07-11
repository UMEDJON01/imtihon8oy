import { useDeleteDoc } from "../hooks/useDeleteDoc";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

function RecipeList(recipe) {
  const { deleteTodo } = useDeleteDoc();

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-10">
        {recipe &&
          recipe.recipe.map((recipe) => {
            return (
              <li
                key={recipe.id}
                className="card   w-auto p-5 bg-base-100  shadow-xl"
              >
                <Link to={`/recipe/${recipe.id}`}>
                  <figure>
                    <img
                      src={recipe.images[0]}
                      alt=""
                      className="object-cover rounded-3xl w-full h-96 border-spacing-6 "
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title font-mono text-orange-400">
                      {recipe.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{recipe.cookingTime}</span>
                    </div>
                    <p className="mb-3 line-clamp-3  font-sofia">
                      {recipe.method}...
                    </p>
                    <div className="card-actions justify-end">
                      <Link to="/">
                        <button
                          onClick={() => deleteTodo("recipe", recipe.id)}
                          className="btn bg-orange-400 btn-sm md:btn-md md:text-base tooltip tooltip-bottom"
                          data-tip="Delete"
                        >
                          Delete
                        </button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default RecipeList;
