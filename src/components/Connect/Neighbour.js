import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Neighbour(props) {
  const classes = useStyles();
  console.log("props in neighbor:"+props.value);
  const user = props.value  ; 
  console.log("user in neighbor:"+user.flatNumber); 
  //const [user, setUser]  = useState(props.value); 

  const username=(user.firstName === null? "":user.firstName)+(user.middleName ===null?"":" "+user.middleName)+(user.lastName ===null?"":" "+user.lastName);
  const email=user.email;
  const phone=user.phone;
  const flatnumber="Flat - "+user.flatNumber; 
  console.log("username in neighbor:"+username+ flatnumber);
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Contact" className={classes.avatar}>
            R
          </Avatar>
        }
        title= {flatnumber}
        
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
      <Typography variant="h6" align='right' gutterBottom>
      {username}
      </Typography>       
        <Typography variant="subtitle2" align='right' gutterBottom>
        {email}
      </Typography>
      <Typography variant="subtitle2" align='right' gutterBottom>
      {phone}
    </Typography>       
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="call">
        <ShareIcon />
      </IconButton>
      <IconButton aria-label="Email">
      <ShareIcon />
    </IconButton>
      </CardActions>     
    </Card>     
  );
}