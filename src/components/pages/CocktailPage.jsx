import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCocktailById,
  resetCocktail,
} from "../../features/cocktails/cocktailSlice";
import { useParams, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader";
import { ReactComponent as AddToFavoriteIcon } from "../../images/add_to_favorite.svg";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../features/favorites/favoritesSlice";
import {
  fetchCustomCocktailById,
  resetCustomCocktail,
} from "../../features/cocktails/customCocktailSlice";
import { deleteCustomCocktail } from "../../features/cocktails/customCocktailsSlice";

const StyledCocktailPageMain = styled.div`
  display: flex;
  margin-top: 40px;
`;

const StyledCocktailPageImageWrapper = styled.div`
  width: calc(50% - 20px);
  margin-right: 20px;
  text-align: center;
`;

const StyledCocktailPageImage = styled.img`
  max-width: 100%;
  max-height: 470px;
`;

const StyledCocktailPageRecipe = styled.div`
  width: 50%;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledHistoryHeader = styled.h2`
  text-transform: none;
  margin-top: 80px;
`;

const StyledHistoryText = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-align: justify;
  text-indent: 40px;
  margin-top: 20px;
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  line-height: 22px;
  text-transform: lowercase;
  margin-top: 20px;
  align-items: center;
`;

const StyledInfoCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 50%;
  margin: 0 10px;
`;

const StyledCocktailPageRecipeTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 25px;

  :not(:first-child) {
    margin-top: 25px;
  }
`;

const StyledCocktailPageRecipeTitleInput = styled.input`
  width: 35px;
  text-align: center;
  font-size: 24px;
  line-height: 29px;
`;

const StyledIngredients = styled.div`
  padding-left: 40px;
`;

const StyledAddToFavoriteIcon = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;

    path {
      stroke: #ededed;
      fill: #ededed;
      ${({ active }) =>
        active &&
        `
      fill: #4AA8FF;
      stroke: #000000;
    `}
    }
  }
`;

const StyledCocktailPage = styled.div`
  position: relative;
`;

export const CocktailPage = (props) => {
  const { customCocktail } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const cocktail = useSelector((state) =>
    customCocktail ? state.customCocktail.item : state.cocktail.item
  );
  const isPending = useSelector((state) =>
    customCocktail ? state.customCocktail.isPending : state.cocktail.isPending
  );
  const isDeletePending = useSelector(
    (state) => state.customCocktails.isPending
  );
  const isDeleted = useSelector((state) => state.customCocktails.isDeleted);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const [servingsAmount, setServingsAmount] = useState(1);
  const user = useSelector(state => state.user.item);

  useEffect(() => {
    if (cocktail) {
      setIsFavorite(cocktail.favorite);
    }
  }, [cocktail]);

  useEffect(() => {
    if (customCocktail) {
      dispatch(fetchCustomCocktailById(id));
    } else {
      dispatch(fetchCocktailById(id));
    }

    return () => {
      if (customCocktail) {
        dispatch(resetCustomCocktail());
      } else {
        dispatch(resetCocktail());
      }
    };
  }, [dispatch, id, customCocktail]);

  const handleServingsInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue) {
      setServingsAmount(newValue);
    }
  };

  const handleAddToFavoriteClick = () => {
    if (isFavorite) {
      dispatch(deleteFromFavorites(cocktail.id));
    } else {
      dispatch(addToFavorites(cocktail.id));
    }
    setIsFavorite(!isFavorite);
  };

  const handleEditButtonClick = () => {
    history.push(history.location.pathname + "/edit");
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteCustomCocktail(cocktail));
  };

  useEffect(() => {
    if (isDeleted) {
      history.push("/my-recipes");
    }
  }, [isDeleted, history]);

  if (isPending || isDeletePending) {
    return <Loader />;
  }

  if (!cocktail) {
    return null;
  }

  return (
    cocktail && (
      <StyledCocktailPage>
        {!customCocktail && user && (
          <StyledAddToFavoriteIcon
            onClick={handleAddToFavoriteClick}
            active={isFavorite}
          >
            <AddToFavoriteIcon />
          </StyledAddToFavoriteIcon>
        )}
        <h1>{cocktail.nameRu}</h1>
        {customCocktail && (
          <>
            <button onClick={handleEditButtonClick}>edit</button>
            <button onClick={handleDeleteButtonClick}>delete</button>
          </>
        )}
        <h2>{cocktail.nameEn}</h2>
        <StyledInfo>
          {cocktail.base && (
            <>
              <Link to={`../cocktails?base=${cocktail.base.id}`}>{cocktail.base.name}</Link>
              <StyledInfoCircle />
            </>
          )}
          <div>{cocktail.spirit}%</div>
          {cocktail.cocktailSubgroup && (
            <>
              <StyledInfoCircle />
              <div>{cocktail.cocktailSubgroup.name}</div>
            </>
          )}
        </StyledInfo>
        <StyledCocktailPageMain>
          <StyledCocktailPageImageWrapper>
            <StyledCocktailPageImage src={cocktail.imageRef} alt="" />
          </StyledCocktailPageImageWrapper>
          <StyledCocktailPageRecipe>
            <StyledCocktailPageRecipeTitle>
              На{" "}
              <StyledCocktailPageRecipeTitleInput
                type="text"
                defaultValue="1"
                onChange={handleServingsInputChange}
              />{" "}
              порцию мл:
            </StyledCocktailPageRecipeTitle>
            <StyledIngredients>
              {cocktail.recipePart
                .filter((item) => item.amount)
                .map((item) => (
                  <StyledIngredientWrapper key={item.ingredient.id}>
                    <Link to={`/ingredient/${item.ingredient.id}`}>
                      {item.ingredient.nameRu}
                    </Link>
                    <StyledIngredientDots />
                    <div>{item.amount * servingsAmount}</div>
                  </StyledIngredientWrapper>
                ))}
              {cocktail.recipePart
                .filter((item) => !item.amount)
                .map((item) => (
                  <StyledIngredientWrapper key={item.ingredient.id}>
                    <Link to={`/ingredient/${item.ingredient.id}`}>
                      <div>{item.ingredient.nameRu}</div>
                    </Link>
                  </StyledIngredientWrapper>
                ))}
            </StyledIngredients>
            <StyledCocktailPageRecipeTitle>
              Способ смешивания:
            </StyledCocktailPageRecipeTitle>
            {cocktail.mixingMethod && (
              <StyledIngredients>
                <div>{cocktail.mixingMethod.name}</div>
              </StyledIngredients>
            )}
            <StyledCocktailPageRecipeTitle>
              Способ подачи:
            </StyledCocktailPageRecipeTitle>
            <StyledIngredients>
              {cocktail.glass && <div>{cocktail.glass.nameRu}</div>}
              <div>{cocktail.garnish && cocktail.garnish.nameRu}</div>
            </StyledIngredients>
          </StyledCocktailPageRecipe>
        </StyledCocktailPageMain>
        <div>
          <StyledHistoryHeader>История</StyledHistoryHeader>
          <StyledHistoryText>{cocktail.legend}</StyledHistoryText>
        </div>
      </StyledCocktailPage>
    )
  );
};
