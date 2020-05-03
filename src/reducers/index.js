import { combineReducers } from "@reduxjs/toolkit";
import cocktails from "../features/cocktails/cocktailsSlice";
import cocktail from "../features/cocktails/cocktailSlice";
import cocktailsBases from "../features/cocktails/cocktailsBasesSlice";
import cocktailsTastes from "../features/cocktails/cocktailsTastesSlice";
import cocktailsSpirits from "../features/cocktails/cocktailsSpiritsSlice";
import cocktailsGroups from "../features/cocktails/cocktailsGroupsSlice";
import ingredients from "../features/ingredients/ingredientsSlice";
import ingredient from "../features/ingredients/ingredientSlice";
import ingredientsTastes from "../features/ingredients/ingredientsTastesSlice";
import ingredientsSpirits from "../features/ingredients/ingredientsSpiritsSlice";
import ingredientsGroups from "../features/ingredients/ingredientsGroupsSlice";

const rootReducer = combineReducers({
  cocktails,
  cocktail,
  cocktailsBases,
  cocktailsTastes,
  cocktailsSpirits,
  cocktailsGroups,
  ingredients,
  ingredient,
  ingredientsTastes,
  ingredientsSpirits,
  ingredientsGroups,
});

export default rootReducer;
