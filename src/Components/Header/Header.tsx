import React from 'react';
import {Link} from 'react-router-dom';
import './Header.styles.css';

import LogoPrototype from '../../Assets/piano_icon.png'

export default function Header() {
    return (
        <div className='Header'>
            <div className='HeaderData'>
                <div className='Logo'>
                    <img src={LogoPrototype} alt='Logo' className='LogoImage' />
                    <h1>Piano Blocks V.0.1 Beta</h1>
                </div>
                <div className='Links'>
                    <Link to='/' className='Link'>Home</Link>
                    <Link to='/tutorial' className='Link'>Tutorial</Link>
                    <Link to='/Todo' className='Link'>Code-clopedia</Link>
                    <Link to='/Todo' className='Link'>About-Author</Link>
                </div>
            </div>
        </div>
    )
}
