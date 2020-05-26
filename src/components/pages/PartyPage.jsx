import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchParty,
  resetParty,
  invite,
  dismiss,
} from "../../features/parties/partySlice";
import styled from "styled-components";
import CocktailsList from "../cocktails/CocktailsList";
import Loader from "../Loader";
import { getCountLabel } from "../../utils/utils";
import { fetchUsers, resetUsers } from "../../features/users/usersSlice";
import UsersModal from "../modals/UsersModal";

const StyledPartyGuestsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const StyledPartyGuestsInfoImage = styled.img`
  margin-right: 15px;
`;

const StyledPartyGuestsInfoText = styled.span`
  font-size: 18px;
  line-height: 22px;
`;

const StyledPartyInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledH2 = styled.h2`
  text-transform: none;
  text-align: left;
  margin-bottom: 20px;
`;

const StyledMainInfo = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const StyledMainInfoIngredients = styled.div`
  width: calc(55% - 60px);
  flex-shrink: 0;
  margin-right: 60px;
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

const StyledMainInfoContent = styled.div`
  padding-left: 30px;
  text-align: justify;
`;

const StyledTableware = styled.div`
  display: flex;
  margin-bottom: 40px;
  padding-left: 30px;

  img {
    margin-right: 15px;
    max-height: 60px;
  }
`;

const StyledDismissButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 20px;
  padding: 0;
`;

const StyledMember = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledMembers = styled.div`
  width: fit-content;
`;

const StyledInviteButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding: 0;
  margin-top: 30px;

  img {
    margin-right: 8px;
  }
`;

const PartyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const party = useSelector((state) => state.party.item);
  const isPending = useSelector((state) => state.party.isPending);
  const [cocktailsAmount, setCocktailsAmount] = useState({});
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const users = useSelector((state) => state.users.items);
  const user = useSelector((state) => state.user.item);

  useEffect(() => {
    if (id) {
      dispatch(fetchParty(id));
      dispatch(fetchUsers());
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(resetParty());
      dispatch(resetUsers());
    };
  }, [dispatch]);

  useEffect(() => {
    if (party) {
      const amounts = {};
      party.cocktailAmount.forEach((item) => {
        amounts[item.cocktail.id] = item.amount;
      });
      setCocktailsAmount(amounts);
    }
  }, [party]);

  const handleAddMemberButtonClick = () => {
    setIsUsersModalOpen(true);
  };

  const handleUserClick = (user) => {
    dispatch(invite({ partyId: party.id, user }));
  };

  const handleDeleteMemberClick = (id) => {
    dispatch(dismiss({ partyId: party.id, userId: id }));
  };

  if (isPending) {
    return <Loader />;
  }

  if (!party) {
    return null;
  }

  return (
    <div>
      {users && (
        <UsersModal
          isOpen={isUsersModalOpen}
          setIsOpen={setIsUsersModalOpen}
          users={users.filter((user) => {
            if (party.author && user.id === party.author.id) {
              return false;
            }
            return (
              party.members.findIndex((member) => member.id === user.id) < 0
            );
          })}
          onUserClick={handleUserClick}
        />
      )}
      <h1>{party.name}</h1>
      <StyledPartyInfo>
        <StyledPartyGuestsInfo>
          <StyledPartyGuestsInfoImage src="/guests.png" alt="" />
          <StyledPartyGuestsInfoText>
            {getCountLabel(party.guestsCount, "гость", "гостя", "гостей")}
          </StyledPartyGuestsInfoText>
        </StyledPartyGuestsInfo>
        <StyledPartyGuestsInfo>
          <StyledPartyGuestsInfoImage src="/glass.png" alt="" />
          <StyledPartyGuestsInfoText>
            {getCountLabel(
              party.cocktailAmount.length,
              "коктейль",
              "коктейля",
              "коктейлей"
            )}
          </StyledPartyGuestsInfoText>
        </StyledPartyGuestsInfo>
      </StyledPartyInfo>
      <div>
        <CocktailsList
          cocktails={party.cocktailAmount.map((item) => item.cocktail)}
          cocktailsAmount={cocktailsAmount}
        />
      </div>
      <StyledMainInfo>
        <StyledMainInfoIngredients>
          <StyledH2>Вам понадобится:</StyledH2>
          <StyledMainInfoContent>
            {party.recipePart
              .filter((ingredientAmount) => ingredientAmount.amount)
              .map((ingredientAmount) => (
                <StyledIngredientWrapper key={ingredientAmount.ingredient.id}>
                  <div>{ingredientAmount.ingredient.nameRu}</div>
                  <StyledIngredientDots />
                  <div>{ingredientAmount.amount}</div>
                </StyledIngredientWrapper>
              ))}
            {party.recipePart
              .filter((ingredientAmount) => !ingredientAmount.amount)
              .map((ingredientAmount) => (
                <StyledIngredientWrapper key={ingredientAmount.ingredient.id}>
                  <div>{ingredientAmount.ingredient.nameRu}</div>
                </StyledIngredientWrapper>
              ))}
          </StyledMainInfoContent>
        </StyledMainInfoIngredients>
        <div>
          <StyledH2>Посуда и инвентарь:</StyledH2>
          <StyledTableware>
            {party.tableware.map((tableware) => (
              <Link to={`/tableware/${tableware.id}`}>
                <img
                  key={`tableware${tableware.id}`}
                  src={tableware.iconImageRef}
                  alt=""
                />
              </Link>
            ))}
          </StyledTableware>
          <StyledH2>Описание:</StyledH2>
          <StyledMainInfoContent>
            <div>{party.legend}</div>
          </StyledMainInfoContent>
        </div>
      </StyledMainInfo>
      {party.author && <StyledH2>Гости:</StyledH2>}
      <StyledMembers>
        {party.members.map((member) => (
          <StyledMember>
            {member.username}
            {party.author && party.author.id === user.id && (
              <StyledDismissButton
                onClick={() => handleDeleteMemberClick(member.id)}
              >
                <img src="/dismiss_member.png" alt="" />
              </StyledDismissButton>
            )}
          </StyledMember>
        ))}
        {party.author && party.author.id === user.id && (
          <StyledInviteButton onClick={handleAddMemberButtonClick}>
            <img src="/invite_member.png" alt="" /> Пригласить
          </StyledInviteButton>
        )}
      </StyledMembers>
    </div>
  );
};

export default PartyPage;
