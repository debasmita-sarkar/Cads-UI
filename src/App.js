import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Axios from 'axios';
import TopNav from './components/TopNav';
import Home from './components/Home';
import Footer from './components/Footer';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class App extends Component {

	constructor(props){
		super(props);   
		this.state = {signedIn:false}
		this.handleLoginVal = this.handleLoginVal.bind(this)		
	}
	handleLoginVal(data) {
		console.log("signed value in app:"+data);
		if(typeof data != 'undefined'){
			this.setState({
				isSignedIn: data
			})
		}
		console.log("signed value in app isSignedIn:"+this.state.isSignedIn);
	}
	
	render() {
		console.log("render called at App:"+ this.props.isLoggedIn)
		return ( 
				<Router>
				<div className="App">
				<TopNav let signedInValue={this.handleLoginVal}/>				
				<Home/>
				<Footer />
				</div>
				</Router>
		);

	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		isLoggedIn: state.isSignedIn,
		user:state.user
	} 
}
export default connect(mapStateToProps) (App);