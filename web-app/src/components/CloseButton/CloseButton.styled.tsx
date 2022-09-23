import styled from "styled-components";

export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
    &:focus {
        outline: none;
    }
`;