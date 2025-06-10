import React from 'react';
import Navbar from '../components/navbar';

function Layout(props) {
  return (
    <div className='bg-background min-h-screen'>
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;
