import Footer from './Footer';
import Header from './Header';
// import Footer from './footer'

import React from 'react';
import { Toaster } from './ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-screen min-h-screen overflow-hidden">
      <Header />
      <main className="container mx-auto ">{children}</main>
      <Footer />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
