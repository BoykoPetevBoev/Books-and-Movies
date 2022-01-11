import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

const Header = () => {
    return (
        <header className='header'>
            <div className='section'>
                <div>
                    <Link to="/">
                        <h2>B&M</h2>
                    </Link>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/movies">Movies</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;