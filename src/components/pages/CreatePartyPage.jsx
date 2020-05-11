import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createParty } from "../../features/parties/partySlice";
import { useFormik } from "formik";
import ChooseCocktailsModal from "../modals/ChooseCocktailsModal";
import Cocktail from "../cocktails/Cocktail";

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
        <input
          name="name"
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
        />
        <input
          name="guestsCount"
          onChange={formik.handleChange}
          type="text"
          value={formik.values.guestsCount}
        />
        <textarea
          name="legend"
          value={formik.values.legend}
          onChange={formik.handleChange}
        ></textarea>
        <button onClick={handleSendButtonClick}>Send</button>
        <button onClick={handleChooseCocktailsButton}>Add cocktail</button>
        <div>
          {cocktails.map((cocktail) => (
            <div key={cocktail.id}>
              <Cocktail cocktail={cocktail} />
              <input
                onChange={(e) =>
                  handleAmountInputChange(cocktail.id, e.target.value)
                }
                type="number"
                step="1"
                defaultValue={1}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreatePartyPage;
