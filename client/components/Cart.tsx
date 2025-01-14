import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const CartItems = styled.div`
  width: 200%;
`;

const CartSummaryContainer = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-left: 50px;
  margin-top: 130px;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 1rem;
  text-align: center;
  width: 150px; 
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: left; 
`;

const ProductName = styled.span`
  margin-left: 10px;  
  display: inline-block;
  vertical-align: middle;
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
`;

const ProductImage = styled(Image)`
  vertical-align: middle;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;  
  width: 100%; 
`;

const QuantityButton = styled.button`
  background-color: #e0e0e0;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 0.5rem;
`;

const RemoveButton = styled.button`
  background-color: #e0e0e0;
  color: grey;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem; 
`;

const CartSummary = styled.div`
  text-align: left;
`;

const CartSummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const CheckoutButton = styled.button`
  background-color: #00b207;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  cursor: pointer;
  border-radius: 20px;
  font-size: 1.25rem;
  margin-top: 1.5rem;
`;

const CouponSection = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CouponInput = styled.input`
  padding: 0.75rem;
  width: 80%;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const ApplyCouponButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 20px;
`;

const ReturnToShopButton = styled.button`
  background-color: #e0e0e0;
  color: black;
  border: none;
  padding: 1rem;
  width: 100%;
  cursor: pointer;
  border-radius: 20px;
  font-size: 1rem;
  margin-top: 1rem;
`;

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Green Capsicum', price: 14.0, quantity: 1, imageUrl: '/images/green-capsicum.png' },
    { id: 2, name: 'Red Capsicum', price: 14.0, quantity: 1, imageUrl: '/images/red-capsicum.png' },
  ]);

  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const router = useRouter();

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const returnToShop = () => {
    router.push('/');
  };

  const returnToCheckout = () => {
    router.push('/checkout');
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'SAVE20%'){
      setDiscount(subtotal * 0.2);
    } else if (couponCode === 'SAVE10%'){
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  return (
    <CartContainer>
      <CartItems>
        <CartTitle>My Shopping Cart</CartTitle>
        <CartTable>
          <thead>
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Subtotal</TableHeader>
              <TableHeader></TableHeader>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <TableCell>
                  <ProductInfo>
                    <ProductImage src={item.imageUrl} alt={item.name} width={50} height={50} />
                    <ProductName>{item.name}</ProductName>
                  </ProductInfo>
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <QuantityControl>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, -1)}>-</QuantityButton>
                    {item.quantity}
                    <QuantityButton onClick={() => handleQuantityChange(item.id, 1)}>+</QuantityButton>
                  </QuantityControl>
                </TableCell>
                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>×</RemoveButton>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </CartTable>
        <ReturnToShopButton onClick={returnToShop}>Return to shop</ReturnToShopButton>
        <CouponSection>
          <CouponInput type="text" placeholder="Enter code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
          <ApplyCouponButton onClick={handleApplyCoupon}>Apply Coupon</ApplyCouponButton>
        </CouponSection>
      </CartItems>

      <CartSummaryContainer>
        <CartSummary>
          <CartSummaryTitle>Cart Total</CartSummaryTitle>
          <SummaryItem>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
          </SummaryItem>
          <SummaryItem>
            <strong>Discount:</strong> ${discount.toFixed(2)}
          </SummaryItem>
          <SummaryItem>
            <strong>Shipping:</strong> Free
          </SummaryItem>
          <SummaryItem>
            <strong>Total:</strong> ${total.toFixed(2)}
          </SummaryItem>
        </CartSummary>
        <CheckoutButton onClick={returnToCheckout}>Proceed to checkout</CheckoutButton>
      </CartSummaryContainer>
    </CartContainer>
  );
};

export default Cart;
