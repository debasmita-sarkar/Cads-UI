import React from 'react';
import Axios from 'axios';
import Neighbour from './Neighbour.js';
import { Form, FormGroup, Col} from 'reactstrap';

export default class AllNeighbours extends React.Component  {

	constructor(props){		
		super(props);
		this.state = {
				listOfUsers:[]
		}
        this.getAllUsers = this.getAllUsers.bind(this);
        this.renderCards = this.renderCards.bind(this);
        this.pushUserDetailsInArray = this.pushUserDetailsInArray.bind(this);        		
       // this.callHandler = this.callHandler.bind(this);
       // this.smsHandler = this.smsHandler.bind(this);
       // this.favHandler = this.favHandler.bind(this);
      }
      pushUserDetailsInArray(response) {
        this.state.listOfUsers=[];
        const responseLength = response.data.length; 
        let tempdata=[];
        for (let i = 0; i < responseLength; i++) {
          const user = response.data[i];
          console.log("In addProducts - complte data:"+response.data);
          console.log("In addProducts - id:"+response.data[i].id);
          console.log("In addProducts - firstname:"+response.data[i].firstName);	
          console.log("In addProducts- phone:"+response.data[i].phone);
          console.log("In addProducts- lastname:"+response.data[i].lastName);		
          console.log("In addProducts- flatNumber:"+response.data[i].flatNumber);  
          console.log("In addProducts- email:"+response.data[i].email); 
          console.log("users before pushUserDetailsInArray:"+user.phone);
          //tempdata.push(response.data[i]);
          //tempdata.map((user)=>{
			this.state.listOfUsers.push(user);     	
            console.log("users pushUserDetailsInArray:"+this.state.listOfUsers.length);
          }
         
        }

      getAllUsers(){
        let users = [];
        Axios.get('http://localhost:8080/users',
			{
			headers: { 
				'content-type' : 'application/json',
			},	    
			}).then(res => {
					console.log("users:"+res.data[0]+":"+res.data[0].email+":"+res.data.phone);
                   this.pushUserDetailsInArray(res);
                    console.log("users getallusers:"+this.state.listOfUsers[0]);					
			}).catch(err => console.log(err));
		return users;
    }
    renderCards(){                
        this.getAllUsers();
        console.log("in renderCards"+ this.state.listOfUsers.length);
		let buildingselections =null;
		if(this.state.listOfUsers.length >0){
            var i=1;
            let lengthVar=0;
            let card1='';
            let card2='';
            let card3='';
			buildingselections = this.state.listOfUsers.map((item)=> 
			{  
                lengthVar++;             
                if(i==1){
                    card1=item;
                    i++;
                    if(lengthVar == this.state.listOfUsers.length){
                       return ( <FormGroup row>
                            <Col sm={4}> <Neighbour value={card1}/></Col>                                                       
                            </FormGroup> ); 
                    card1='';                            
                    }                  
                }else if(i ==2){
                    card2=item;
                    console.log("card2:"+card2);
                    i++;
                    if(lengthVar == this.state.listOfUsers.length){
                        return ( <FormGroup row>
                             <Col sm={4}> <Neighbour value={card1}/></Col>
                             <Col sm={4}> <Neighbour value={card2}/></Col>                            
                             </FormGroup> ); 
                             card1='';
                             card2=''; 
                     }
                     
                }
                else if (i ==3){
                    card3=item;
                    i=1;
                return  (
                        <FormGroup row>
                        <Col sm={4}> <Neighbour value={card1}/></Col>
                        <Col sm={4}> <Neighbour value={card2}/></Col>
                        <Col sm={4}> <Neighbour value={card3}/></Col> 
                        </FormGroup> ); 
                card1='';
                card2='';
                card3='';
                }
            }); 
                console.log("in renderFlats not null: "+ buildingselections);	
						
		} else{
			buildingselections = <FormGroup row><Col sm={12}> Oops !!! Building details not yet uploaded.</Col></FormGroup>
        }
        return buildingselections;
    }
    
      render(){
          return(
          <div>
          <Form style={{backgroundColor: '#cfe8fc'}}>
          {this.renderCards()}
          </Form>
          </div>
          )
          
      }
}