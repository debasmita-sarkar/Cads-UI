import React from 'react';
import MaterialTable from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Axios from 'axios';
import { forwardRef } from 'react';
import {useState,useEffect} from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ErrorRemovingTicket from './ErrorRemovingTicket';
import Home from '../Home';
import ErrorRaiseTicket from './ErrorRaiseTicket';

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function FinanceTicketTable() { 
  const [data, setDataValues] = useState([]);
  const [columns, setStateValues] = useState([]);
  const [isPostSuccess, setStatus] = useState(null);

  React.useEffect(() => {
    console.log("In useEffect");
  Axios.get('http://localhost:8080/tickets/columns?ticketcategory=finance',
  {
headers: { 
  'content-type' : 'application/json',
},	    
  }).then(res => { 
    console.log("cols of ticket table:"+res.data);
    setStateValues(res.data); 
  })
  .catch(err => console.log(err)); 

  Axios.get('http://localhost:8080/tickets',
      {
    headers: { 
      'content-type' : 'application/json',
    },	    
      }).then(res => {
        console.log("visitors:"+res.data[0].id);
        //this.setState({products:res.data});
        addProducts(res);					
      })
      .catch(err => console.log(err));

},[]);

function removeTicket(id){
  console.log("In removeVisitor"+id);
  Axios.delete('http://localhost:8080/tickets/'+id,
      {
    headers: { 
      'content-type' : 'application/json',
    },	    
      }).then(res => {
        console.log("response:"+res);
        setStatus(res.status);         				
      })
      .catch(err =>
      {
         console.log(err)
         setStatus("errorRemove");
      }); 
}

function addProducts(response) {
  
  const responseLength = response.data.length; 
  let tempdata=[];
  for (let i = 0; i < responseLength; i++) {
    console.log("In addProducts - complte data:"+response.data);
    console.log("In addProducts:"+response.data[i].id);
    console.log("In addProducts:"+response.data[i].name);	
    console.log("In addProducts:"+response.data[i].phone);
    console.log("In addProducts:"+response.data[i].flatnumber);		
    console.log("In addProducts:"+response.data[i].buildingName);  
    console.log("In addProducts:"+response.data[i].purpose);	
    console.log("In addProducts:"+response.data[i].timeIn);	
    console.log("In addProducts:"+response.data[i].parking);	
    tempdata.push({        
        name: response.data[i].name,
        phone: response.data[i].phone,
        buildingName: response.data[i].buildingId,        
        flatnumber: response.data[i].flatId,              
        purpose:response.data[i].purpose,
        timeIn:response.data[i].timeIn,
        timeOut:response.data[i].timeOut,
        parking:response.data[i].parking.id,
        flatId:response.data[i].flatId,
        buildingId:response.data[i].buildingId,
        id:response.data[i].id         
      });
    }
    
    setDataValues(tempdata);
    
  }

function postTicket(ticket){
  console.log("In postVisitor"+JSON.stringify(ticket));
  Axios.post('http://localhost:8080/tickets',
  JSON.stringify(ticket),
      {
    headers: { 
      'content-type' : 'application/json',
    },	    
      }).then(response => {
        console.log(response.status); 
        setStatus(response.status);                             
      })
      .catch(error =>{
        setStatus("error");
        console.log(error);			       
        //Perform action based on error
      })
}

  console.log("state.columns:");
  if(isPostSuccess !=null){
      if(isPostSuccess == "error" ){
         return <ErrorRaiseTicket/>;
      }      
      else if(isPostSuccess == "errorRemove"){
          return <ErrorRemovingTicket/>;
      }      
      else{
      return <Home/>;
      }
  }
  return (
    <MaterialTable
      title="Ticket Details"
      icons={tableIcons}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tempdata = [data];
              tempdata.push(newData);
              console.log("added ticket:"+ newData );
              setDataValues(data);
              postTicket(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tempdata = [data];
              tempdata[tempdata.indexOf(oldData)] = newData;
              setDataValues(tempdata);
              postTicket(newData);              
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tempdata = [data];
              tempdata.splice(tempdata.indexOf(oldData), 1);
              setDataValues(tempdata);
              removeTicket(oldData.id);              
            }, 600);
          }),
      }}
    />
  );
}