import React, { useState } from "react";
import styled from "styled-components";

const StyledImageWrapper = styled.div`
  width: 290px;
  height: 420px;
  position: relative;
  margin-right: 45px;
  overflow: hidden;
  border-radius: 30px;
`;

const StyledImageEmpty = styled.div`
  border: 2px dashed #333333;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledMainInfo = styled.div`
  display: flex;
  margin-top: 64px;
`;

const StyledTitle = styled.div`
  text-align: center;
`;

const StyledTitleRu = styled.input`
  font-size: 48px;
  line-height: 59px;
  text-align: center;
  text-transform: uppercase;
  outline: none;
`;

const StyledTitleEn = styled.input`
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 6px;
  outline: none;
`;

const StyledImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const StyledDescriptionTextArea = styled.textarea`
  border: 1px solid #000000;
  width: 100%;
  height: 115px;
  resize: none;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  font-family: Montserrat;
  margin-top: 30px; 
`;

const StyledImage = styled.img`
  border-radius: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BarCreateCocktailPage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <StyledTitle>
        <div>
          <StyledTitleRu type="text" defaultValue="МЁРТВЫЙ ЗАЯЦ" />
        </div>
        <div>
          <StyledTitleEn type="text" defaultValue="DEAD HARE" />
        </div>
      </StyledTitle>
      <StyledMainInfo>
        <StyledImageWrapper>
          {!image && <StyledImageEmpty>Загрузить изображение</StyledImageEmpty>}
          {image && <StyledImage src={image} />}
          <StyledImageInput type="file" onChange={handleImageChange} />
        </StyledImageWrapper>
        <div>
          <div>Рецепт</div>
          <div>Способ смешивания</div>
          <div>Способ подачи</div>
        </div>
      </StyledMainInfo>
      <div>Вкус</div>
      <div>
        <StyledDescriptionTextArea placeholder="Описание  "></StyledDescriptionTextArea>
      </div>
      <div>Готово</div>
    </div>
  );
};

export default BarCreateCocktailPage;
