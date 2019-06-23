import React from 'react';
import './Container.css';
import About from './About.js';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DataUploadScreen from '../DataUpload/';
import UserUploadScreen from '../DataUpload/UserUploadScreen.js';
import FlatDataUpload from '../DataUpload/FlatDataUpload.js';
import BuildingDataUpload from '../DataUpload/BuildingDataUpload.js';
import ActionDrawers from '../ActionDrawers/ActionDrawers.js';
import VParkingUpload from '../DataUpload/VParkingUpload.js';
import TicketTable from '../Ticket/TicketTable.js';
import RaiseFinanceTicket from '../Ticket/RaiseFinanceTicket.js';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ContainerScreen extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
				    mobileOpen: false,
				    show: 'foo',
				    open: false,
				  };
		 //this.dynamicContent = this.dynamicContent.bind(this)  
		 this.handleContentID = this.handleContentID.bind(this)		 
	}
	
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  
  handleContentID(data) {
		console.log("content value in handleContentID:"+data);
		 if(typeof data != 'undefined'){
	    this.setState({
	    	show: data,
	    	open: false
	    })
		 }
		 
		 console.log("this.state.show: in show foo:"+this.state.show);
	  }
  
  render() {
    const { classes, theme } = this.props;
    let content = null;
    console.log("this.state.show"+this.state.show);
    switch(this.state.show) {
        case 'Finance':
        	content = <h1>Finance management Page- In Progress</h1>;
            break;
        case 'ManageHomeService':
        	content = <h1>Home service management Page- In Progress</h1>;
            break;
        case 'DataUpload':
            content = <DataUploadScreen/>;
            break;
        case 'UserUpload':
        	content = <UserUploadScreen/>;
            break;
        case 'FlatDataUpload':
        	content = <FlatDataUpload/>;
            break;
        case 'BuildingDataUpload':
        	content = <BuildingDataUpload/>;
            break;
        case 'VParkingUpload':
        	content = <VParkingUpload/>;
            break;
        case 'ShowAllTickets':
        	content = <TicketTable/>;
        	break;
        case 'RaiseFinanceTicket':
        	content = <RaiseFinanceTicket/>;
        	break;        	
        default:
            content = <About/>;
    }
   
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <ActionDrawers let contentIDValue={this.handleContentID}/>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />        
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
             
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
        <div className={classes.toolbar} >
        {content}
        </div>
        </main>
        
      </div>
    );
  }
}

ContainerScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  ContainerScreen: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ContainerScreen);