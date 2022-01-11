import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Home.scss'

const Home = () => {
    return (
        <div className='home-page-component'>
            <div className='content'>

                <Header />

                <div className='section'>
                    <h1>Book & Movie manager</h1>
                    <p>is an application that allows you to keep track of which episode you have reached on a series or which chapter you have reached on a book.</p>
                </div>

                {/* <div></div> */}

                <Footer />
            </div>
        </div>
    );
};

export default Home;
