import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function RootPage() {
  const history = useHistory();

  const [url, setURL] = useState('');

  const handleChange = e => {
    setURL(e.target.value);
  };

  const handleClick = () => {
    history.push(`/shelf?url=${url}`);
  };

  return (
    <Container>
      <Input value={url} onChange={handleChange} />
      <Button onClick={handleClick}>View Shelf</Button>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input.attrs({ className: 'block fixed' })`
  width: 480px;
  font-size: 16px;
  font-weight: normal;
`;

const Button = styled.button.attrs({ className: 'block' })`
  font-size: 16px;
`;

export default RootPage;
