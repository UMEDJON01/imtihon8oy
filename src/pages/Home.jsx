import { useSelector, useDispatch } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { RecipeList } from "../components";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.currentUser);
  const { documents: recipe } = useCollection("recipe", [
    "uid",
    "==",
    user.uid,
  ]);
  return (
    <div className="max-container">
      {recipe && recipe <= 0 && <h1>There is no recipe</h1>}
      {recipe && <RecipeList recipe={recipe} />}
    </div>
  );
}

export default Home;
