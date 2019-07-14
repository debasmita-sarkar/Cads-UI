import React from 'react';
import Axios from 'axios';
import Home from '../Home/Home.js';
import ErrorAddingVisitor from './ErrorAddingVisitor.js';
import { Button, Form, FormGroup, Label, Input, DropdownItem,Col} from 'reactstrap';

export default class AddVisitor extends React.Component {

	constructor(props){		
		super(props);
		this.state = {			
				parkingslots:[],
				buildings:null,
				flats:null,			
				isPostSuccess:null,
				form: {
					name: '',
					phone:'',
					flatId: '',
					purpose:'',
					buildingId:'',
					timeIn:new Date(),
					timeOut:new Date(),
					parking:'',
					flatNumber:'',
					buildingName:''
				}
		}		
		this.selectFromOptions = this.selectFromOptions.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.formHandler = this.formHandler.bind(this);
	}

	selectFromOptions(e) {	   
		console.log("Option selected:"+e.target.value+ "id:"+e.target.name);
		let store = this.state;
		store.form[e.target.name] = e.target.value;
		this.setState(store);
	}
	changeHandler(e) {
		e.persist();
		console.log("e:"+e.target.name+e.target.value);
		let store = this.state;
		store.form[e.target.name] = e.target.value;
		this.setState(store);		  
	}

	formHandler(e) {
		e.preventDefault();
		console.log("formData: "+ JSON.stringify(this.state.form)  );
		Axios.post('http://localhost:8080/visitors',JSON.stringify(this.state.form),{
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
		Axios.get('http://localhost:8080/flats',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("flats:"+res.data);
					this.setState({flats:res.data});
				})
				.catch(err => console.log(err));

		Axios.get('http://localhost:8080/parkingSlots/available',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("parking:"+res.data);
					this.setState({parking:res.data});
				})
				.catch(err => console.log(err));

		Axios.get('http://localhost:8080/buildings',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("buildings:"+res+":"+res.name);
					this.setState({buildings:res.data});					
				})
				.catch(err => console.log(err));		
	}
	render() {		
		if(this.state.isPostSuccess !=null){
			if(this.state.isPostSuccess == "error" ){
				return <ErrorAddingVisitor/>;
			}
			return <Home/>;
		}

		let buildingselections = "";
		if(this.state.buildings !=null){
			buildingselections = this.state.buildings.map((item)=> 
			{	
				return <option name = "buildingid" value = {item.id} onClick={this.selectFromOptions}>{item.name}</option>

			});
		} else{
			buildingselections = <option>Oops !!! Building details not yet uploaded.</option>
		}
		
		let flatSelections = "";
		if(this.state.flats !=null){
			flatSelections = this.state.flats.map((item)=> 
			{	
				return <option name = "flatId" value = {item.id} onClick={this.selectFromOptions}>{item.number}</option>

			});
		} else{
			flatSelections = <option>No flats available</option>
		}

		let parkingslotslist = "";
		if(this.state.parkingslots !=null){
			parkingslotslist = this.state.parkingslots.map((item)=> 
			{	
				return <option name = "parking" value = {item.id} onClick={this.selectFromOptions}>{item.slot}</option>

			});
		} else{
			parkingslotslist = <option>Oops !!! No parking slots available.</option>
		}

		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} for="AddVisitor">Add a visitor</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="name">Name</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="name"
						id="name"
							placeholder="name of the visitor" onChange={this.changeHandler} />
				</Col>
				</FormGroup>
                <FormGroup row>
				<Label sm={2} for="phone">Phone number</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="phone"
						id="phone"
							placeholder="phone number of the visitor" onChange={this.changeHandler} />
				</Col>
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="purpose">Purpose</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="purpose"
						id="purpose"
							placeholder="Purpose of visit" onChange={this.changeHandler} />
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="timeIn">Time in</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="timeIn"
						id="timeIn"
							placeholder="Time when visitor entered" onChange={this.changeHandler} />    
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="timeOut">Time out</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="timeOut"
						id="timeOut"
							placeholder="Time when visitor left" onChange={this.changeHandler} />
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="buildingName">Name of the building</Label>
				<Col sm={10}>
				<Input type="select" name="buildingName" id="buildingName" ref="buildingName" onChange={this.selectFromOptions}>
				<option>Select the building</option>
				{buildingselections}	         
				</Input>
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="flatNumber">Flat number</Label>
				<Col sm={10}>
				<Input type="select" name="flatId" id="flatId" ref="flatNumber" onChange={this.selectFromOptions}>
				<option>Select the flat</option>
				{flatSelections}	         
				</Input>
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="parking">Parking slot</Label>
				<Col sm={10}>
				<Input type="select" name="parking" id="parking" ref="parking" onChange={this.selectFromOptions}>
				<option>Select the parking slot</option>
				{parkingslotslist}	         
				</Input>
				</Col>
				</FormGroup>	

				<Button onClick={(e) =>
				this.formHandler(e)} type="submit">Submit</Button>
				</Form>	      
		)		
	}
}