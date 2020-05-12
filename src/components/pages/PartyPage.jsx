import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParty, resetParty } from "../../features/parties/partySlice";
import styled from "styled-components";
import CocktailesList from "../cocktails/CocktailesList";
import Loader from "../Loader";

const StyledPartyGuestsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const StyledPartyGuestsInfoImage = styled.img`
  margin-right: 15px;
`;

const StyledPartyGuestsInfoText = styled.span`
  font-size: 18px;
  line-height: 22px;
`;

const StyledPartyInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledH2 = styled.h2`
  text-transform: none;
  text-align: left;
  margin-bottom: 20px;
`;

const StyledMainInfo = styled.div`
  display: flex;
`;

const StyledMainInfoIngredients = styled.div`
  width: calc(55% - 60px);
  flex-shrink: 0;
  margin-right: 60px;
`;

const StyledIngredientWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledIngredientDots = styled.div`
  border-bottom: 2px dotted #757575;
  flex-grow: 1;
  margin: 0 10px 5px 5px;
`;

const StyledMainInfoContent = styled.div`
  padding-left: 30px;
  text-align: justify;
`;

const PartyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const party = useSelector((state) => state.party.item);
  const isPending = useSelector((state) => state.party.isPending);
  const [cocktailsAmount, setCocktailsAmount] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchParty(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(resetParty());
    };
  }, [dispatch]);

  useEffect(() => {
    if (party) {
      const amounts = {};
      party.cocktailAmount.forEach((item) => {
        amounts[item.cocktail.id] = item.amount;
      });
      setCocktailsAmount(amounts);
    }
  }, [party]);

  if (isPending) {
    return <Loader />;
  }

  if (!party) {
    return null;
  }

  return (
    <div>
      <h1>{party.name}</h1>
      <StyledPartyInfo>
        <StyledPartyGuestsInfo>
          <StyledPartyGuestsInfoImage src="/guests.png" alt="" />
          <StyledPartyGuestsInfoText>
            {party.guestsCount} гостей
          </StyledPartyGuestsInfoText>
        </StyledPartyGuestsInfo>
        <StyledPartyGuestsInfo>
          <StyledPartyGuestsInfoImage src="/glass.png" alt="" />
          <StyledPartyGuestsInfoText>
            {party.cocktailAmount.length} гостей
          </StyledPartyGuestsInfoText>
        </StyledPartyGuestsInfo>
      </StyledPartyInfo>
      <div>
        <CocktailesList
          cocktails={party.cocktailAmount.map((item) => item.cocktail)}
          cocktailsAmount={cocktailsAmount}
        />
      </div>
      <StyledMainInfo>
        <StyledMainInfoIngredients>
          <StyledH2>Вам понадобится:</StyledH2>
          <StyledMainInfoContent>
            {party.ingredientAmount
              .filter((ingredientAmount) => ingredientAmount.amount)
              .map((ingredientAmount) => (
                <StyledIngredientWrapper key={ingredientAmount.ingredient.id}>
                  <div>{ingredientAmount.ingredient.nameRu}</div>
                  <StyledIngredientDots />
                  <div>{ingredientAmount.amount}</div>
                </StyledIngredientWrapper>
              ))}
            {party.ingredientAmount
              .filter((ingredientAmount) => !ingredientAmount.amount)
              .map((ingredientAmount) => (
                <StyledIngredientWrapper key={ingredientAmount.ingredient.id}>
                  <div>{ingredientAmount.ingredient.nameRu}</div>
                </StyledIngredientWrapper>
              ))}
          </StyledMainInfoContent>
        </StyledMainInfoIngredients>
        <div>
          <StyledH2>Описание:</StyledH2>
          <StyledMainInfoContent>
            <div>{party.legend}</div>
          </StyledMainInfoContent>
        </div>
      </StyledMainInfo>
    </div>
  );
};

export default PartyPage;
