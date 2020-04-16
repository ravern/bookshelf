import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

function BaseLayout(props) {
  const { children } = props;

  return <Container>{children}</Container>;
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = styled.div`
  margin: auto;
  max-width: 1024px;
`;

export default BaseLayout;
