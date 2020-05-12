import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { deleteParty } from "../../features/parties/partySlice";
import { getCountLabel } from "../../utils/utils";

const StyledPartyItem = styled(Link)`
  margin-bottom: 30px;
  position: relative;
  display: flex;
  align-items: flex-end;
`;

const StyledPartyItemName = styled.div`
  font-size: 24px;
  line-height: 29px;
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
  margin-left: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledDeleteIconWrapper = styled.div`
  margin-left: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledDots = styled.div`
  border-bottom: 2px dotted #757575;
  flex-grow: 1;
  margin: 0 10px 4px 5px;
`;

const StyledPartyInfoCount = styled.div`
  width: 110px;
`;

const PartyListItem = (props) => {
  const { party } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    dispatch(deleteParty(id));
  };

  const handleEditButtonClick = (id, e) => {
    e.preventDefault();
    history.push(`/parties/edit/${id}`);
  };

  return (
    <StyledPartyItem to={`/parties/${party.id}`}>
      <StyledPartyItemName>{party.name}</StyledPartyItemName>
      <StyledDots />
      <StyledPartyItemInfo>
        <StyledPartyItemInfoContent>
          <StyledPartyItemInfoImage src="/guests.png" alt="" />{" "}
          <StyledPartyInfoCount>
            {getCountLabel(party.guestsCount, "гость", "гостя", "гостей")}
          </StyledPartyInfoCount>
        </StyledPartyItemInfoContent>
        <StyledPartyItemInfoContent>
          <StyledPartyItemInfoImage src="/glass.png" alt="" />{" "}
          <StyledPartyInfoCount>
            {getCountLabel(
              party.cocktailsCount,
              "коктейль",
              "коктейля",
              "коктейлей"
            )}
          </StyledPartyInfoCount>
        </StyledPartyItemInfoContent>
        {party.author && (
          <>
            {" "}
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
          </>
        )}
      </StyledPartyItemInfo>
    </StyledPartyItem>
  );
};

export default PartyListItem;
