import React from 'react';

import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';


const MainNavigation = props => {
	return (
		<>
			<SideDrawer>
				<nav className="main-navigation__drawer">
					<NavLinks />
				</nav>
			</SideDrawer>
			<MainHeader>
				<button className="main-navigation__menu-btn">
					<span></span>
					<span></span>
					<span></span>
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">YourPlaces</Link>
				</h1>
				<nav>
					<NavLinks />
				</nav>
			</MainHeader>
		</>
	)
};

export default MainNavigation;