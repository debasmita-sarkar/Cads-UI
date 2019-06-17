import React from 'react';
import './DataUpload.css';
import Axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,DropdownItem,Dropdown, DropdownToggle,DropdownMenu,Col} from 'reactstrap';

export default class ErrorDataUpload extends React.Component {

	constructor(props){		
		super(props);
	}
	
	render() {

		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} >Oops !! data upload failed.</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label  sm={12} >Please check the internet connection and then try again.</Label>
				</FormGroup>
				</Form>	      
		);
	}
}

