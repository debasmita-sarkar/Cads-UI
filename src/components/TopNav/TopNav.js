/**
 * 
 */
import React from 'react';
import Login from '../Login';
import './TopNav.css';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import Home from '../Home/Home.js';
import { Link } from 'react-router-dom';
import { Route, Switch,NavLink as RRNavLink } from 'react-router-dom';
import Signup from '../Login/SignUp.js';

class TopNav extends React.Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isSignedIn: false,
			showCarousel: true,
			disableLoginLink :false,
		    disableSignUpLink :false
		}
		this.handleLoginData = this.handleLoginData.bind(this)
		this.gotologin = this.gotologin.bind(this)
		this.gotoSignUp = this.gotoSignUp.bind(this)
		this.setShowcarousel = this.setShowcarousel.bind(this)		
		this.gotoLogout = this.gotoLogout.bind(this)
		this.onLoginClick = this.onLoginClick.bind(this)		
	}

	handleLoginData(data) {
		console.log("signed value in topnav:" + data);
		if (typeof data != 'undefined') {
			this.setState({
				isSignedIn: data
			})
		}
		this.props.signedInValue(this.state.isSignedIn);
	}

	setShowcarousel() {
		console.log("setShowcarousel");
		this.setState({
			showCarousel: false
		})
	}
	
	onLoginClick(){
		console.log("onLoginClick");
		this.setState({
			disableLoginLink: true
		})		
	}
	gotologin() {
		
		return (<Login let signedInValue={this.handleLoginData} />)
	}

	gotoSignUp() {		
		this.state.disableSignUpLink = true
		this.state.disableLoginLink = false
		console.log("this.state.disableSignUpLink"+this.state.disableSignUpLink);
		return (<Signup />)
	}
	gotoLogout() {		
		this.state.isSignedIn=false
		console.log("isSignedIn value in logout:"+this.state.isSignedIn);
		return (<Home />)
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	render() {
        console.log("in render:"+this.state.disableLoginLink);
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">CADS</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar >

							<Collapse isOpen={!this.state.isSignedIn} >
								<NavItem>
									<NavLink href="/Login" >Login</NavLink>
								</NavItem>
							</Collapse>

							<Collapse isOpen={this.state.isSignedIn} >
								<NavItem>
								 <NavLink href="/Logout" activeclassname={"active"}  >Log Out </NavLink>
								</NavItem>
							</Collapse>

							<Collapse isOpen={!this.state.isSignedIn} >
								<NavItem>
									<NavLink href="/SignUp" disabled={this.state.disableSignUpLink} >SignUP</NavLink>
								</NavItem>
							</Collapse>

							<NavItem>
								<NavLink href="/AboutUs">Contact Us</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/Operations">What we do</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route
						exact path="/Login"
						component={this.gotologin}

					/>
					<Route
						exact path="/SignUp" 
						component={this.gotoSignUp}

					/>
					<Route
						exact path="/Logout"
						component={this.gotoLogout}

					/>					
				</Switch>

			</div>

		);
	}

}
export default TopNav;