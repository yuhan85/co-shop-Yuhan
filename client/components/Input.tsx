import styled,{css} from "styled-components";
import { useState } from "react";
  
const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    ${(props) =>
        (props.type === 'checkbox' || props.type === 'radio') &&
        css`
        width: auto;
        margin-bottom: 0;
        padding: 0;
        margin-top: 0;
    `}
`;

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    
    return<StyledInput {...props}></StyledInput>
}