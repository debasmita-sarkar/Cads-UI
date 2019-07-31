import React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';

export default class ErrorRemovingVisitor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Form style={{ backgroundColor: '#cfe8fc' }}>
				<FormGroup row>
					<Label sm={12} >Oops !! Could not remove the visitor, Please try again or later.</Label>
				</FormGroup>
				<FormGroup row>
					<Label sm={12} >Please check the internet connection and then try again.</Label>
				</FormGroup>
			</Form>
		);
	}
}
