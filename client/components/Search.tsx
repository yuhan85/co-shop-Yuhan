import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';


const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  width: 70px;
  margin-right: 0.5rem;
`;

const SiteName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchForm = styled.form`
  margin: 0 1rem;
  display:flex;
  position: relative;
  width:100%;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;

const SearchButton = styled.button`
  background-color: #00B207;
  color: white;
  border: none;
  padding: 0rem 1rem;
  border-radius: 20px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  position: relative;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.3rem;
  font-size: 0.75rem;
`;

const Subtotal = styled.span`
  margin-left: 1rem;
`;

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
      };
  
    return (
      <Nav>
        <LogoContainer>
          <Logo src="/images/Co-Shop_Logo.png" alt="Logo" />
          <SiteName>Co-shop</SiteName>
        </LogoContainer>
  
        <SearchForm onSubmit={handleSearch}>
        <SearchInputContainer>
            <SearchIcon />
            <SearchInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
        </SearchInputContainer>
         
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
  
        <IconContainer>
          <Icon>
            <FaHeart />
          </Icon>
          <Icon>
            <FaShoppingCart />
            <CartBadge>0</CartBadge>
          </Icon>
          <Subtotal>$0.00</Subtotal>
        </IconContainer>
      </Nav>
    );
  };

export default Search