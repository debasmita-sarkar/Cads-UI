import React from 'react';
import './DataUpload.css';
import Axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,DropdownItem,Dropdown, DropdownToggle,DropdownMenu,Col} from 'reactstrap';

export default class FlatDataUpload extends React.Component {

	constructor(props){		
		super(props);
		this.state = {
				buildingdropright: false,
				floorDropright: false,
				floors:0,
				buildings:null,				
				form: {
					floor: '',
					buildingID: '',
					number: '',
					noOfBedRooms:'',
					parkingSlots:'',
					area:''
				}

		}
		this.getAllFloors = this.getAllFloors.bind(this);
		this.selectFromDrpDownForFloor=this.selectFromDrpDownForFloor.bind(this);
		this.selectFromDrpDown = this.selectFromDrpDown.bind(this);		
		this.changeHandler = this.changeHandler.bind(this);
		this.formHandler = this.formHandler.bind(this);
	}
	selectFromDrpDown(e) {	
		e.persist();
		console.log("e in select building:"+e.target.value+":floors:"+ e.target.name);		 
	    let store = this.state;
	    store.form["buildingID"] = e.target.value;
	    this.setState(store);
	    this.setState({floors:e.target.name});
	    
	  }
	
	selectFromDrpDownForFloor(e) {	
		e.persist();
		console.log("e in select floor:"+e.target.innerText);		 
	    let store = this.state;
	    store.form["floor"] = e.target.innerText;
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
       Axios.post('http://localhost:8080/flats',JSON.stringify(this.state.form),{
    	   headers: { 
				'content-type' : 'application/json',           
    	   }}).then(response => {				   
    		   console.log(response.data);                       
    	   })
       .catch(error =>{

    	   console.log(error);			       
    	   //Perform action based on error
       })
	}

	componentDidMount(){
		console.log("componentDidMount");
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
	
	getAllFloors(){
		//this.setState({floors:5})
		console.log("in get all floors"+ this.state.floors);
		let floorlist= [];
		for (let i= 0 ; i < this.state.floors; i++) 
			{
			console.log("in loop"+ {i});
			floorlist.push( <DropdownItem name = "floor" onClick={this.selectFromDrpDownForFloor}>{i}</DropdownItem>);
			}
		return floorlist
	}

	render() {
		console.log("in get all floors"+ this.state.floors);
		let floorlist= [];
		if(this.state.floors > 0)
		{
			for (let i= 0 ; i < this.state.floors; i++) 
			{
				console.log("in loop"+ {i});
				floorlist.push( <DropdownItem onClick={this.selectFromDrpDownForFloor}>{i}</DropdownItem>);
			}		
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
				<Label  sm={12} for="FlatdataUpload">Upload Flat details</Label>	         
				</FormGroup>
				<FormGroup row>
				<Label sm={2} for="flatnumber">Flat number</Label>
				<Col sm={10}>
				<Input 	            
				type="text"
					name="number"
						id="number"
							placeholder="The flat number" onChange={this.changeHandler} />
								</Col>
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="area">Area</Label>
				<Col sm={10}>
				<Input
				type="text"
					name="area"
						id="area"
							placeholder="Carpet area ofthe flat in sqft." onChange={this.changeHandler}
								/>
								</Col>
				
				
				</FormGroup>

				<FormGroup row>
				<Label sm={2} for="noofbedrooms">Number of bedrooms</Label>
				<Col sm={10}>
				<Input
				type="number"
					name="noOfBedRooms"
						id="noOfBedRooms"
							placeholder="number of bedrooms" onChange={this.changeHandler}/>								
								</Col>
				</FormGroup>				
				<FormGroup row>
				<Label sm={2} for="noofparkings">Number of parking slots</Label>
				<Col sm={10}>
				<Input
				type="number"
					name="parkingSlots"
						id="parkingSlots"
							placeholder="number of parking slots" onChange={this.changeHandler}/>								
								</Col>
				</FormGroup>				
				<FormGroup row>
				<Col sm={2}>
				<Dropdown direction="right" name="buildingID" isOpen={this.state.buildingdropright} toggle={() => { this.setState({ buildingdropright: !this.state.buildingdropright }); } } >
				<DropdownToggle caret style={{backgroundColor: '#f18973'}}>				
				Choose your building
				</DropdownToggle>
				<DropdownMenu>
				{buildingselections}
				</DropdownMenu>
				</Dropdown></Col>
								
				<Col sm={7}></Col>
				
				<Col sm={2}>
				<Dropdown direction="right" name="floor" isOpen={this.state.floorDropright} toggle={() => { this.setState({ floorDropright: !this.state.floorDropright }); } } >
				<DropdownToggle caret style={{backgroundColor: '#f18973'}}>
				Choose your floor
				</DropdownToggle>
				<DropdownMenu>
				{floorlist}
				</DropdownMenu>
				</Dropdown></Col>
				</FormGroup>
			
				<Button onClick={(e) =>
				this.formHandler(e)} type="submit">Submit</Button>
				</Form>	      
		);
	}
}