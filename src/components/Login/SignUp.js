

import React from 'react';
import './Login.css';
import Axios from 'axios';
import Login from './Login.js';
import ErrorSignUp from './ErrorSignUp.js';
import { Button, Form, FormGroup, Label, Input, FormText,DropdownItem,Dropdown, DropdownToggle,DropdownMenu,Col} from 'reactstrap';
import {Tooltip } from 'reactstrap';
export default class SignUp extends React.Component {

	constructor(props){		
		super(props);
		this.state = {
				btnDropright: false,
				flats:null,
				usergroups:null,
				isPostSuccess:null,
				tooltipOpen: false,
				buildings:null,
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
		this.toggle = this.toggle.bind(this);
	}	
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
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
    	   this.setState({isPostSuccess:"no"});
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

		Axios.get('http://localhost:8080/buildings',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("buildings:"+res+":"+res.name+":"+res.floors);
					this.setState({buildings:res.data});					
				})
				.catch(err => console.log(err));	

	}

	render() {
		
		if(this.state.isPostSuccess !=null){
			if(this.state.isPostSuccess == "error" ){
				return <ErrorSignUp/>;
			}
			return <Login/>;
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

		let buildingselections = "";
		if(this.state.buildings !=null){
			buildingselections = this.state.buildings.map((item)=> 
			{	
				return <DropdownItem name = {item.floors} value = {item.id} onClick={this.selectFromDrpDown}>{item.name}</DropdownItem>

			});
		} else{
			buildingselections = <DropdownItem>Oops !!! Building details not yet uploaded.</DropdownItem>
		}

		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} for="UserdataUpload">Sign Up</Label>	         
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
				<Label sm={2} for="usergroup">User Group</Label>
				<Col sm={10}>
				<Input type="select" name="userGroup" id="selectusergroup" ref="groupType" onChange={this.selectFromOptions}>
				{userGroups}	         
				</Input>
				</Col>
				</FormGroup>

				<FormGroup row>
				<Col sm={2}>
				<Dropdown direction="right" name="buildingID" isOpen={this.state.buildingdropright} toggle={() => { this.setState({ buildingdropright: !this.state.buildingdropright }); } } >
				<DropdownToggle caret style={{backgroundColor: '#f18973'}}>				
				<span>
        		<Button id={'Tooltip-Flat'} style={{backgroundColor: '#f18973'}}>
          			Choose your building
        		</Button>
        		<Tooltip placement="top" style={{backgroundColor: '#f18973'}} isOpen={this.state.tooltipOpen} target={'Tooltip-Flat'} toggle={this.toggle}>
          				Tooltip Content!
        		</Tooltip>
      			</span>
				</DropdownToggle>
				<DropdownMenu>
				{buildingselections}
				</DropdownMenu>
				</Dropdown></Col>
								
				<Col sm={7}></Col>
				
				<Col sm={2}>
				<Dropdown direction="right" name="flatId" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); } } >
				<DropdownToggle caret style={{backgroundColor: '#f18973'}}>
				<span>
        		<Button id={'Tooltip-Flat'} style={{backgroundColor: '#f18973'}}>
          			Choose your flat
        		</Button>
        		<Tooltip placement="top" style={{backgroundColor: '#f18973'}} isOpen={this.state.tooltipOpen} target={'Tooltip-Flat'} toggle={this.toggle}>
          				Tooltip Content!
        		</Tooltip>
      			</span>
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