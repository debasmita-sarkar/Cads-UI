import React from 'react';
import './Login.css';
import {
	Container, Col, Form,
	FormGroup, Label, Input,
	Button, FormText, FormFeedback, Collapse
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUserAction } from '../../store/actions';
import { setCookie } from '../utils/cookies';

import SiteCarousel from '../SiteCarousel';
import ContainerScreen from '../Container/ContainerScreen.js';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'email': '',
			'password': '',
			loggedinUser:null,
			isSignedIn: null,
			validate: {
				emailState: '',
			},
		}
		this.handleChange = this.handleChange.bind(this);
		this.formHandler = this.formHandler.bind(this);
	}

	validateEmail(e) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const { validate } = this.state
		if (emailRex.test(e.target.value)) {
			validate.emailState = 'has-success'
		} else {
			validate.emailState = 'has-danger'
		}
		this.setState({ validate })
	}

	handleChange = async (event) => {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		await this.setState({
			[name]: value,
		});
		console.log("email in handlechange:" + this.state.email);
		console.log("pswd in handlechange:" + this.state.password);
	}

	formHandler(e) {
		e.preventDefault();

		console.log("email" + this.state.email);
		console.log("pswd" + this.state.password);
		const data = {
			userName: this.state.email,
			password: this.state.password
		};

		//this.props.dispatch(loginUserAction(this.state.email,this.state.password));

		axios.get('http://localhost:8080/auth', {
			headers: {
				'content-type': 'application/json',
			}, params: {
				userName: this.state.email,
				password: this.state.password
			}
		}).then(response => {			
			if(response == null || response.data == null ){
				this.props.signedInValue(false);
			    this.setState({
				   isSignedIn: false
			    })
		    }
			else{
			   this.props.signedInValue(true);
			   this.setState({				
				loggedinUser: response.data
			   })
			   this.setState({
				isSignedIn: true				
			   })			  
			   console.log("inside login: response:"+ response.data.flatId);
			   console.log("inside login: user:"+ this.state.loggedinUser.flatId);
		    }
		
		})
			.catch(error => {
				this.setState({
					isSignedIn: false
				})
				console.log(error);
				//Perform action based on error
			})
	}

	render() {

		const { email, password } = this.state;
		if (this.state.isSignedIn === true) {
			console.log("signed in value true in login"+this.state.loggedinUser.flatId);
			return (
				<div>
					<ContainerScreen loggeduser={this.state.loggedinUser}/>
				</div>);
		} else if (this.state.isSignedIn == false) {
			console.log("in signed in value false in login");
			return (
				<div>
					<SiteCarousel />
				</div>);
		} else if (this.state.isSignedIn == null) {
			console.log("in signed in value null in login");
			return (
				<Container className="App1">
					<h2>Log In</h2>
					<Form className="form" >
						<Col >
							<FormGroup>
								<Label>Username</Label>
								<Input
									type="email"
									name="email"
									id="exampleEmail"
									placeholder="myemail@email.com"
									value={email}
									valid={this.state.validate.emailState === 'has-success'}
									invalid={this.state.validate.emailState === 'has-danger'}
									onChange={(e) => {
										this.validateEmail(e)
										this.handleChange(e)
									}}
								/>
								<FormFeedback valid>
									That's a tasty looking email you've got there.
	              </FormFeedback>
								<FormFeedback>
									Uh oh! Looks like there is an issue with your email. Please input a correct email.
	              </FormFeedback>
								<FormText>Your username is most likely your email.</FormText>
							</FormGroup>
						</Col>
						<Col >
							<FormGroup>
								<Label for="examplePassword">Password</Label>
								<Input
									type="password"
									name="password"
									id="examplePassword"
									placeholder="********"
									value={password}
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Button onClick={(e) =>
							this.formHandler(e)} type="submit">Submit</Button>
					</Form>
				</Container>)
		}
	}
}

const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(Login);
