import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled, {css} from "styled-components";
import Input from "@/components/Input";
import React, { useEffect, useState } from 'react';
import { mongooseConnect } from "@/lib/mongoose";
// import { IUser, User, dumpUser, mockedUser } from "../models/User";

const ColumnsWrapper = styled.div`
    display: grid;
    /* grid-template-columns: 1.3fr .7fr;
    gap: 40px; */
    margin-top: 40px;
`;

const InputsWrapper = styled.div`
    display: flex;
    gap: 0px;
    margin-top: 0px;
    margin-bottom:10px;
    align-items: 'center';
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const StyledTextArea = styled.textarea`
    width:100%;
    border-radius: 10px;
`;

const InfoInputsWrapper = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

`
const StyledLabel = styled.label`
    margin-bottom: 0px;
`

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

interface RadioFormsProps {
    title: string;
  }


  
  const RadioForms: React.FC<RadioFormsProps> = ({title}) => {
    // State to keep track of which form is currently selected
    const [selectedForm, setSelectedForm] = useState<string | null>(null);
    
    // Function to handle the radio button change
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedForm(event.target.value);
    };
    
    return (
      <div>
      <h2>{title}</h2>

    <InputsWrapper>
        <Input type="radio" name="paymentMethod" id="creditCard" value="creditCard" onChange={handleRadioChange}/> 
        <label htmlFor="creditCard">Credit card</label>
    </InputsWrapper>
    <InputsWrapper>
        <Input type="radio" name="paymentMethod" value="paypal" onChange={handleRadioChange} id="paypal"/> 
        <label htmlFor="paypal">Paypal</label>
    </InputsWrapper>

      {selectedForm === 'creditCard' && (
        <div>
          <h3>Credit Card Info</h3>
          <form>
            <label htmlFor="input1">Input 1:</label>
            <input type="text" id="input1" name="input1" />
          </form>
        </div>
      )}

      {selectedForm === 'paypal' && (
        <div>
          <h3>Paypal Info</h3>
          <form>
            <label htmlFor="input2">Input 2:</label>
            <input type="text" id="input2" name="input2" />
          </form>
        </div>
      )}
    </div>
  );
};

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}
interface ShippingInfoBoxProps {
  defaultUserInfo: IUser | null,
  shippingInfo: ShippingInfo,
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
}

const dumpShippingInfo:ShippingInfo = 
{
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  }

const ShippingInfoBox:React.FC<ShippingInfoBoxProps> = ({defaultUserInfo, shippingInfo, setShippingInfo}) => {
  // console.log("default user info: ", defaultUserInfo);
  const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked && defaultUserInfo) {
          setShippingInfo({         
            firstName: defaultUserInfo.firstName,
            lastName: defaultUserInfo.lastName,
            email: defaultUserInfo.emailAddress,
            phone: defaultUserInfo.phoneNumber,
            street: defaultUserInfo.addresses[0].street,
            city: defaultUserInfo.addresses[0].city,
            state: defaultUserInfo.addresses[0].state,
            zip: defaultUserInfo.addresses[0].zip, 
          });
        } else {      
          setShippingInfo(dumpShippingInfo);        
        }
      };

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        console.log({id, value});
        setShippingInfo((prevInfo) => ({
          ...prevInfo,
          [id]: value,
        }));
        // console.log(shippingInfo);
      };

    return (
        <Box>
        <h2>Shipping info</h2>
        <InputsWrapper>
            <Input type="checkbox" id="useDefShipInfo" checked={checked} onChange={handleCheckboxChange}/> 
            <StyledLabel htmlFor="useDefShipInfo">Use default shipping info?</StyledLabel>
        </InputsWrapper>
        <InfoInputsWrapper>
            <Input type="text" id="firstName" placeholder="First name" value={shippingInfo.firstName} onChange={handleInputChange}></Input>
            <Input type="text" id="lastName" placeholder="Last name" value={shippingInfo.lastName} onChange={handleInputChange}></Input>
            <Input type="email" id="email" placeholder="Email address" value={shippingInfo.email} onChange={handleInputChange}></Input>
            <Input type="text" id="phone" placeholder="Phone number" value={shippingInfo.phone} onChange={handleInputChange}></Input>
            <Input type="text" id="street" placeholder="Street" value={shippingInfo.street} onChange={handleInputChange}></Input>
            <Input type="text" id="city" placeholder="Town/City" value={shippingInfo.city} onChange={handleInputChange}></Input>
            <Input type="text" id="state" placeholder="State/Country" value={shippingInfo.state} onChange={handleInputChange}></Input>
            <Input type="text" id="zip" placeholder="ZIP/Postal code" value={shippingInfo.zip} onChange={handleInputChange}></Input>
        </InfoInputsWrapper>
        </Box>
    )
}

const BillingInfoBox:React.FC<ShippingInfo> = (shippingInfo: ShippingInfo) => {
  // console.log(shippingInfo);
    const [checked, setChecked] = useState(false);
    const [billingInfo, setBillingInfo] = useState<ShippingInfo>(dumpShippingInfo);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
          setBillingInfo(shippingInfo);
        } else {      
          setBillingInfo(dumpShippingInfo);        
        }
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        console.log({id, value});
        setBillingInfo((prevInfo) => ({
          ...prevInfo,
          [id]: value,
        }));
      };

    return (
        <Box>
        <h2>Billing info</h2>
        <InputsWrapper>
            <Input type="checkbox" id="useShipInfo" checked={checked} onChange={handleCheckboxChange}/> 
            <StyledLabel htmlFor="useShipInfo">Same as shipping info?</StyledLabel>
        </InputsWrapper>
        <InfoInputsWrapper>
            <Input type="text" id="firstName" placeholder="First name" value={billingInfo.firstName} onChange={handleInputChange}></Input>
            <Input type="text" id="lastName" placeholder="Last name" value={billingInfo.lastName} onChange={handleInputChange}></Input>
            <Input type="email" id="email" placeholder="Email address" value={billingInfo.email} onChange={handleInputChange}></Input>
            <Input type="text" id="phone" placeholder="Phone number" value={billingInfo.phone} onChange={handleInputChange}></Input>
            <Input type="text" id="street" placeholder="Address" value={billingInfo.street} onChange={handleInputChange}></Input>
            <Input type="text" id="city" placeholder="Town/City" value={billingInfo.city} onChange={handleInputChange}></Input>
            <Input type="text" id="state" placeholder="State/Country" value={billingInfo.state} onChange={handleInputChange}></Input>
            <Input type="text" id="zip" placeholder="ZIP/Postal code" value={billingInfo.zip} onChange={handleInputChange}></Input>
        </InfoInputsWrapper>
        </Box>
    )
}

const InfosBox:React.FC = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
    // let userData: IUser = dumpUser;
    // console.log(userData);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(dumpShippingInfo);

    useEffect(() => {
        fetchUserDefaultInfo();
    }, []);
    const fetchUserDefaultInfo = async () => {
        try {
          const res = await fetch('/api/user?_id=66ce894fd9d0b5bd7e995eb7'); // TODO: Replace with actual user ID
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error(error);
        }
    };
    return (
        <Box>
            <ShippingInfoBox defaultUserInfo={userData} shippingInfo={shippingInfo} setShippingInfo={setShippingInfo}></ShippingInfoBox>
            <BillingInfoBox {...shippingInfo}></BillingInfoBox>
        </Box>
    )
}

export default function CheckoutPage() {
    // const {cartProducts} = useContext(CartContext);
    const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement complete order functionality here
        console.log('Order complete');
      };
    return (
        <>
            <Header></Header>
            <Center>
                <ColumnsWrapper>
                    <StyledForm onSubmit={handleCheckout}>
                        <InfosBox></InfosBox>
                        <Box>
                            {/* <h2>Payment method</h2> */}
                                {/* <ColumnsWrapper inline = 'true'>
                                    <Input type="radio" name="paymentMethod" id="creditCard" /> 
                                    <label htmlFor="creditCard">Credit card</label>
                                </ColumnsWrapper>
                                <ColumnsWrapper inline = 'true'>
                                    <Input type="radio" name="paymentMethod" id="paypal"/> 
                                    <label htmlFor="paypal">Paypal</label>
                                </ColumnsWrapper> */}
                                <RadioForms title="Payment method">
                                </RadioForms>

                        </Box>
                        <Box>
                            <h2>Additional Informations</h2>
                            <StyledTextArea rows={10} placeholder="Any additional information?"></StyledTextArea>
                        </Box>
                        <Box>
                            <h2>Confirmation</h2>
                            <InputsWrapper>
                                <Input type="checkbox" id="recevieEmail"/>  
                                <label htmlFor="recevieEmail">I agree with sending an Marketing and newsletter emails. No spam, promissed!</label>
                            </InputsWrapper>
                            <InputsWrapper>
                                <Input type="checkbox" id="policyConsent"/> 
                                <label htmlFor="policyConsent">I agree with our terms and conditions and privacy policy.</label>
                            </InputsWrapper>

                        </Box>
                        <Button type="submit">Complete Order</Button>
                    </StyledForm>
                    {/* <Box>1</Box> */}
                </ColumnsWrapper>
            </Center>
        </>
    );
}

// export async function getServerSideProps() {
//     await mongooseConnect();
//     try {
//         // const existingUser = await User.findOne({ userId: '66c3ff93c0efbe6dc8d1ed88' });
//         const existingUser = await User.findOne({ firstName: 'John' });
//         if (!existingUser) {
//           await mockedUser.save();
//           console.log('User saved');
//         } else {
//           console.log('User already saved');
//           // Update operation
//           existingUser.firstName = 'Doe';
//           await existingUser.save();
//           console.log('User updated');
//         }

//         // Read operation
//         const allUsers = await User.find();
//         console.log('All users:', allUsers);
        
        
//         // // Delete operation
//         // await User.deleteOne({ userId: '66c3ff93c0efbe6dc8d1ed88' });
//         // console.log('User deleted');
//       } catch (error) {
//         console.log(error);
//       }
//     return {props: {}};
//     // const user = await User.findOne({userId: 'U123'});
// }