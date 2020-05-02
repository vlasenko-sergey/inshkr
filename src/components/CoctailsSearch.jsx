import React from 'react'
import styled from 'styled-components'

const StyledCoctailsSearchInput = styled.input`
    height: 40px;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: 2px solid #9C9C9C;
    outline: none;
    width: 100%;
    margin-top: 20px;
    padding: 18px 9px;

    ::placeholder {
        color: #C4C4C4;
    }
`;

const CoctailsSearch = () => {
    return (
        <div>
            <StyledCoctailsSearchInput placeholder="Поиск" />
        </div>
    )
}

export default CoctailsSearch
