import Header from './Header';
// import Footer from './footer'

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
