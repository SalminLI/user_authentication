import styled from 'styled-components';

const Form = styled.div`
  box-sizing: border-box;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: blue;
  color: white;
  border-color: #3f4eee;
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: 700;
  width: 45%;
  margin-right: 5px;
  font-size: 0.8rem;
  text-align:center;
`;

const Button2 = styled(Button)`
  background: yellow;
  color: blue;
  width: 100%;
`;

const Button3 = styled(Button)`
  background: blue;
  color: white;
  width: 100%;
`;

export { Form, Input, Button, Button2, Button3 };
