import React from 'react';
import './DataUpload.css';
import Axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,Col} from 'reactstrap';

export default class VParkingUpload extends React.Component {

	constructor(props){		
		super(props);
		this.state = {			
				slots: [],
				allSlotsAsInput:''			
		}
		this.formHandler = this.formHandler.bind(this);		
		this.changeHandler = this.changeHandler.bind(this);
	  }
	
	formHandler(e) {
		e.preventDefault();	
		const fields =this.state.allSlotsAsInput.split(',');		
		fields.map((slot)=>{
			this.state.slots.push({slot});})
			
	   console.log("this.state.slots"+ this.state.slots);	
       console.log("formData: "+ JSON.stringify(this.state.slots)  );
       Axios.post('http://localhost:8080//parkingSlots/multi',JSON.stringify(this.state.slots),{
    	   headers: { 
				'content-type' : 'application/json',           
       }}).then(response => {
    	   console.log(response.data);                       
       })
       .catch(error =>{
    	   console.log(error);
       })
	}
	
	changeHandler(e) {
		e.persist();
		this.setState({allSlotsAsInput: e.target.value});
	}
	
	render() {
		const { country, region } = this.state;
		
		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} for="VParkingSlotDataUpload">Upload visitor parking slots</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="slots">slots</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="slots"
						id="slots"
							placeholder="All the parking slots seperated by comma (,) " onChange={this.changeHandler} />
								</Col>
				</FormGroup>
				
				<Button onClick={(e) =>
				this.formHandler(e)} type="submit">Submit</Button>
				</Form>	      
		);
	}
}