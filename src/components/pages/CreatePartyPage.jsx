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
import SmallLoader from "../SmallLoader";

const StyledInputWrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  font-size: 48px;
  line-height: 59px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  width: 70%;
`;

const StyledCountInput = styled.input`
  font-size: 36px;
  line-height: 40px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  width: 80px;
  margin-left: 10px;
`;

const StyledTextArea = styled.textarea`
  border: 2px solid #9c9c9c;
  width: 100%;
  height: 115px;
  resize: none;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  font-family: Montserrat;
  margin-bottom: 20px;
`;

const StyledCocktailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;
  width: 25%;

  ${StyledCountInput} {
    margin-left: 0;
  }

  > div {
    width: 100%;
  }
`;

const StyledCocktails = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledChooseCocktailsButton = styled.span`
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledSaveButton = styled.span`
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
`;

const StyledButtonImage = styled.img`
  height: 30px;
  margin-right: 15px;
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
      party.cocktailAmount.forEach((item) => {
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

  if ((isPending || !party) && id) {
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
          <img src="/guests.png" alt="" />
          <StyledCountInput
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
          <StyledChooseCocktailsButton onClick={handleChooseCocktailsButton}>
            <StyledButtonImage src="/glass.png" />
            Выбрать коктейли
          </StyledChooseCocktailsButton>
        </div>
        <StyledCocktails>
          {cocktails.map((cocktail) => (
            <StyledCocktailWrapper key={cocktail.id}>
              <Cocktail cocktail={cocktail} />
              <StyledCountInput
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
          <StyledSaveButton onClick={handleSendButtonClick}>
            <StyledButtonImage src="/save.png" />
            {!isPending && "Сохранить"}
            {isPending && (
              <SmallLoader />
            )}
          </StyledSaveButton>
        </div>
      </div>
    </>
  );
};

export default CreatePartyPage;
