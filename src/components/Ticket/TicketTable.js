import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {Form,FormGroup, Label,Col} from 'reactstrap';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';


export default class TicketTable extends React.Component {
	
	constructor(props){		
		super(props);
		this.state = {
				products : [],				
				selectRowProp : {
						mode: 'checkbox',
						clickToSelect: true,  // enable click to select
				}
		}
		this.addProducts = this.addProducts.bind(this);
		this.deleteRows = this.deleteRows.bind(this);		
	}
	
	componentDidMount(){
		console.log("In componentDidMount");
		Axios.get('http://localhost:8080/tickets',
				{
			headers: { 
				'content-type' : 'application/json',
			},	    
				}).then(res => {
					console.log("tickets:"+res.data.length+":"+res.data[0].description);
					//this.setState({products:res.data});
					this.addProducts(res);					
				})
				.catch(err => console.log(err));
	}
	
	addProducts(response) {
		console.log("In addProducts:"+response.length);	
		const responseLength = response.data.length;
		for (let i = 0; i < responseLength; i++) {
		    this.state.products.push({
		      id: response.data[i].id,
		      description: response.data[i].description,
		      state: response.data[i].state,
		      ticketType:response.data[i].ticketType,
		      userId:response.data[i].userId,
		      workerId:response.data[i].workerId
		      
		    });
		  }
		}
	
	deleteRows(){
		console.log("In deleteRows:");
	}
	render() {
		const selectRow = {
			      mode: 'checkbox',
			      clickToSelect: true,
			      selected: this.state.selected,
			      onSelect: this.handleOnSelect,
			      onSelectAll: this.handleOnSelectAll
			    };
		
		const columns = [{
			  dataField: 'id',
			  text: 'Product ID'
			}, {
			  dataField: 'description',
			  text: 'Ticket Description'
			}, {
			  dataField: 'state',
			  text: 'Current state'
			}, {
				  dataField: 'ticketType',
				  text: 'Ticket raised for'
				},
				{
					  dataField: 'userId',
					  text: 'Submitted By'
				},
				{
					  dataField: 'workerId',
					  text: 'Owned By'
				}
			];
		return(

				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>				
				<Col sm={1}>
				<button onClick={ this.deleteRows }>
				<FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteRows}/>
				</button>							
				</Col>
				</FormGroup>
				<BootstrapTable tableStyle={ { border: 'black 2.5px solid' }}		        
				headerStyle={ { border: 'black 1px solid' } }
				bodyStyle={ { border: 'black 1px solid' } } keyField="id" data={this.state.products} columns={ columns } selectRow={ selectRow } />
								
				</Form>)
	}
}
//export default TicketTable;