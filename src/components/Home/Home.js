import React from 'react';
import './Home.css';
import SiteCarousel from '../SiteCarousel';
import { connect } from 'react-redux';

class Home extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return (
				<div>				
				<SiteCarousel/>
				</div> );
	
		
	}
}	
	const mapStateToProps = (state, ownProps) => {
		  return {
			  isSignedIn: state.isSignedIn,
			  user:state.user
		  }
		}

export default connect(mapStateToProps)(Home);
