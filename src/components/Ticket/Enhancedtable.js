import React from 'react';
import { Table,Input } from 'reactstrap';
import Collapse from '@material-ui/core/Collapse';


export class Enhancedtable extends React.Component {
	
	constructor(props){		
		super(props);
		this.state = {
				open: true
				}			
		this.changeHandler = this.changeHandler.bind(this);
	  }
	
	changeHandler = () => {
	    this.setState(state => ({ open: !state.open }));
	  }
	
  render() {
	  
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <td><Input 	            
			type="text"
				name="name"
					id="name"
						placeholder="Name of the building" onChange={this.changeHandler}/></td>
            </Collapse>
            <Collapse in={!this.state.open} timeout="auto" unmountOnExit>
            <td>Otto</td>
            </Collapse>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
export default Enhancedtable;