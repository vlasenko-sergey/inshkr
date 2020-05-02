import React from 'react'
import styled from 'styled-components';

const StyledPageWrapper = styled.div`
    background-color: #ffffff;
    flex-grow: 1;
    width: 1000px;
    margin: auto;
    padding: 26px 60px;
`;

const PageWrapper = (props) => {
    return (
        <StyledPageWrapper>
            {props.children}
        </StyledPageWrapper>
    )
}

export default PageWrapper
