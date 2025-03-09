import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TopBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const LocationText = styled.span`
  font-size: 1.2rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  z-index: 1;
`;

const OptionItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SignInLink = styled.a`
  color: #00b207;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const TopBar: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');
  const [selectedCurrency, setSelectedCurrency] = useState('CAD');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setIsCurrencyDropdownOpen(false);
  };

  const handleSignInClick = () => {
    router.push('/login');
  };

  return (
    <TopBarContainer>
      <LocationContainer>
        <LocationIcon />
        <LocationText>Halifax, NS</LocationText>
      </LocationContainer>
      <OptionsContainer>
        <DropdownContainer>
          <DropdownButton
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            {selectedLanguage}
            {isLanguageDropdownOpen ? (
              <FaChevronUp className='ml-2' />
            ) : (
              <FaChevronDown className='ml-2' />
            )}
          </DropdownButton>
          {isLanguageDropdownOpen && (
            <DropdownOptions>
              <OptionItem onClick={() => handleLanguageChange('ENG')}>
                ENG
              </OptionItem>
              <OptionItem onClick={() => handleLanguageChange('FRA')}>
                FRA
              </OptionItem>
            </DropdownOptions>
          )}
        </DropdownContainer>
        <DropdownContainer>
          <DropdownButton
            onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
          >
            {selectedCurrency}
            {isCurrencyDropdownOpen ? (
              <FaChevronUp className='ml-2' />
            ) : (
              <FaChevronDown className='ml-2' />
            )}
          </DropdownButton>
          {isCurrencyDropdownOpen && (
            <DropdownOptions>
              <OptionItem onClick={() => handleCurrencyChange('CAD')}>
                CAD
              </OptionItem>
              <OptionItem onClick={() => handleCurrencyChange('USD')}>
                USD
              </OptionItem>
              <OptionItem onClick={() => handleCurrencyChange('EUR')}>
                EUR
              </OptionItem>
            </DropdownOptions>
          )}
        </DropdownContainer>
        <SignInLink onClick={handleSignInClick}>Sign In / Sign Up</SignInLink>
      </OptionsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
