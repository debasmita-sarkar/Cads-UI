import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Connect() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Connection
        </Typography>
        <Typography component="p">
          Here we are trying to establish connection with your neighbours.Also connect with
          security to ensure your children are safe.SEcurity needs your permission to allow
          kids going out of the apartment ..
        </Typography>
      </Paper>
    </div>
  );
}