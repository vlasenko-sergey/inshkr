import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParty } from "../../features/parties/partySlice";
import Cocktail from "../cocktails/Cocktail";
import CocktailesList from "../cocktails/CocktailesList";

const PartyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const party = useSelector((state) =>  state.party ? state.party.item : null);

  useEffect(() => {
    if (id) {
      dispatch(fetchParty(id));
    }
  }, [dispatch, id]);

  if (!party) {
    return null;
  }

  return (
    <div>
      <h1>{party.name}</h1>
      <div>{party.guestsCount}</div>
      <div>{party.cocktailAmount.length}</div>
      <div>
        {party.cocktailAmount.map((cocktailAmount) => (
          <div>
            <div>{cocktailAmount.amount}</div>
          </div>
        ))}
      </div>
      <div>
        {party.ingredientAmount.map((ingredientAmount) => (
          <div>
            <div>{ingredientAmount.ingredient.nameRu}</div>{" "}
            <div>{ingredientAmount.amount}</div>
          </div>
        ))}
      </div>
      <div>{party.legend}</div>
    </div>
  );
};

export default PartyPage;
