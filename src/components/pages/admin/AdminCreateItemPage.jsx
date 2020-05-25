import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FilterGroup from "../../FilterGroup";
import { useParams, useHistory } from "react-router-dom";
import { fetchIngredientsProperties } from "../../../features/ingredients/ingredientsPropertiesSlice";
import {
  createIngredient,
  updateIngredient,
} from "../../../features/ingredients/ingredientsSlice";
import {
  createTableware,
  fetchTablewareById,
  updateTableware,
  resetTablewares,
} from "../../../features/ingredients/tablewareSlice";
import {
  createGarnish,
  fetchGarnishById,
  updateGarnish,
  resetGarnishs,
} from "../../../features/ingredients/garnishSlice";
import {
  fetchIngredientById,
  resetIngredient,
} from "../../../features/ingredients/ingredientSlice";
import { resetSearchIngredients } from "../../../features/ingredients/searchIngredientsSlice";
import Loader from "../../Loader";

const StyledImageWrapper = styled.div`
  width: 390px;
  flex-shrink: 0;
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

const ingredientSubgroupsFilter = (subgroup) =>
  subgroup.itemGroup.itemCategory.id === 1 ||
  subgroup.itemGroup.itemCategory.id === 2;

const tablewareSubgroupsFilter = (subgroup) =>
  subgroup.itemGroup.itemCategory.id === 3;

const garnishSubgroupsFilter = (subgroup) => subgroup.itemGroup.id === 10;

const getSubGroupFilter = (type) => {
  switch (type) {
    case "ingredient":
      return ingredientSubgroupsFilter;
    case "tableware":
      return tablewareSubgroupsFilter;
    case "garnish":
      return garnishSubgroupsFilter;
    default:
      return () => true;
  }
};

const AdminCreateItemPage = (props) => {
  const { type } = props;
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const tastes = useSelector(
    (state) => state.ingredientsProperties.items.tastes
  );
  const countries = useSelector(
    (state) => state.ingredientsProperties.items.countries
  );
  const subgroups = useSelector(
    (state) => state.ingredientsProperties.items.subGroups
  );
  const filteredSubgroups = subgroups
    ? subgroups.filter(getSubGroupFilter(type))
    : subgroups;
  const isPropertiesPending = useSelector(
    (state) => state.ingredientsProperties.isPending
  );
  const ingredientsProperties = useSelector(
    (state) => state.ingredientsProperties.items
  );
  const bases = useSelector((state) => state.ingredientsProperties.items.bases);
  const [checkedTastes, setCheckedTastes] = useState([]);
  const [checkedCountry, setCheckedCountry] = useState(null);
  const [checkedSubgroup, setCheckedSubgroup] = useState(null);
  const [checkedBase, setCheckedBase] = useState(null);
  const [ingredient, isPending, isCreated] = useSelector((state) => {
    switch (type) {
      case "ingredient":
        return [
          state.ingredient.item,
          state.ingredients.isPending,
          state.ingredients.isCreated,
        ];
      case "tableware":
        return [
          state.tableware.item,
          state.tableware.isPending,
          state.tableware.isCreated,
        ];
      case "garnish":
        return [
          state.garnish.item,
          state.garnish.isPending,
          state.garnish.isCreated,
        ];
      default:
        return [null, null];
    }
  });

  useEffect(() => {
    return () => {
      dispatch(resetSearchIngredients());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredientsProperties());
    if (id) {
      switch (type) {
        case "ingredient":
          dispatch(fetchIngredientById(id));
          break;
        case "tableware":
          dispatch(fetchTablewareById(id));
          break;
        case "garnish":
          dispatch(fetchGarnishById(id));
          break;
        default:
          break;
      }
    }
  }, [dispatch, id, type]);

  useEffect(() => {
    if (ingredient) {
      if (ingredient.taste) {
        setCheckedTastes([...ingredient.taste.map((taste) => taste.id)]);
      }
      if (ingredient.country) {
        setCheckedCountry(ingredient.country.id);
      }
      if (ingredient.itemSubgroup) {
        setCheckedSubgroup(ingredient.itemSubgroup.id);
      }
      if (ingredient.ingredientBase) {
        setCheckedBase(ingredient.ingredientBase.id);
      }
      if (ingredient.imageRef) {
        setImage(ingredient.imageRef);
      }
    }
  }, [ingredient]);

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
    if (filterName === "country") {
      setCheckedCountry(filterValue);
    }
    if (filterName === "subgroup") {
      setCheckedSubgroup(filterValue);
    }
    if (filterName === "base") {
      setCheckedBase(filterValue);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameRu: ingredient ? ingredient.nameRu : "",
      nameEn: ingredient ? ingredient.nameEn : "",
      legend: ingredient ? ingredient.legend : "",
    },
    onSubmit: (values) => {
      const requestValue = {
        ...values,
        id,
        taste: checkedTastes.map((taste) => ({ id: taste })),
        country: checkedCountry ? { id: checkedCountry } : null,
        itemSubgroup: { id: checkedSubgroup },
        ingredientBase: checkedBase ? { id: checkedBase } : null,
      };
      if (id) {
        switch (type) {
          case "ingredient":
            dispatch(updateIngredient(requestValue));
            break;
          case "tableware":
            dispatch(updateTableware(requestValue));
            break;
          case "garnish":
            dispatch(updateGarnish(requestValue));
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case "ingredient":
            dispatch(createIngredient(requestValue));
            break;
          case "tableware":
            dispatch(createTableware(requestValue));
            break;
          case "garnish":
            dispatch(createGarnish(requestValue));
            break;
          default:
            break;
        }
      }
    },
  });

  useEffect(() => {
    if (isCreated) {
      dispatch(resetIngredient());
      dispatch(resetGarnishs());
      dispatch(resetTablewares());
      history.replace("/admin/ingredients");
    }
  }, [isCreated, dispatch, history]);

  return (
    <div>
      {(isPropertiesPending || !ingredientsProperties || isPending) && (
        <Loader />
      )}
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
          {type === "ingredient" && (
            <>
              <div>Страна</div>
              {countries && (
                <>
                  <StyledFilterWrapper>
                    <FilterGroup
                      filters={countries}
                      value={checkedCountry}
                      onFilterChange={(value) => {
                        handleOnFilterChange("country", value);
                      }}
                    />
                  </StyledFilterWrapper>
                </>
              )}
            </>
          )}
          <div>
            <div>Подгруппа</div>
            {subgroups && (
              <StyledFilterWrapper>
                <FilterGroup
                  filters={filteredSubgroups}
                  value={checkedSubgroup}
                  onFilterChange={(value) => {
                    handleOnFilterChange("subgroup", value);
                  }}
                />
              </StyledFilterWrapper>
            )}
          </div>
          {type === "ingredient" && (
            <div>
              <div>Основа</div>
              {bases && (
                <StyledFilterWrapper>
                  <FilterGroup
                    filters={bases}
                    value={checkedBase}
                    onFilterChange={(value) => {
                      handleOnFilterChange("base", value);
                    }}
                  />
                </StyledFilterWrapper>
              )}
            </div>
          )}
          {type !== "tableware" && (
            <>
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
            </>
          )}
        </div>
      </StyledMainInfo>
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

export default AdminCreateItemPage;
