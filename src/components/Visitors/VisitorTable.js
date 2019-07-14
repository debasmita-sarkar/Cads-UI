import React from 'react';
import MaterialTable from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Axios from 'axios';
import { forwardRef } from 'react';

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


export default function VisitorTable() {
 
  //buildings =  "{"+buildings+"}";
  
  const [state, setState] = React.useState({ 
    buildingsList:"",   
    flatList:[],
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Phone number', field: 'phone' },
      { title: 'Flat number', field: 'flatno',lookup: {1:'İstanbul', 1:'Şanlıurfa' } },
      { title: 'Building Name', field: 'buildingname',lookup:{}},
      { title: 'Purpose', field: 'purpose' },
      { title: 'Time in', field: 'timeIn' },
      { title: 'Time Out', field: 'timeOut' },
      { title: 'Parking slot allocated', field: 'parking' ,lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }},      
    ],
    data: [ ] 
    
  });
  console.log("inside visitor table first line" +state.buildingsList); 
  function addProducts(response) {
    console.log("In addProducts:"+response.length);	
    const responseLength = response.data.length; 
    state.data=[];
    for (let i = 0; i < responseLength; i++) {
         state.data.push({
          id:response.data[i].id,
          name: response.data[i].name,
          phone: response.data[i].phone,
          flatno: response.data[i].flatnumber,
          buildingname:response.data[i].buildingName,
          purpose:response.data[i].purpose,
          timeIn:response.data[i].timeIn,
          timeOut:response.data[i].timeOut,
          parking:response.data[i].parking,
          flatId:response.data[i].flatId,
          buildingId:response.data[i].buildingId,          
        });
      }
    }
   
  function removeVisitor(id){
    console.log("In removeVisitor"+id);
    Axios.delete('http://localhost:8080/visitors/'+id,
        {
      headers: { 
        'content-type' : 'application/json',
      },	    
        }).then(res => {
          console.log("response:"+res);          				
        })
        .catch(err => console.log(err)); 
  }

  React.useEffect(() => {
    console.log("In useEffect");
  Axios.get('http://localhost:8080/visitors',
      {
    headers: { 
      'content-type' : 'application/json',
    },	    
      }).then(res => {
        console.log("visitors:"+res.data);
        //this.setState({products:res.data});
        addProducts(res);					
      })
      .catch(err => console.log(err));
      
      Axios.get('http://localhost:8080/flatnumbers',
      {
    headers: { 
      'content-type' : 'application/json',
    },	    
      }).then(res => {
        console.log("flats:"+res.data);
        this.setState({flats:res.data});
      })
      .catch(err => console.log(err));   
  },);

  let buildings="";
  Axios.get('http://localhost:8080/buildings',
      {
    headers: { 
      'content-type' : 'application/json',
    },	    
      }).then(res => {        
               
        buildings=res.data.map((item)=> 
        {	
          return(item.id+":"+"\'"+item.name+"\'");
        } ) ;
        
        console.log("buildings:"+buildings);  
        this.setState({buildingsList :buildings});        
      })
      .catch(err => console.log(err));

  console.log("inside visitor table before render");
  return (    
    <MaterialTable
      title="Visitor Table"
      icons={tableIcons}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              let data = [...state.data];
              console.log("data before replacing:"+state.data[data.indexOf(oldData)]);
              console.log("index:"+data.indexOf(oldData));
              data[data.indexOf(oldData)] = newData;              
              setState({ ...state, data });
              console.log("data after replacing:"+state.data[data.indexOf(oldData)]);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              console.log("index:"+data.indexOf(oldData));
              data.splice(data.indexOf(oldData), 1);
              removeVisitor(oldData.id);
              setState({ ...state, data });
              console.log("size:"+state.data.length);
            }, 600);
              
          }),
      }}
    />
  );
}