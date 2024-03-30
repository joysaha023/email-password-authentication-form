import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Navbar'

const Root = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;