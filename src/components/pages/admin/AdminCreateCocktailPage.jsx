import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktailsProperties } from "../../../features/cocktails/cocktailsPropertiesSlice";
import FilterGroup from "../../FilterGroup";
import Loader from "../../Loader";
import {
  searchIngredientsTablewareAndGarnish,
  resetSearchIngredients,
} from "../../../features/ingredients/searchIngredientsSlice";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../../images/delete.svg";
import {
  addCocktail,
  updateCocktail,
} from "../../../features/cocktails/cocktailsSlice";
import {
  fetchCocktailById,
  resetCocktail,
} from "../../../features/cocktails/cocktailSlice";
import Swal from "sweetalert2";

const StyledImageWrapper = styled.div`
  width: 390px;
  height: 420px;
  position: relative;
  margin-right: 145px;
  overflow: hidden;
  border-radius: 30px;
`;

const StyledImageEmpty = styled.div`
  border: 2px dashed #333333;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledMainInfo = styled.div`
  display: flex;
  margin-top: 64px;
  margin-bottom: 30px;
`;

const StyledTitle = styled.div`
  text-align: center;
`;

const StyledTitleRu = styled.input`
  font-size: 48px;
  line-height: 59px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  width: 700px;
`;

const StyledTitleEn = styled.input`
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 6px;
  outline: none;
  width: 700px;
`;

const StyledDeleteIconWrapper = styled.div`
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const StyledDescriptionTextArea = styled.textarea`
  border: 1px solid #000000;
  width: 100%;
  height: 115px;
  resize: none;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  font-family: Montserrat;
  margin-top: 30px;
`;

const StyledImage = styled.img`
  border-radius: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledFilterWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledIngredientsInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledAddIngredientButton = styled.button`
  border-radius: 50%;
  border-radius: 50%;
  border: solid 1px black;
  outline: none;
  background: none;
  margin-bottom: 20px;
  cursor: pointer;
`;

const StyledIngredientInput = styled.input`
  width: 40%;
  margin-right: 10px;
`;

const StyledSubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledSubmitButton = styled.button`
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  cursor: pointer;
  background: none;
  border: none;
`;

const AdminCreateCocktailPage = () => {
  const [image, setImage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const tastes = useSelector((state) => state.cocktailsProperties.items.tastes);
  const mixingMethods = useSelector(
    (state) => state.cocktailsProperties.items.mixingMethods
  );
  const tableware = useSelector(
    (state) => state.searchIngredients.items.tableware
  );
  const garnish = useSelector((state) => state.searchIngredients.items.garnish);
  const [checkedTastes, setCheckedTastes] = useState([]);
  const [checkedMixingMethod, setCheckedMixingMethod] = useState(null);
  const [checkedTableware, setCheckedTableware] = useState(null);
  const [checkedGarnish, setCheckedGarnish] = useState(null);
  const [ingredients, setIngredients] = useState([{ id: "", amount: "" }]);
  const { id } = useParams();
  const cocktail = useSelector((state) => state.cocktail.item);
  const isCreated = useSelector((state) => state.cocktails.isCreated);
  const isPending = useSelector((state) => state.cocktails.isPending);

  useEffect(() => {
    dispatch(fetchCocktailsProperties());
    dispatch(searchIngredientsTablewareAndGarnish());

    if (id) {
      dispatch(fetchCocktailById(id));
    }

    return () => {
      dispatch(resetCocktail());
      dispatch(resetSearchIngredients());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail) {
      setCheckedTastes([...cocktail.taste.map((taste) => taste.id)]);
      setCheckedMixingMethod(cocktail.mixingMethod?.id);
      setCheckedTableware(cocktail.glass?.id);
      if (cocktail.garnish) {
        setCheckedGarnish(cocktail.garnish.id);
      }
      setIngredients(
        cocktail.recipePart.map((item) => ({
          id: item.ingredient.id,
          amount: item.amount,
        }))
      );
    }
  }, [cocktail]);

  useEffect(() => {
    if (isCreated) {
      Swal.fire({
        icon: "success",
        title: "Отлично!",
        text: "Коктейль был успешно сохранён",
      }).then((res) => {
        dispatch(resetCocktail());
        history.replace("/admin/cocktails");
      });
    }
  }, [isCreated, dispatch, history]);

  const handleAddIngredientButtonClick = () => {
    setIngredients([...ingredients, { id: "", amount: "" }]);
  };

  const handleRemoveIngredientButtonClick = (index) => {
    setIngredients([
      ...ingredients.slice(0, index),
      ...ingredients.slice(index + 1, ingredients.length),
    ]);
  };

  const handleIngredientIdChange = (e, index) => {
    setIngredients([
      ...ingredients.slice(0, index),
      { ...ingredients[index], id: e.target.value },
      ...ingredients.slice(index + 1, ingredients.length),
    ]);
  };

  const handleIngredientAmountChange = (e, index) => {
    setIngredients([
      ...ingredients.slice(0, index),
      { ...ingredients[index], amount: e.target.value },
      ...ingredients.slice(index + 1, ingredients.length),
    ]);
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveButtonClick = () => {
    formik.handleSubmit();
  };

  const handleOnFilterChange = (filterName, filterValue) => {
    if (filterName === "tastes") {
      setCheckedTastes([...filterValue]);
    }
    if (filterName === "mixingMethods") {
      setCheckedMixingMethod(filterValue);
    }
    if (filterName === "garnish") {
      setCheckedGarnish(filterValue);
    }
    if (filterName === "tableware") {
      setCheckedTableware(filterValue);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameRu: cocktail ? cocktail.nameRu : "",
      nameEn: cocktail ? cocktail.nameEn : "",
      legend: cocktail ? cocktail.legend : "",
    },
    onSubmit: (values) => {
      const requestValue = {
        ...values,
        taste: checkedTastes.map((taste) => ({ id: taste })),
        mixingMethod: checkedMixingMethod ? { id: checkedMixingMethod } : null,
        glass: checkedTableware ? { id: checkedTableware } : null,
        garnish: checkedGarnish ? { id: checkedGarnish } : null,
        recipePart:
          ingredients.filter((ingredient) => Number(ingredient.id) !== 0)
            .length > 0
            ? ingredients.map((ingredient) => ({
                ingredient: { id: Number(ingredient.id) },
                amount: Number(ingredient.amount),
              }))
            : null,
      };
      if (id) {
        dispatch(updateCocktail({ ...requestValue, id }));
      } else {
        dispatch(addCocktail(requestValue));
      }
    },
  });

  if (
    !tastes ||
    !mixingMethods ||
    !garnish ||
    !tableware ||
    (id && !cocktail) ||
    isPending
  ) {
    return <Loader />;
  }

  return (
    <div>
      <StyledTitle>
        <div>
          <StyledTitleRu
            name="nameRu"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nameRu}
            placeholder="Название на русском"
          />
        </div>
        <div>
          <StyledTitleEn
            name="nameEn"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nameEn}
            placeholder="Название на английском"
          />
        </div>
      </StyledTitle>
      <StyledMainInfo>
        <StyledImageWrapper>
          {!image && <StyledImageEmpty>Загрузить изображение</StyledImageEmpty>}
          {image && <StyledImage src={image} />}
          <StyledImageInput type="file" onChange={handleImageChange} />
        </StyledImageWrapper>
        <div>
          <div>Рецепт</div>
          {ingredients.map((ingredient, index) => (
            <StyledIngredientsInputWrapper key={`ingredientInput${index}`}>
              <StyledIngredientInput
                type="text"
                placeholder="ID"
                value={ingredient.id}
                onChange={(e) => handleIngredientIdChange(e, index)}
              />
              <StyledIngredientInput
                type="text"
                placeholder="Количество"
                value={ingredient.amount}
                onChange={(e) => handleIngredientAmountChange(e, index)}
              />
              <StyledDeleteIconWrapper>
                <DeleteIcon
                  onClick={() => handleRemoveIngredientButtonClick(index)}
                />
              </StyledDeleteIconWrapper>
            </StyledIngredientsInputWrapper>
          ))}
          <StyledAddIngredientButton onClick={handleAddIngredientButtonClick}>
            +
          </StyledAddIngredientButton>
          <div>Способ смешивания</div>
          <StyledFilterWrapper>
            <FilterGroup
              filters={mixingMethods}
              value={checkedMixingMethod}
              onFilterChange={(value) => {
                handleOnFilterChange("mixingMethods", value);
              }}
            />
          </StyledFilterWrapper>
          <div>Способ подачи</div>
          <StyledFilterWrapper>
            <FilterGroup
              filters={tableware.map((item) => ({
                ...item,
                name: item.nameRu,
              }))}
              value={checkedTableware}
              onFilterChange={(value) => {
                handleOnFilterChange("tableware", value);
              }}
            />
          </StyledFilterWrapper>
          <StyledFilterWrapper>
            <FilterGroup
              filters={garnish.map((item) => ({ ...item, name: item.nameRu }))}
              value={checkedGarnish}
              onFilterChange={(value) => {
                handleOnFilterChange("garnish", value);
              }}
            />
          </StyledFilterWrapper>
        </div>
      </StyledMainInfo>
      <div>Вкус</div>
      <StyledFilterWrapper>
        <FilterGroup
          filters={tastes}
          multiple
          value={checkedTastes}
          onFilterChange={(value) => {
            handleOnFilterChange("tastes", value);
          }}
        />
      </StyledFilterWrapper>
      <div>
        <StyledDescriptionTextArea
          name="legend"
          onChange={formik.handleChange}
          value={formik.values.legend}
          placeholder="Описание  "
        ></StyledDescriptionTextArea>
      </div>
      <StyledSubmitButtonWrapper>
        <StyledSubmitButton onClick={handleSaveButtonClick}>
          Готово
        </StyledSubmitButton>
      </StyledSubmitButtonWrapper>
    </div>
  );
};

export default AdminCreateCocktailPage;
