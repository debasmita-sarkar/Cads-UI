
import React from 'react';
export default class signup extends React.component{

    constructor(props){
        super(props);
        this.state = {
        'email': '',
        'password': '',
        'username': '',
        'flatno': '',
        'building': '',
        }


    }

    render(){
        return (
            <Container className="App1">
                <h2>Sign In</h2>
                <Form className="form" >
                    <Col >
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="email" name="email" id="exampleEmail" placeholder="myemail@email.com"
                                value={email}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={(e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                }}
                            />
                            <FormFeedback valid> Valid Email. </FormFeedback>
                            <FormFeedback> Please input a correct email.</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="********"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button onClick={(e) =>
                        this.formHandler(e)} type="submit">Submit</Button>
                    </Form>
            </Container>)

    }

}