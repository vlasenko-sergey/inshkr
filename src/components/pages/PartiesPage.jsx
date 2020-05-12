import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParties } from "../../features/parties/partiesSlice";
import styled from "styled-components";

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
  padding: 20px;
  width: 45%;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledPartyItemName = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 20px;
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

const PartiesPage = () => {
  const dispatch = useDispatch();
  const parties = useSelector((state) => state.parties.items);

  useEffect(() => {
    dispatch(fetchParties());
  }, [dispatch]);

  return (
    <div>
      <h1>Готовые идеи</h1>
      <StyledCreatePartyWrapper>
        <StyledCreatePartyLink to="/parties/create">
          Создать подборку
        </StyledCreatePartyLink>
      </StyledCreatePartyWrapper>
      <StyledPartyItems>
        {parties &&
          parties.map((party) => (
            <StyledPartyItem to={`/parties/${party.id}`}>
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
      </StyledPartyItems>
    </div>
  );
};

export default PartiesPage;
