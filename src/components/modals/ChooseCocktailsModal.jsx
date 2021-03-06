import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import CocktailsList from "../cocktails/CocktailsList";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCocktails,
  searchCocktails,
} from "../../features/cocktails/cocktailsSlice";
import CocktailsSearch from "../cocktails/CoctailsSearch";
import Loader from "../Loader";

const chooseCocktailsModalStyles = {
  content: {
    width: "1200px",
    height: "90%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    "z-index": "999"
  }
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
  const isPending = useSelector((state) => state.cocktails.isPending);
  const [checkedCocktails, setCheckedCocktails] = useState([]);
  const [searchParams, setSearchParams] = useState({tastes: []});

  useEffect(() => {
    if (searchParams) {
      dispatch(searchCocktails(searchParams));
    }

    return () => {
      dispatch(resetCocktails());
    };
  }, [dispatch, searchParams]);

  useEffect(() => {
    setCheckedCocktails(selectedCocktails);
  }, [selectedCocktails]);

  const handleModalClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "initial";
  };

  const handleModalOpen = () => {
    document.documentElement.style.overflow = "hidden";
  };

  const handleFavoriteCocktailClick = (cocktail) => {
    const newCheckedCocktails = [...checkedCocktails];
    const cocktailIndex = newCheckedCocktails.findIndex(
      (checkedCocktail) => checkedCocktail.id === cocktail.id
    );
    if (cocktailIndex > -1) {
      newCheckedCocktails.splice(cocktailIndex, 1);
    } else {
      newCheckedCocktails.push(cocktail);
    }
    if (onCheckedCocktailsChange) {
      onCheckedCocktailsChange(newCheckedCocktails);
    }
  };

  const handleSearchParamsChange = useCallback((searchParams) => {
    setSearchParams(searchParams);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      style={chooseCocktailsModalStyles}
      onRequestClose={handleModalClose}
      onAfterOpen={handleModalOpen}
      ariaHideApp={false}
    >
      <CocktailsSearch onSearchParamsChange={handleSearchParamsChange} />
      {isPending && <Loader />}
      {!isPending && (
        <CocktailsList
          cocktails={cocktails}
          isFavoriteModeOn
          onFavoriteCocktailClick={handleFavoriteCocktailClick}
          favoriteCocktails={selectedCocktails}
        />
      )}
    </Modal>
  );
};

export default ChooseCocktailsModal;
