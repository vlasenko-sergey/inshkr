import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchParties,
  resetParties,
  deletePartyFromList,
} from "../../features/parties/partiesSlice";
import styled from "styled-components";
import Loader from "../Loader";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { deleteParty } from "../../features/parties/partySlice";

const StyledCreatePartyLink = styled(Link)`
  color: #494949 !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ffffff;
  padding: 20px;
  border: 4px solid #494949 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
`;

const StyledCreatePartyWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledPartyItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledPartyItem = styled(Link)`
  margin-bottom: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 20px 50px 20px 20px;
  width: 45%;
  position: relative;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledPartyItemName = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
`;

const StyledPartyItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledPartyItemInfoContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 22px;
`;

const StyledPartyItemInfoImage = styled.img`
  margin-right: 15px;
`;

const StyledEditIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledDeleteIconWrapper = styled.div`
  position: absolute;

  right: 10px;
  bottom: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PartiesPage = () => {
  const dispatch = useDispatch();
  const parties = useSelector((state) => state.parties.items);
  const isPending = useSelector((state) => state.parties.isPending);
  const deletedId = useSelector((state) => state.party.deletedId);
  const history = useHistory();

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

  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    dispatch(deleteParty(id));
  };

  const handleEditButtonClick = (id, e) => {
    e.preventDefault();
    history.push(`/parties/edit/${id}`);
  };

  return (
    <div>
      <h1>Готовые идеи</h1>
      <StyledCreatePartyWrapper>
        <StyledCreatePartyLink to="/parties/create">
          Создать подборку
        </StyledCreatePartyLink>
      </StyledCreatePartyWrapper>
      <StyledPartyItems>
        {!isPending &&
          parties &&
          parties.map((party) => (
            <StyledPartyItem key={party.id} to={`/parties/${party.id}`}>
              <StyledEditIconWrapper
                onClick={(e) => handleEditButtonClick(party.id, e)}
              >
                <EditIcon />
              </StyledEditIconWrapper>
              <StyledDeleteIconWrapper
                onClick={(e) => handleDeleteButtonClick(party.id, e)}
              >
                <DeleteIcon />
              </StyledDeleteIconWrapper>
              <StyledPartyItemName>{party.name}</StyledPartyItemName>
              <StyledPartyItemInfo>
                <StyledPartyItemInfoContent>
                  <StyledPartyItemInfoImage src="/guests.png" alt="" />{" "}
                  {party.guestsCount} гостей
                </StyledPartyItemInfoContent>
                <StyledPartyItemInfoContent>
                  <StyledPartyItemInfoImage src="/glass.png" alt="" />{" "}
                  {party.cocktailsCount} коктейля
                </StyledPartyItemInfoContent>
              </StyledPartyItemInfo>
            </StyledPartyItem>
          ))}
        {isPending && <Loader />}
      </StyledPartyItems>
    </div>
  );
};

export default PartiesPage;
