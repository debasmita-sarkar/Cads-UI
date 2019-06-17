import React from 'react';
import './DataUpload.css';
import Axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,DropdownItem,Dropdown, DropdownToggle,DropdownMenu,Col} from 'reactstrap';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default class BuildingDataUpload extends React.Component {

	constructor(props){		
		super(props);
		this.state = {
				listOfCities:null,
				country: '', 
				region: '',
				form: {
					name: '',
					city: '',
					country: '',
					province:'',
					pin:'',
					address:'',
					floors:'',
				}

		}
		this.formHandler = this.formHandler.bind(this);
		this.selectCountry = this.selectCountry.bind(this);
		this.selectRegion = this.selectRegion.bind(this);		
		this.changeHandler = this.changeHandler.bind(this);
	  }
	 
	  selectCountry (val) {
		  this.setState({ country: val });
		  console.log("country in selectCountry: "+this.state.country+ ":" + val);		  
	  }
	 
	  selectRegion (val) {
		  this.setState({ region: val });
		  console.log("region in selectRegion: "+this.state.region );		 
	  }
	
	formHandler(e) {
		e.preventDefault();
		let store = this.state;
	    store.form["country"] = this.state.country;
	    store.form["province"] = this.state.region;	    
	    this.setState(store);
	    
	    
       console.log("formData: "+ JSON.stringify(this.state.form)  );
       Axios.post('http://localhost:8080/buildings',JSON.stringify(this.state.form),{
    	   headers: { 
				'content-type' : 'application/json',           
       }}).then(response => {				   
    	   this.props.signedInValue(response.data);
    	   console.log(response.data);                       
       })
       .catch(error =>{

    	   console.log(error);			       
    	   //Perform action based on error
       })
	}
	
	changeHandler(e) {
		e.persist();
		console.log("e:"+e.target.name+e.target.value);
		let store = this.state;
	    store.form[e.target.name] = e.target.value;
	    this.setState(store);
		
		//this.setState({[e.target.name] : e.target.value},);	    
	}
	
	render() {
		const { country, region } = this.state;
		
		return (	    
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>
				<Label  sm={12} for="BuildingdataUpload">Upload Building details</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="name">name</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="name"
						id="name"
							placeholder="Name of the building" onChange={this.changeHandler} />
								</Col>
				</FormGroup>
				
				<FormGroup row>
				<Label sm={2} for="floors">Number of floors</Label>
				<Col sm={10}>
				<Input
				type="number"
					name="floors"
						id="floors"
							placeholder="Number of floors" onChange={this.changeHandler}/>								
								</Col>
				</FormGroup>
								
				<FormGroup row>
				<Label sm={2} for="address">Address</Label>
				<Col sm={10}>
				<Input
				type="text"
					name="address"
						id="address"
							placeholder="Official Address" onChange={this.changeHandler}/>								
								</Col>
				</FormGroup>
				
				<FormGroup row>
				<Label sm={2} for="country">Country</Label>				
				<CountryDropdown
		          value={country}
		          onChange={(val) => this.selectCountry(val)} />
		        
		        </FormGroup>
		        
		        <FormGroup row>
		        <Label sm={2} for="state">State/Province</Label>		        
		        <RegionDropdown
		          country={country}
		          value={region}
		          onChange={(val) => this.selectRegion(val)} />
		        
		        </FormGroup >
		        
		        <FormGroup row>
				<Label sm={2} for="city">city</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="city"
						id="city"
							placeholder="name of your city" onChange={this.changeHandler} />
								</Col>
				</FormGroup> 
		        <FormGroup row>
				<Label sm={2} for="pin">pin/zip code</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="pin"
						id="pin"
							placeholder="Zip code or pin" onChange={this.changeHandler} />
								</Col>
				</FormGroup>
				
				<Button onClick={(e) =>
				this.formHandler(e)} type="submit">Submit</Button>
				</Form>	      
		);
	}
}