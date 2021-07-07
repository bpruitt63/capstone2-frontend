import React from 'react';
import {Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom';
import './static/styles/Home.css';

function Home({username}) {

    return (
        <div className='container'>
            <Jumbotron>
                <h1>Welcome to Boatey!</h1>
                <p>The only place to plan your boat trips!
                    <span><br/>Before you get wet, get Boatey!</span>
                </p>
                {username &&
                    <p>Welcome back, {username}.
                        <span><br/>
                            Are you ready to{' '}
                            <Link to='/planner'>plan a new trip</Link>?
                        </span>
                    </p>    
                }
                {!username && 
                    <p>First time?{'  '}
                        <Link to='/register'>Create a Boatey account</Link>,
                        <span><br/>
                            or <Link to='planner'>start trip planning now!</Link>
                        </span></p>
                }
            </Jumbotron>
        </div>
    );
};

export default Home;