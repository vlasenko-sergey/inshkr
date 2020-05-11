import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CocktailesList from "../cocktails/CocktailesList";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../features/cocktails/cocktailsSlice";
import CocktailsSearch from "../cocktails/CoctailsSearch";

const chooseCocktailsModalStyles = {
  content: {
    width: "1200px",
    height: "90%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const ChooseCocktailsModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    onCheckedCocktailsChange,
    selectedCocktails,
  } = props;
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.items);
  const [checkedCocktails, setCheckedCocktails] = useState(new Set());

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  useEffect(() => {
    if (onCheckedCocktailsChange) {
      onCheckedCocktailsChange(checkedCocktails);
    }
  }, [checkedCocktails, onCheckedCocktailsChange]);

  const handleModalClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "initial";
  };

  const handleModalOpen = () => {
    document.documentElement.style.overflow = "hidden";
  };

  const handleFavoriteCocktailClick = (id) => {
    const newCheckedCocktails = new Set(checkedCocktails);
    if (checkedCocktails.has(id)) {
      newCheckedCocktails.delete(id);
    } else {
      newCheckedCocktails.add(id);
    }
    setCheckedCocktails(newCheckedCocktails);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={chooseCocktailsModalStyles}
      onRequestClose={handleModalClose}
      onAfterOpen={handleModalOpen}
    >
      <CocktailsSearch />
      <CocktailesList
        cocktails={cocktails}
        isFavoriteModeOn
        onFavoriteCocktailClick={handleFavoriteCocktailClick}
        favoriteCocktails={selectedCocktails}
      />
    </Modal>
  );
};

export default ChooseCocktailsModal;
