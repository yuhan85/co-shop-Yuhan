import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Search from "./Search";

const Styledheader = styled.header`
    background-color:#333333;
    color:#fff;
    padding:20px 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Phone = styled.p`
  color: #fff;
  margin: 0;
`;

export default function Header() {
    return(
        <>
            <Search/>
            <Styledheader>        
                <Center>
                    <Nav>
                        <LinkContainer>
                            <StyledLink href={'/'}>Home</StyledLink>
                            <StyledLink href={'/product/66c612c65ceffddc41609ed4'}>Product</StyledLink>
                            <StyledLink href={'/cart'}>Shopping Cart</StyledLink>
                            <StyledLink href={'/checkout'}>Checkout</StyledLink>
                        </LinkContainer>
                        <Phone>(298)888-8888</Phone>
                    </Nav>
                </Center>
            </Styledheader>
        </>
    );
}
