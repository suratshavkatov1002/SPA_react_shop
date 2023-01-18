import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMealId } from "../api";
import Loader from "./Loader";

export default function Recipe() {
   const {id} = useParams();
   const [recipe, setRecipe] = useState([])
   const [showRecipe, setShowRecipe] = useState(false);
   const {goBack} = useHistory();

   const hendleShowRecipe = () => {
      setShowRecipe(!showRecipe)
   }

   useEffect(() => {
      getMealId(id).then(data =>  setRecipe(data.meals[0]) )
   }, [])
   
   return(
      <>
         <button className="btn" onClick={goBack}>Go Back</button>
         {
            ! recipe.idMeal ? <Loader/>  : (
               <div className="recipe">
                  <img src= {recipe.strMealThumb} alt= "recipe.strMeal" />
                  <h2>{recipe.strMeal}</h2>
                  <h5><b> Category:</b> {recipe.strCategory}</h5>
                  {recipe.strArea ? <h6> <b>Area: </b>{recipe.strArea}</h6> : null}
                  <p>{recipe.strInstructions}</p>
                  <button className="btn" onClick={hendleShowRecipe}>Show Recipe</button>
                  
                  {showRecipe ? (
                  <table className="table1">
                     <thead>
                        <tr>
                           <th>Ingredient</th>
                           <th>Measure</th>
                        </tr>
                     </thead>

                     <tbody>
                        {Object.keys(recipe).map(key => {
                           if(key.includes('Ingredient') && recipe[key]) {
                              return(
                                 <tr>
                                    <td>
                                       {recipe[key]}
                                    </td>
                                    <td>
                                       {recipe[`strMeasure${key.slice(13)}`]}
                                    </td>
                                 </tr>
                              )
                           }
                        })}
                     </tbody>
                  </table>
                  ): null}

                  { recipe.strYoutube ? (
                     <div className="row">
                        <h5>Video Recipe</h5>
                        <iframe src= {`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} title = {id} allowFullScreen/>
                     </div>
                  ) : null}
               </div>
            )
         }
      </>
   )
}