import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Home.scss'

const Home = () => {
    return (
        <div className='home-page-component'>
            <div className='content'>

                <Header />

                <div className='section'>
                    <div className='heading-holder'>
                        <h1>Book & Movie manager</h1>
                        <p>This is an application that allows you to keep track of which episode you have reached on a series or which chapter you have reached on a book.</p>

                        <div className='button-holder'>
                            <Link className='books-link' to="/books">Go to Book page</Link>
                            <Link className='movies-link' to="/movies">Go to Movies page</Link>
                        </div>
                    </div>
                </div>

                {/* <div></div> */}

                <Footer />
            </div>
        </div>
    );
};

export default Home;
