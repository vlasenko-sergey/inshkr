import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchParties,
  resetParties,
  deletePartyFromList,
} from "../../features/parties/partiesSlice";
import styled from "styled-components";
import Loader from "../Loader";
import PartyListItem from "../parties/PartyListItem";

const StyledCreatePartyLink = styled(Link)`
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  margin-top: 20px;

  ::before {
    content: "+";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const StyledPartyItems = styled.div``;

const StyledPartyHeader = styled.h1`
  margin-bottom: 60px;
`;

const PartiesPage = () => {
  const dispatch = useDispatch();
  const parties = useSelector((state) => state.parties.items);
  const isPending = useSelector((state) => state.parties.isPending);
  const deletedId = useSelector((state) => state.party.deletedId);

  useEffect(() => {
    dispatch(fetchParties());

    return () => {
      dispatch(resetParties());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deletedId > -1) {
      dispatch(deletePartyFromList(deletedId));
    }
  }, [deletedId, dispatch]);

  if (isPending || !parties) {
    return <Loader />;
  }

  return (
    <div>
      <StyledPartyHeader>Мои подборки</StyledPartyHeader>
      <StyledPartyItems>
        {!isPending &&
          parties &&
          parties
            .filter((party) => party.author)
            .map((party) => <PartyListItem key={party.id} party={party} />)}
      </StyledPartyItems>
      <StyledCreatePartyLink to="/parties/create">
        Создать подборку
      </StyledCreatePartyLink>
      <StyledPartyHeader>Готовые идеи</StyledPartyHeader>
      <StyledPartyItems>
        {!isPending &&
          parties &&
          parties
            .filter((party) => !party.author)
            .map((party) => <PartyListItem key={party.id} party={party} />)}
      </StyledPartyItems>
    </div>
  );
};

export default PartiesPage;
