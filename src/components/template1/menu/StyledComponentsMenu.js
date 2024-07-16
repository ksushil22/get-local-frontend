import styled from "styled-components";
import {COLORS} from "../constants";

export const StyledMenuContainer = styled.div`
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const StyledMenuHeaderContainer = styled.div`
    position: relative;
    width: 70%;
    text-align: center;
    margin: 20px 0;
    background: ${COLORS.PRIMARY_COLOR};
    color: rgba(245, 245, 245, 0.8);
    border-radius: 2px;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 2px;
        border: 1px solid rgba(245, 245, 245, 0.8);
    }

    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const StyledHeading = styled.span`
    font-size: xx-large;
    font-weight: bolder;
`;

export const StyledTabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    justify-content: center;
    background: #e5e5e5;
    box-shadow: 0 48px 80px -32px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    flex-direction: column;

    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
`;

export const StyledLabel = styled.label`
    width: 100%;
    height: 66px;
    padding: 20px 30px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    transition: all 0.5s ease-in-out;
    border-color: #ccc;
    border-width: 1px 0;
    border-style: solid;
    display: flex;
    justify-content: space-between;

    @media (hover: hover) {
        &:hover {
            background: ${COLORS.PRIMARY_COLOR} !important;
            color: ${COLORS.PRIMARY_BACKGROUND}!important;
        }
    }


    @media (max-width: 992px) {
        border-width: 1px 0;
    }
`;

export const StyledPanel = styled.div`
    background: #fff;
    width: 100%;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 2px;
        background-color: #e7e7e7;
        border: none;
        box-shadow: inset 0 0 6px rgba(202, 202, 202, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #363636;
    }
`;

export const StyledMenuItemCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    padding: 3px 15px;
    border-radius: 2px;
    background-color: ${COLORS.PRIMARY_BACKGROUND};
    transition: box-shadow 0.5s ease, padding 0.3s ease;
    cursor: pointer;
    @media (hover: hover) {
        &:hover {
            box-shadow: 0 48px 80px -32px rgba(0, 0, 0, 0.3);
            padding: 8px 23px;
        }
    }
`
