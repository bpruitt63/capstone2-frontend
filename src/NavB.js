import React from 'react';
import './static/styles/NavB.css';
import { NavLink as NotNavLink } from 'react-router-dom';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';


function NavB({username, isMobile}) {
     
    return (
        <div>
            <Navbar color='dark'>
                <div className='container'>
                    <NavbarBrand href='/' className='inactive'>
                        Boatey
                    </NavbarBrand>
                    {!isMobile &&
                        <Nav>
                            <NavItem>
                                <NavLink to='/forecast' 
                                        className='inactive' 
                                        activeClassName='active' 
                                        tag={NotNavLink} >
                                    Weather Forecast
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='/planner' 
                                        className='inactive' 
                                        activeClassName='active' 
                                        tag={NotNavLink} >
                                    Trip Planner
                                </NavLink>
                            </NavItem>
                                {!username && 
                                    <>
                                        <NavItem>
                                            <NavLink to='/register'
                                                    className='inactive' 
                                                    activeClassName='active' 
                                                    tag={NotNavLink} >
                                                Register
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to='/login'
                                                    className='inactive' 
                                                    activeClassName='active' 
                                                    tag={NotNavLink} >
                                                Log In
                                            </NavLink>
                                        </NavItem>
                                    </>
                                }
                                {username &&
                                    <>
                                        <NavItem>
                                            <NavLink to='/profile'
                                                    className='inactive' 
                                                    activeClassName='active' 
                                                    tag={NotNavLink} >
                                                {username}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to='/logout'
                                                    className='inactive' 
                                                    activeClassName='active' 
                                                    tag={NotNavLink} >
                                                Log Out
                                            </NavLink>
                                        </NavItem>
                                    </>
                                }
                            </Nav>
                        }
                        {isMobile &&
                            <Nav>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className='inactive'>Options</DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavItem>
                                                <NavLink href='/forecast'>Weather Forecast</NavLink>
                                            </NavItem>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavItem>
                                                <NavLink href='/planner'>Trip Planner</NavLink>
                                            </NavItem>
                                        </DropdownItem>
                                        {!username && 
                                            <>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink href='/register'>Register</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink href='/login'>Log In</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </>
                                        }
                                        {username &&
                                            <>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink href='/profile'>{username}</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink href='/logout'>Log Out</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </>
                                        }
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        }
                </div>
            </Navbar>
        </div>
    );
};

export default NavB;