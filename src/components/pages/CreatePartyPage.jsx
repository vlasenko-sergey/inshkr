import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createParty } from "../../features/parties/partySlice";
import { useFormik } from "formik";
import ChooseCocktailsModal from "../modals/ChooseCocktailsModal";

const CreatePartyPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      legend: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // dispatch(
      //   createParty({
      //     name,
      //     author: null,
      //     guestsCount: 0,
      //     legend: "",
      //     members: [],
      //     cocktailAmount: [],
      //   })
      // );
    },
  });

  const dispatch = useDispatch();
  const [isChooseCocktailModalOpen, setIsChooseCocktailModalOpen] = useState(
    false
  );
  const [cocktails, setCocktails] = useState([]);

  const handleSendButtonClick = () => {
    formik.handleSubmit();
  };

  const handleChooseCocktailsButton = () => {
    setIsChooseCocktailModalOpen(true);
  };

  const handleCheckedCocktailsChange = useCallback((checkedCocktails) => {
    setCocktails([...checkedCocktails]);
  }, []);

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
      </div>
    </>
  );
};

export default CreatePartyPage;
