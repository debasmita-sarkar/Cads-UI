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
import { Route, Switch } from 'react-router-dom';

class TopNav extends React.Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isSignedIn: false,
			showCarousel: true
		}
		this.handleLoginData = this.handleLoginData.bind(this)
		this.gotologin = this.gotologin.bind(this)
		this.setShowcarousel = this.setShowcarousel.bind(this)
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

	gotologin() {
		return (<Login let signedInValue={this.handleLoginData} />)
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

		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">CADS</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar >

							<Collapse isOpen={!this.state.isSignedIn} >
								<NavItem>
									<NavLink href="/Login" activeclassname={"active"} >Login</NavLink>
								</NavItem>
							</Collapse>

							<Collapse isOpen={this.state.isSignedIn} >
								<NavItem>
									<NavLink disabled  >LoggedIn</NavLink>
								</NavItem>
							</Collapse>

							<Collapse isOpen={!this.state.isSignedIn} >
								<NavItem>
									<NavLink href="/SignIn" >Sign UP</NavLink>
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
				</Switch>

			</div>

		);
	}

}
export default TopNav;