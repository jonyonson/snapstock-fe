import React from 'react';
import Header from '../Header/Header.js';
import Container from './Container';
import Footer from '../Footer';

import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <div>
        <Header />
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
