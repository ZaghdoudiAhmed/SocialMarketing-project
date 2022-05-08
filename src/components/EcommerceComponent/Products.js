import React from 'react';
 
import styled from "styled-components";
import Product from './Product';
export default function Products() {
  return (
    <>
    <Container>
      
      <Product></Product>
    </Container>
    
    </>
  );
}
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;