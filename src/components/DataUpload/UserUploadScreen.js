

import React from 'react';
import './DataUpload.css';
import Axios from 'axios';
import DataUploadScreen from './DataUploadScreen.js';
import ErrorDataUpload from './ErrorDataUpload.js';
import { Button, Form, FormGroup, Label, Input, FormText,DropdownItem,Dropdown, DropdownToggle,DropdownMenu,Col} from 'reactstrap';

export default class UserUploadScreen extends React.Component {

	constructor(props){		
		super(props);
		this.state = {
				btnDropright: false,
				flats:null,
				usergroups:null,
				isPostSuccess:null,
				form: {
					firstName: '',
					lastName: '',
					email: '',
					password:'',
					phone:'',
					dateOfBirth:'',
					userGroup:'',
					flatId:''
				}

		}
		this.selectFromDrpDown = this.selectFromDrpDown.bind(this);
		this.selectFromOptions = this.selectFromOptions.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.formHandler = this.formHandler.bind(this);
	}
	
	selectFromOptions(e) {	   
	    console.log("Option selected:"+e.target.value);
	    let store = this.state;
	    store.form["userGroup"] = e.target.value;
	    this.setState(store);
	  }
	
	selectFromDrpDown(e) {	
		e.persist();
		console.log("e in select:"+e.target.name);		 
	    let store = this.state;
	    store.form["flatId"] = e.target.innerText;
	    this.setState(store);
	  }

	changeHandler(e) {
		e.persist();
		console.log("e:"+e.target.name+e.target.value);
		let store = this.state;
	    store.form[e.target.name] = e.target.value;
	    this.setState(store);
		
		//this.setState({[e.target.name] : e.target.value},);	    
	}

	formHandler(e) {
		e.preventDefault();
       console.log("formData: "+ JSON.stringify(this.state.form)  );
       Axios.post('http://localhost:8080/users',JSON.stringify(this.state.form),{
    	   headers: { 
				'content-type' : 'application/json',           
       }}).then(response => {
    	   console.log(response.status); 
    	   this.setState({isPostSuccess:response.status});
    	   console.log(response.status);                       
       })
       .catch(error =>{
    	   this.setState({isPostSuccess:"error"});
    	   console.log(error);			       
    	   //Perform action based on error
       })
	}

	componentDidMount(){

		Axios.get('http://localhost:8080/flatnumbers',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("flats:"+res.data);
					this.setState({flats:res.data});
				})
				.catch(err => console.log(err));

		Axios.get('http://localhost:8080/userGroups',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("groups:"+res.data);
					this.setState({usergroups:res.data});
				})
				.catch(err => console.log(err));
	}

	render() {
		
		if(this.state.isPostSuccess !=null){
			if(this.state.isPostSuccess == "error" ){
				return <ErrorDataUpload/>;
			}
			return <DataUploadScreen/>;
		}
		
		let selectedOption = null;
		let flatSelections = "";
		if(this.state.flats !=null){
			flatSelections = this.state.flats.map((item)=> 
			{	
				return <DropdownItem onClick={this.selectFromDrpDown}>{item}</DropdownItem>

			});
		} else{
			flatSelections = <DropdownItem>No flats available</DropdownItem>
		}
		let userGroups ="";		  
		if(this.state.usergroups !=null){
			//userGroups = <option>Select</option>
			userGroups = this.state.usergroups.map((item)=> 
			{				return <option>{item}</option>

			});
		}else{
			userGroups = <option>No usergroups available.</option>
		}

		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} for="UserdataUpload">Upload user details</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="firstname">FirstName</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="firstName"
						id="firstname"
							placeholder="Your first name" onChange={this.changeHandler} />
								</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="lastname">LastName</Label>
				<Col sm={10}>
				<Input
				type="text"
					name="lastName"
						id="lastname"
							placeholder="Your last name" onChange={this.changeHandler}
								/>
								</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="exampleEmail">Email</Label>
				<Col sm={10}>
				<Input
				type="email"
					name="email"
						id="exampleEmail"
							placeholder="with a placeholder" onChange={this.changeHandler}
								/>
								</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="examplePassword">Password</Label>
				<Col sm={10}>
				<Input
				type="password"
					name="password"
						id="examplePassword"
							placeholder="Earlier password" onChange={this.changeHandler}
								/>
								</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="phone">Phone</Label>
				<Col sm={10}>
				<Input
				type="number"
					name="phone"
						id="phone"
							placeholder="Your phone number" onChange={this.changeHandler}
								/>
								</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="dateofbirth">DateOfBirth</Label>
				<Col sm={10}>
				<Input
				type="date"
					name="dateOfBirth"
						id="dateofbirth"
							placeholder="" onChange={this.changeHandler}
								/>	        
								</Col>
				</FormGroup> 

				<FormGroup row>
				<Label sm={2} for="exampleSelect">User Group</Label>
				<Col sm={10}>
				<Input type="select" name="userGroup" id="selectusergroup" ref="groupType" onChange={this.selectFromOptions}>
				{userGroups}	         
				</Input>
				</Col>
				</FormGroup>

				<FormGroup row>
				<Col sm={2}>
				<Dropdown direction="right" name="flatId" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); } } >
				<DropdownToggle caret style={{backgroundColor: '#f18973'}}>
				Choose your flat
				</DropdownToggle>
				<DropdownMenu>
				{flatSelections}
				</DropdownMenu>
				</Dropdown></Col>
				</FormGroup>
				<Button onClick={(e) =>
				this.formHandler(e)} type="submit">Submit</Button>
				</Form>	      
		);
	}
}