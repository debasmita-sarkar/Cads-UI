import React from 'react';
import Axios from 'axios';
import Home from '../Home/Home.js';
import ErrorRaiseTicket from './ErrorRaiseTicket.js';
import { Button, Form, FormGroup, Label, Input, FormText, DropdownItem, Dropdown, DropdownToggle, DropdownMenu, Col } from 'reactstrap';

export default class EditFinanceTicket extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tickettypes: null,
			ticketstates: null,
			flats: [],
			isPostSuccess: null,
			form: {
				description: '',
				ticketType: '',
				workerType: 'user',
				state: 'NEW',
				submitterid: '',
				ownerid: '',
				note: '',
				dueDate: '',
				isRecurring: false,
				isBlocked: false

			}
		}
		this.selectFromOptions = this.selectFromOptions.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.formHandler = this.formHandler.bind(this);
	}

	selectFromOptions(e) {
		console.log("Option selected:" + e.target.value + "id:" + e.target.name);
		let store = this.state;
		store.form[e.target.name] = e.target.value;
		this.setState(store);
	}

	changeHandler(e) {
		e.persist();
		console.log("e:" + e.target.name + e.target.value);
		let store = this.state;
		store.form[e.target.name] = e.target.value;
		this.setState(store);
	}

	formHandler(e) {
		e.preventDefault();
		console.log("formData: " + JSON.stringify(this.state.form));
		Axios.post('http://localhost:8080/tickets', JSON.stringify(this.state.form), {
			headers: {
				'content-type': 'application/json',
			}
		}).then(response => {
			console.log(response.status);
			this.setState({ isPostSuccess: response.status });
			console.log(response.status);
		})
			.catch(error => {
				this.setState({ isPostSuccess: "error" });
				console.log(error);
				//Perform action based on error
			})
	}

	componentDidMount() {
		const map = new Map([[1, "tickettypes"], [2, "ticketstates"]]);
		map.forEach((value, key, thisMap) => {
			console.log(key + "=>" + value)
			Axios.get('http://localhost:8080/' + value,
				{
					headers: {
						'content-type': 'application/json',
					},
				}).then(res => {
					console.log(value + ":" + res.data);
					this.setState({ [value]: res.data });
					console.log("after applying" + this.setState.tickettypes);
				})
				.catch(err => console.log(err));

			Axios.get('http://localhost:8080/flats',
				{
					headers: {
						'content-type': 'application/json',
					},
				}).then(res => {
					console.log("flats:" + res.data);
					this.setState({ flats: res.data });
				})
				.catch(err => console.log(err));
		}
		)
	}
	render() {
		if (this.state.isPostSuccess != null) {
			if (this.state.isPostSuccess == "error") {
				return <ErrorRaiseTicket />;
			}
			return <Home />;
		}

		let flatList = "";
		if (this.state.flats != null) {
			flatList = this.state.flats.map((item) => {
				return <option value={item.id} onClick={this.selectFromDrpDown}>{item.number}</option>

			});
		} else {
			flatList = <option>No user available.</option>
		}

		let ticketType = "";
		if (this.state.tickettypes != null) {
			ticketType = this.state.tickettypes.map((item) => {
				return <option>{item}</option>

			});
		} else {
			ticketType = <option>No Ticket Type available.</option>
		}

		let ticketState = "";
		if (this.state.ticketstates != null) {
			ticketState = this.state.ticketstates.map((item) => {
				return <option>{item}</option>

			});
		} else {
			ticketState = <option>Different states of a ticket is missing.Please check the network connectivity.</option>
		}

		return (
			<Form style={{ backgroundColor: '#cfe8fc' }}>
				<FormGroup row>
					<Label sm={12} for="RaiseTicket">Raise Ticket</Label>
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
					<Label sm={2} for="ticketType">Type of Job</Label>
					<Col sm={10}>
						<Input type="select" name="ticketType" id="ticketType" ref="ticketType" onChange={this.selectFromOptions}>
							<option>select from below types</option>
							{ticketType}
						</Input>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2} for="ownerid">House No</Label>
					<Col sm={10}>
						<Input type="select" name="ownerid" id="ownerid" ref="ownerid" onChange={this.selectFromOptions}>
							<option>Select your flat number</option>
							{flatList}
						</Input>
					</Col>
				</FormGroup>

				<FormGroup row>
					<Label sm={2} for="description">Comments</Label>
					<Col sm={10}>
						<Input
							type="text"
							name="note"
							id="note"
							placeholder="Anything else you want us to know?" onChange={this.changeHandler} />
					</Col>
				</FormGroup>

				<FormGroup row>
					<Label sm={2} for="dueDate">Due Date</Label>
					<Col sm={10}>
						<Input
							type="date"
							name="dueDate"
							id="dueDate"
							placeholder="" onChange={this.changeHandler}
						/>
					</Col>
				</FormGroup>

				<FormGroup row>
					<Label sm={2} for="isBlocked">Type of Job</Label>
					<Col sm={10}>
						<Input type="select" name="isBlocked" id="isBlocked" ref="isBlocked" onChange={this.selectFromOptions}>
							<option>true</option>
							<option>false</option>
						</Input>
					</Col>
				</FormGroup>

				<Button onClick={(e) =>
					this.formHandler(e)} type="submit">Submit</Button>
			</Form>
		)
	}
}