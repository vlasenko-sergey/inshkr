import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createParty } from "../../features/parties/partySlice";
import { useFormik } from "formik";
import ChooseCocktailsModal from "../modals/ChooseCocktailsModal";
import Cocktail from "../cocktails/Cocktail";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
`;

const StyledInput = styled.input`
  height: 40px;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: 2px solid #9c9c9c;
  outline: none;
  width: 100%;
  padding: 18px 9px;
`;

const StyledTextArea = styled.textarea`
  border: 2px solid #9c9c9c;
  width: 100%;
  height: 115px;
  resize: none;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.2em;
  font-family: Montserrat;
`;

const StyledButton = styled.button`
  display: inline-block;
  min-width: 150px;
  margin: 20px auto;
  background: #8bc34a;
  color: #fefefe;
  font-size: 1.2em;
  padding: 1em;
  border-radius: 4px;
  text-align: center;
  position: relative;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  transition: border-radius linear 0.05s, width linear 0.05s;
`;

const StyledCocktailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  ${StyledInput} {
    width: 100px;
    margin-left: 30px;
  }

  > div {
    width: 35%;
  }
`;

const CreatePartyPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      legend: "",
      guestsCount: 1,
    },
    onSubmit: (values) => {
      const cocktailsAmountObject = cocktails.map((cocktail) => ({
        cocktail: { id: cocktail.id },
        amount: cocktailsAmount[cocktail.id] || 1,
      }));
      dispatch(
        createParty({
          name: values.name,
          guestsCount: values.guestsCount,
          legend: values.legend,
          members: [],
          cocktailAmount: cocktailsAmountObject,
        })
      );
    },
  });

  const dispatch = useDispatch();
  const [isChooseCocktailModalOpen, setIsChooseCocktailModalOpen] = useState(
    false
  );
  const [cocktails, setCocktails] = useState([]);
  const [cocktailsAmount, setCocktailsAmount] = useState({});

  const handleSendButtonClick = () => {
    formik.handleSubmit();
  };

  const handleChooseCocktailsButton = () => {
    setIsChooseCocktailModalOpen(true);
  };

  const handleCheckedCocktailsChange = useCallback((checkedCocktails) => {
    setCocktails([...checkedCocktails]);
  }, []);

  const handleAmountInputChange = (id, amount) => {
    setCocktailsAmount({ ...cocktailsAmount, [id]: amount });
  };

  return (
    <>
      <ChooseCocktailsModal
        isOpen={isChooseCocktailModalOpen}
        setIsOpen={setIsChooseCocktailModalOpen}
        onCheckedCocktailsChange={handleCheckedCocktailsChange}
        selectedCocktails={cocktails}
      />
      <div>
        <StyledInputWrapper>
          <StyledInput
            name="name"
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
            placeholder="Название"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            name="guestsCount"
            onChange={formik.handleChange}
            type="number"
            value={formik.values.guestsCount}
            placeholder="Количество гостей"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledTextArea
            name="legend"
            value={formik.values.legend}
            onChange={formik.handleChange}
            placeholder="Описание"
          />
        </StyledInputWrapper>
        <div>
          <StyledButton onClick={handleChooseCocktailsButton}>
            Выбрать коктейли
          </StyledButton>
        </div>
        <div>
          {cocktails.map((cocktail) => (
            <StyledCocktailWrapper key={cocktail.id}>
              <Cocktail cocktail={cocktail} />
              <StyledInput
                onChange={(e) =>
                  handleAmountInputChange(cocktail.id, e.target.value)
                }
                type="number"
                step="1"
                defaultValue={1}
              />
            </StyledCocktailWrapper>
          ))}
        </div>
        <div>
          <StyledButton onClick={handleSendButtonClick}>Сохранить</StyledButton>
        </div>
      </div>
    </>
  );
};

export default CreatePartyPage;
