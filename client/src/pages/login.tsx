import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignInCard = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 450px;
  max-width: 90vw;
`;

const SignInTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignInInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const SignInInputWithIcon = styled(SignInInput)`
  padding-right: 2.5rem;
`;

const SignInButton = styled.button`
  background-color: #00b207;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #008c05;
  }
  margin-top: 1rem;
  white-space: nowrap;
`;

const SwitchLink = styled.a`
  display: block;
  text-align: center;
  font-size: 1.1rem;
  color: #00b207;
  cursor: pointer;
  margin-top: 1.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const NameInput = styled(SignInInput)`
  width: 100%;
`;

const VerificationContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const VerificationInput = styled(SignInInput)`
  flex: 1;
  margin-bottom: 0;
  height: auto;
`;

const VerificationButton = styled.button`
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0 16px;
  background-color: #00b207;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.2rem;
  &:hover {
    background-color: #008c05;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface User {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  verificationCode?: string;
}

interface ApiResponse {
  message: string;
  user?: {
    id: number;
    email: string;
  };
}

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = isSignUp
      ? 'http://localhost:5000/auth/verify'
      : 'http://localhost:5000/auth/signIn';

    const data: any = isSignUp
      ? {
          username: email,
          code: verificationCode,
        }
      : {
          username: email,
          password,
        };

    try {
      const response = await axios.post<ApiResponse>(url, data);

      alert(response.data.message);

      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setVerificationCode('');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleSignUp = async () => {
    const data = {
      username: email,
      password,
      name: firstName,
      family_name: lastName,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/auth/signUp',
        data
      );

      alert('Verification code sent');
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <SignInContainer>
      <SignInCard>
        <SignInTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</SignInTitle>
        <SignInForm onSubmit={handleSubmit}>
          <SignInInput
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordContainer>
            <SignInInputWithIcon
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TogglePasswordButton
              type='button'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordButton>
          </PasswordContainer>
          {isSignUp && (
            <>
              <NameContainer>
                <NameInput
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <NameInput
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </NameContainer>
              <VerificationContainer>
                <VerificationInput
                  type='text'
                  placeholder='Verification Code'
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <VerificationButton type='button' onClick={handleSignUp}>
                  Send Code
                </VerificationButton>
              </VerificationContainer>
            </>
          )}
          <SignInButton type='submit'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </SignInButton>
        </SignInForm>
        <SwitchLink onClick={toggleSignUpMode}>
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </SwitchLink>
      </SignInCard>
    </SignInContainer>
  );
};

export default Login;
