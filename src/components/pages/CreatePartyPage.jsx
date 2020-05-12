import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createParty,
  resetParty,
  fetchParty,
  updateParty,
} from "../../features/parties/partySlice";
import { useFormik } from "formik";
import ChooseCocktailsModal from "../modals/ChooseCocktailsModal";
import Cocktail from "../cocktails/Cocktail";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../Loader";

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
  text-align: center;
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
  flex-direction: column;
  width: 25%;

  ${StyledInput} {
    width: 100px;
    margin-left: 30px;
  }

  > div {
    width: 100%;
  }
`;

const StyledCocktails = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CreatePartyPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [isChooseCocktailModalOpen, setIsChooseCocktailModalOpen] = useState(
    false
  );
  const [cocktails, setCocktails] = useState([]);
  const [cocktailsAmount, setCocktailsAmount] = useState({});
  const isPending = useSelector((state) => state.party.isPending);
  const isCreated = useSelector((state) => state.party.isCreated);
  const party = useSelector((state) => state.party.item);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: party ? party.name : "",
      legend: party ? party.legend : "",
      guestsCount: party ? party.guestsCount : 1,
    },
    onSubmit: (values) => {
      const cocktailsAmountObject = cocktails.map((cocktail) => ({
        cocktail: { id: cocktail.id },
        amount: cocktailsAmount[cocktail.id] || 1,
      }));
      const value = {
        name: values.name,
        guestsCount: values.guestsCount,
        legend: values.legend,
        members: [],
        cocktailAmount: cocktailsAmountObject,
      };
      if (id) {
        value.id = id;
      }
      if (id) {
        dispatch(updateParty(value));
      } else {
        dispatch(createParty(value));
      }
    },
  });

  useEffect(() => {
    if (id !== null && id !== undefined) {
      dispatch(fetchParty(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (party) {
      setCocktails(party.cocktailAmount.map((item) => item.cocktail));
      const amount = {};
      party.cocktailAmount.forEach(item => {
        amount[item.cocktail.id] = item.amount;
      });
      setCocktailsAmount(amount);
    }
  }, [party]);

  useEffect(() => {
    return () => {
      dispatch(resetParty());
    };
  }, [dispatch]);

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

  useEffect(() => {
    if (isCreated) {
      dispatch(resetParty());
      history.replace("/parties");
    }
  }, [isCreated, dispatch, history]);

  if (isPending && id) {
    return <Loader />;
  }

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
        <StyledCocktails>
          {cocktails.map((cocktail) => (
            <StyledCocktailWrapper key={cocktail.id}>
              <Cocktail cocktail={cocktail} />
              <StyledInput
                onChange={(e) =>
                  handleAmountInputChange(cocktail.id, e.target.value)
                }
                type="number"
                step="1"
                defaultValue={cocktailsAmount[cocktail.id] || 1}
              />
            </StyledCocktailWrapper>
          ))}
        </StyledCocktails>
        <div>
          <StyledButton onClick={handleSendButtonClick}>
            {!isPending && "Сохранить"}
            {isPending && "Loading"}
          </StyledButton>
        </div>
      </div>
    </>
  );
};

export default CreatePartyPage;
