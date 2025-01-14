import React from 'react'
import Center from "@/components/Center";
import styled from "styled-components";
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';


const Bg = styled.div`
  background: url('/images/avacado.jpg') no-repeat center center;;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: #fff;
  height: 80vh; 
  padding: 0; 
  margin:2rem 0;  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;  
`;

const TitleWrapper = styled.div`
    margin-left:4rem;
`;

const Title = styled.h1`
  margin-top:6rem;
  width:50%;
  font-weight:normal;
  font-size:2rem;
  @media screen and (min-width: 768px) {
    font-size:4rem;
  }
`;

const DescWrapper = styled.div`
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #84D187; 
    }
`;

const Desc = styled.p`
  color:#fff;
  font-size:2rem;
  padding:0 1rem;

`;
const Desc2 = styled.p`
  color:#fff;
  font-size:1.5rem;
  padding:0 1rem;
`;
const StyledSpan = styled.span`
  color:#fff;
  background:#FF8A00;
  width: 50%;
  padding:0.5rem;
  border-radius: 10px;
  margin:0 10px;
`;

const ArrowRight =styled(FaArrowRight)`
    font-size:1rem;
    padding-left:0.5rem;
    padding-top:0.5rem;
`;

const Feature = () => {
  return (
    <Center>
        <Bg>
            <TitleWrapper>
                <Title>Fresh & Healthy Local Food Monthly package</Title>
                <DescWrapper>
                    <Desc>Join 10 Co-shoppers for<StyledSpan>50% OFF</StyledSpan></Desc>
                    <Desc2>Free shipping all order</Desc2>
                </DescWrapper>
                <Button>Co-Shop Now <ArrowRight></ArrowRight> </Button>
            </TitleWrapper>
        </Bg>
    </Center>


  )
}

export default Feature