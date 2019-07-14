import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {Form,FormGroup, Label,Col} from 'reactstrap';
import { BrowserRouter as Router,Link,Redirect,Route, Switch,withRouter } from 'react-router-dom';
import Axios from 'axios';
import EditVisitor from './EditVisitor.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt,faEdit} from '@fortawesome/free-solid-svg-icons';


class VisitorTable extends React.Component {
	
	constructor(props){		
		super(props);
		this.state = {		
				ticketid:'',
				products : [],				
				selectRowProp : {
						mode: 'checkbox',
						clickToSelect: true,  // enable click to select
				}
		}
		this.addProducts = this.addProducts.bind(this);
		this.deleteRows = this.deleteRows.bind(this);
		this.editRow = this.editRow.bind(this);
		this.colFormatter =	this.colFormatter.bind(this);
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
	
	editRow(ticketidval){		
		this.state.ticketid=ticketidval;
		console.log("In editRow after setting val:"+this.state.ticketid);		
		//this.props.history.push('/EditOneTicket');
		//return <EditFinanceTicket/>		
		}
	
	addProducts(response) {
		console.log("In addProducts:"+response.length);	
		const responseLength = response.data.length;
		for (let i = 0; i < responseLength; i++) {
		    this.state.products.push({
		      id: response.data[i].name,
		      description: response.data[i].phone,
		      state: response.data[i].flatNumber,
		      ticketType:response.data[i].buildingName,
		      userId:response.data[i].purpose,
			  workerId:response.data[i].timeIn,
			  workerId:response.data[i].timeOut,
			  workerId:response.data[i].parking,
		      
		    });
		  }
		}
	
	deleteRows(selectedRow){
		console.log("In deleteRows:"+selectedRow);
	}
	colFormatter (e) {
		//e.preventDefault();
		console.log("In colFormatter:");
		return (
			<div>
		  <Link to='/EditVisitor'>
			{this.state.cell}
		  </Link>
		  
		</div>
		)
	  }
	
	render() {		
		const selectRow = {
			      mode: 'checkbox',
			      clickToSelect: true,
			      selected: this.state.selected,
			      onSelect: this.handleOnSelect,
			      onSelectAll: this.handleOnSelectAll
				};
				
				const options = {
					onRowClick: function(row, columnIndex, rowIndex, e) {
					  alert(`You click row id: ${row.id}, column index: ${columnIndex}, row index: ${rowIndex}`);
					  console.log(e);
					},
					onRowDoubleClick: function(row, e) {
					  alert(`You double click row id: ${row.id}`);
					  console.log(e);
					}
				  };
		
		const columns = [{
			  dataField: 'name',
			  text: 'Name'
			}, {
			  dataField: 'phone',
			  text: 'Phone number'
			}, {
			  dataField: 'flatno',
			  text: 'Flat number'
			}, {
				  dataField: 'buildingname',
				  text: 'Building Name'
				},
				{
					  dataField: 'purpose',
					  text: 'Purpose'
				},
				{
					  dataField: 'timeIn',
					  text: 'Time in'
				},
				{
					dataField: 'timeOut',
					text: 'Time Out'
			  },
			  {
				dataField: 'parking',
				text: 'Parking slot allocated'
		  },
				{ dataField: "edit", 
			        text: "Edit",
			        sort: false,
			        formatter: (cell, row, rowIndex, formatExtraData) => {
			        	console.log("In colFormatter row:"+row.id);
			    		return ( 				
			    				<div 
			    				style={{ textAlign: "center",
			    					cursor: "pointer",
			    					lineHeight: "normal" }}>

			    				<button onClick={this.editRow(row.id)}>
			    				<FontAwesomeIcon icon={faEdit} />
			    				</button>			    				
								</div> 
			    		)
			            
					}
								        
			     }
			];
			const selectedRows = { selectRow }
			console.log("selectedRows: "+ selectedRows.row);
		return(
				<div>
				<Form style={{backgroundColor: '#cfe8fc'}}>
				<FormGroup row>				
				<Col sm={1}>
				<button onClick={ this.deleteRows(selectRow.selected) }>
				<FontAwesomeIcon icon={faTrashAlt} />
				</button>
				</Col>				
				</FormGroup>

				<BootstrapTable tableStyle={ { border: 'black 2.5px solid' }}		        
				headerStyle={ { border: 'black 1px solid' } }
				bodyStyle={ { border: 'black 1px solid' } } keyField="id" data={this.state.products} columns={ columns } selectRow={ selectRow } />

				</Form>	

				<Router>
					<switch>
		  <Route
		  exact path="/EditVisitor" render={(props)=><EditVisitor {...props} ticketid={this.state.ticketid}/>}
		  />
		  </switch>		
		  </Router>

				</div>	
					

		)
	}
}
export default (VisitorTable);