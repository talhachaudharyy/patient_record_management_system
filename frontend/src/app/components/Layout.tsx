import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
<> 
<Navbar />
      <div>
        {children}
      </div>
      <Footer />
      </>    
      );
};

export default Layout;