import React from 'react';
import Axios from 'axios';
import Home from '../Home/Home.js';
import ErrorRaiseTicket from './ErrorRaiseTicket.js';
import { Button, Form, FormGroup, Label, Input, FormText,DropdownItem,Dropdown, DropdownToggle,DropdownMenu,Col} from 'reactstrap';

export default class RaiseHomeServiceTicket extends React.Component {

	constructor(props){		
		super(props);
		this.state = {			
				tickettypes:'House_Work',
				workertypes:null,
				ticketstates:null,
				isPostSuccess:null,
				form: {
					description: '',
					ticketType:'',
					workerType: '',
					state:'',
					submitterid:'',
					ownerid:'',
					note:'',
					dueDate:'',
					isRecurring:false,
					isBlocked:false

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
		const map = new Map([[1, "workertypes"], [2, "ticketstates"]]);
		map.forEach((value, key, thisMap) => {
			console.log(key +"=>"+ value)		    
			Axios.get('http://localhost:8080/'+value,
					{
				headers: { 
					'content-type' : 'application/json',
				},	    
					}).then(res => {
						console.log(value+":"+res.data);
						this.setState({[value]:res.data});
						console.log("after applying"+ this.setState.tickettypes);
					})
					.catch(err => console.log(err));
		}
		)		
	}
	render() {		
		if(this.state.isPostSuccess !=null){
			if(this.state.isPostSuccess == "error" ){
				return <ErrorRaiseTicket/>;
			}
			return <Home/>;
		}

		let workerType ="";		  
		if(this.state.workertypes !=null){			
			workerType = this.state.workertypes.map((item)=> 
			{				return <option>{item}</option>

			});
		}else{
			workerType = <option>No Ticket Type available.</option>
		}

		let ticketState ="";		  
		if(this.state.ticketstates !=null){			
			ticketState = this.state.ticketstates.map((item)=> 
			{				return <option>{item}</option>

			});
		}else{
			ticketState = <option>Different states of a ticket is missing.Please check the network connectivity.</option>
		}

		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} for="RaiseTicket">Raise Ticket</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="description">Details</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="description"
						id="description"
							placeholder="Explain your problem here." onChange={this.changeHandler} />
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="workerType">Type of Workers</Label>
				<Col sm={10}>
				<Input type="select" name="workerType" id="workerType" ref="workerType" onChange={this.selectFromOptions}>
				{workerType}	         
				</Input>
				</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="state">State of the ticket</Label>
				<Col sm={10}>
				<Input type="select" name="state" id="state" ref="state" onChange={this.selectFromOptions}>
				{ticketState}	         
				</Input>
				</Col>
				</FormGroup>

				<Button onClick={(e) =>
				this.formHandler(e)} type="submit">Submit</Button>
				</Form>	      
		)		
	}
}