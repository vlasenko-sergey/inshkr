import React from "react";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { useDispatch } from "react-redux";
import { deleteIngredient } from "../../features/ingredients/ingredientsSlice";
import { deleteItemFromList } from "../../features/ingredients/searchIngredientsSlice";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { deleteTableware } from "../../features/ingredients/tablewareSlice";
import { deleteGarnish } from "../../features/ingredients/garnishSlice";
import { useHistory } from "react-router-dom";
import { deleteCocktail } from "../../features/cocktails/cocktailsSlice";
import Swal from "sweetalert2";

const StyledAdminTileItemNameRu = styled.div`
  font-size: 14px;
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;
`;

const StyledAdminTileItem = styled.div`
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  height: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledDeleteIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledEditIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const AdminTileItem = (props) => {
  const { item, type } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    Swal.fire({
      title: "Вы уверены?",
      text: "Коктейль будет удалён без возможности восстановления!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Отмена",
      confirmButtonText: "Да, удалить!",
    }).then((res) => {
      if (res.isConfirmed) {
        switch (type) {
          case "ingredient":
            dispatch(deleteIngredient(item.id));
            dispatch(deleteItemFromList(item.id));
            break;
          case "tableware":
            dispatch(deleteTableware(item.id));
            dispatch(deleteItemFromList(item.id));
            break;
          case "garnish":
            dispatch(deleteGarnish(item.id));
            dispatch(deleteItemFromList(item.id));
            break;
          case "cocktail":
            dispatch(deleteCocktail(item.id));
            dispatch(deleteItemFromList(item.id));
            break;
          default:
            break;
        }
      }
    });
  };

  const handleEditButtonClick = (id, e) => {
    e.preventDefault();
    switch (type) {
      case "ingredient":
        history.push(`/admin/ingredients/${id}/edit`);
        break;
      case "tableware":
        history.push(`/admin/tableware/${id}/edit`);
        break;
      case "garnish":
        history.push(`/admin/garnish/${id}/edit`);
        break;
      case "cocktail":
        history.push(`/admin/cocktails/${id}/edit`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StyledAdminTileItem>
        <StyledAdminTileItemNameRu>{item.nameRu}</StyledAdminTileItemNameRu>
        <StyledDeleteIconWrapper onClick={handleDeleteButtonClick}>
          <DeleteIcon />
        </StyledDeleteIconWrapper>
        <StyledEditIconWrapper
          onClick={(e) => handleEditButtonClick(item.id, e)}
        >
          <EditIcon />
        </StyledEditIconWrapper>
      </StyledAdminTileItem>
    </>
  );
};

export default AdminTileItem;
