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
import customCocktails from "../features/cocktails/customCocktailsSlice";
import customCocktail from "../features/cocktails/customCocktailSlice";
import tableware from "../features/ingredients/tablewareSlice";
import garnish from "../features/ingredients/garnishSlice";
import users from "../features/users/usersSlice";
import user from "../features/users/userSlice";

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
  customCocktails,
  customCocktail,
  tableware,
  garnish,
  users,
  user,
});

export default rootReducer;
