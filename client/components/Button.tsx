import React from 'react';
import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: #fff;
  color: #00B207;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #00B207;
    color: #fff;
  }
`;



interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <PrimaryButton onClick={onClick}>
      {children}
    </PrimaryButton>
  );
};

export default Button;