
import React from 'react';
import './ActionDrawers.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBuilding,faPeopleCarry,faCoins,faUsers,faParking,faCity,faClipboardList,faUserCheck,faDungeon,faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ActionDrawers extends React.Component {
	constructor(props){
		super(props);
		this.state = {
				 openContent: true,
				    show: 'NoData',
				    open: false,
				    openFinance:false,
				    openVisitors:false,
					openHomeService:false,
					openConnect:false
				  };		
		 this.decideContent = this.decideContent.bind(this)
		 this.handleClick = this.handleClick.bind(this)		 
	}
	componentDidMount(){		
		this.props.contentIDValue(this.state.show);
	}
	decideContent() {		
		this.props.contentIDValue(this.state.show);
      console.log("this.state.show: in show foo:"+this.state.show);
  };
  
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));   
    this.setState({ show: 'DataUpload' ,openContent: false})
    
  }
  
  handleClickFinance = () => {
	   
	    this.setState(state => ({ openFinance: !state.openFinance }));
	    this.setState({ show: 'DataUpload' ,openContent: false})
	    
	  }
  
   render() {	   
    const { classes } = this.props;  
    return (
    		<List
    		component="nav"
    			subheader={<ListSubheader component="div">Actions </ListSubheader>}

    		>
    		<ListItem button  onClick={this.handleClickFinance}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faCoins} />          
    		</ListItemIcon>
    		<ListItemText inset primary="Manage Finance" />
    		{this.state.openFinance ? <ExpandLess /> : <ExpandMore />}
    			</ListItem>
    		<Collapse in={this.state.openFinance} timeout="auto" unmountOnExit>
    		<List component="div" disablePadding>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'ShowAllTickets' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faClipboardList} />
    		</ListItemIcon>
    		<ListItemText inset primary="Finance related Tickets" />
    			</ListItem>
			<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'Audit' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faChalkboardTeacher} />
    		</ListItemIcon>
    		<ListItemText inset primary="Audit Documents" />
    		</ListItem>
    		</List>
    		</Collapse>
    		
    		<ListItem button  onClick={() => {
    			this.setState({ show: 'ManageHomeService' ,openContent: false,openHomeService:!this.state.openHomeService})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faPeopleCarry} />
    		</ListItemIcon>
    		<ListItemText inset primary="Manage Home services " />
			{this.state.openHomeService ? <ExpandLess /> : <ExpandMore />}
    		</ListItem>
				<Collapse in={this.state.openHomeService} timeout="auto" unmountOnExit>
    		<List component="div" disablePadding>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'ShowAllHomeServiceTickets' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faClipboardList} />
    		</ListItemIcon>
    		<ListItemText inset primary="Show Home Service Tickets" />
    		</ListItem>
    		</List>
    		</Collapse>
			<ListItem button  onClick={() => {
    			this.setState({ show: 'ManageVisitors' ,openContent: false,openVisitors:!this.state.openVisitors})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
			<FontAwesomeIcon icon={faDungeon} />
    		</ListItemIcon>
    		<ListItemText inset primary="Manage Visitors " />
			{this.state.openVisitors ? <ExpandLess /> : <ExpandMore />}
    		</ListItem>
				<Collapse in={this.state.openVisitors} timeout="auto" unmountOnExit>
    		<List component="div" disablePadding>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'ShowMyVisitors' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<img src='myvisitoricon.png'alt="" width="30" height="20" />
    		</ListItemIcon>
    		<ListItemText inset primary="Show my visitors" />
    		</ListItem>

			<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'ShowAllVisitors' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<img src='visitor.png'alt="" width="30" height="20" />
    		</ListItemIcon>
    		<ListItemText inset primary="Show all visitors" />
    		</ListItem>
    		</List>
    		</Collapse>

			<ListItem button  onClick={() => {
				this.setState({ show: 'Connect' ,openContent: false,openConnect:!this.state.openConnect})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
			<FontAwesomeIcon icon={faDungeon} />
    		</ListItemIcon>
    		<ListItemText inset primary="Connect .." />
			{this.state.openConnect ? <ExpandLess /> : <ExpandMore />}
    		</ListItem>
				<Collapse in={this.state.openConnect} timeout="auto" unmountOnExit>
    		<List component="div" disablePadding>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'Neighbours' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<img src='myvisitoricon.png'alt="" width="30" height="20" />
    		</ListItemIcon>
    		<ListItemText inset primary="Neighbours" />
    		</ListItem>

			<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'childlock' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<img src='visitor.png'alt="" width="30" height="20" />
    		</ListItemIcon>
    		<ListItemText inset primary="Child Lock" />
    		</ListItem>
    		</List>
    		</Collapse> 

			<ListItem button  onClick={this.handleClick}>
    		<ListItemIcon>
    		<InboxIcon />
    		</ListItemIcon>
    		<ListItemText inset primary="Push Details" />
    		{this.state.open ? <ExpandLess /> : <ExpandMore />}
    		</ListItem>
    		<Collapse in={this.state.open} timeout="auto" unmountOnExit>
    		<List component="div" disablePadding>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'BuildingDataUpload' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faCity} />
    		</ListItemIcon>
    		<ListItemText inset primary="Add Building Details" />
    			</ListItem>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'FlatDataUpload' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faBuilding} />
    		</ListItemIcon>
    		<ListItemText inset primary="Add Flat Details" />
    			</ListItem>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'UserUpload' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faUsers} />
    		</ListItemIcon>
    		<ListItemText inset primary="Add Users" />
    			</ListItem>

    		<ListItem button className={classes.nested}  onClick={() => {
    			this.setState({ show: 'VParkingUpload' ,openContent: false})
    			this.props.contentIDValue(this.state.show);
    		}}>
    		<ListItemIcon>
    		<FontAwesomeIcon icon={faParking} />
    		</ListItemIcon>
    		<ListItemText inset primary="Add parking slots for visitors" />
    		</ListItem>

    		</List>
        </Collapse>        
      </List>
    )   
  }
}

ActionDrawers.propTypes = {
  //classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ActionDrawers);