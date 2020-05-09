import { combineReducers } from "@reduxjs/toolkit";
import cocktails from "../features/cocktails/cocktailsSlice";
import cocktail from "../features/cocktails/cocktailSlice";
import ingredients from "../features/ingredients/ingredientsSlice";
import ingredient from "../features/ingredients/ingredientSlice";
import barIngredients from "../features/bar/barIngredientsSlice";
import favorites from "../features/favorites/favoritesSlice";
import parties from "../features/parties/partiesSlice";
import party from "../features/parties/partySlice";
import ingredientsProperties from "../features/ingredients/ingredientsPropertiesSlice";
import cocktailsProperties from "../features/cocktails/cocktailsPropertiesSlice";
import searchIngredients from "../features/ingredients/searchIngredientsSlice";
import barCocktails from "../features/bar/barCocktailsSlice";

const rootReducer = combineReducers({
  cocktails,
  cocktail,
  ingredients,
  ingredient,
  barIngredients,
  favorites,
  parties,
  party,
  ingredientsProperties,
  cocktailsProperties,
  searchIngredients,
  barCocktails,
});

export default rootReducer;
