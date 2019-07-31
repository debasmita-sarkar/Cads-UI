import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function MyChildlock(props ) {
  const classes = useStyles();
  const user = props.value  ; 
  console.log("loggeduser in mychildlock - " + user.id);
  const flatid =  user.flatId;
  const [labelString, setLabelvalue] = useState(null);
  const [labelcolor, setLabelcolor] = useState("primary");
  const [flatDetails, setFlatvalue] = useState(null);
  
  React.useEffect(() => {
    console.log("In useEffect");
    if (user != null) {
      Axios.get('http://localhost:8080/flats/'+flatid,
        {
          headers: {
            'content-type': 'application/json',
          },
        }).then(res => {
          console.log("flat details:" + res.data);
          setFlatvalue(res.data);
          setlabelAndColor(res.data);
        })
        .catch(err => console.log(err));
    }

  }, []);

  function postFlat(flat) {
    console.log("formData: " + JSON.stringify(flat));
    Axios.post('http://localhost:8080/flats', JSON.stringify(flat), {
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => {
      console.log(response.data);
    })
      .catch(error => {
        console.log(error);
        //Perform action based on error
      })
  }

  function setlabelAndColor(data){
    if (data.canKidsGoOut) {
      setLabelvalue("My child can go outside the premises.");
      setLabelcolor("primary");
    } else {
      setLabelvalue("My child should stay inside premises.");
      setLabelcolor("secondary");
    }
  }
  function handleClick() {
    alert('You clicked the Chip.');
    const tempdata = flatDetails;
    tempdata.canKidsGoOut = !flatDetails.canKidsGoOut;
    console.log("flatDetails:" + flatDetails.id + ":flatDetails.canKidsGoOut:" + flatDetails.canKidsGoOut);
    console.log("tempdata:" + tempdata.id + ":tempdata.canKidsGoOut:" + tempdata.canKidsGoOut);
    setlabelAndColor(tempdata);
    setFlatvalue(tempdata);
    postFlat(tempdata);
  }

  return (
    <div className={classes.root}>
      <Chip
        icon={<FaceIcon />}
        label={labelString}
        clickable
        className={classes.chip}
        color={labelcolor}
        onClick={handleClick}
      />
    </div>
  );
}