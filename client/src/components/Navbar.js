import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Drawer from '@material-ui/core/Drawer';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Bar } from 'react-chartjs-2';

// simple dialog imports

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { checkServerIdentity } from 'tls';

//Landing Page

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DashboardImage from '../assets/dashboard.png'
import MeasuresImage from '../assets/focus.png'
import ClientsImage from '../assets/team.png'
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import logo from '../assets/capgemini_logo.png'
const drawerWidth = 240;
//simple dialog imports - end


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: '0 auto',
    },
    leftnavClientTitle: {
        paddingTop: '10px',
        paddingLeft: '16px'
    },
    iconWidth: {
        width: '200px',
        margin: '0 auto'
    },
    iconWidthShort: {
        width: '180px',
        margin: '0 auto'
    },
    card: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        /* align-content: center; */
        height: '100vh',
        overflow: 'auto',
    },
    tiles: {
        maxWidth: 345,
    },
    title: {
        flexGrow: 1,
    },
    tilesShort: {
        maxWidth: 200,
    },
    alignCenter: {
        textAlign: 'center',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

}));

function Navbar() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const theme = useTheme();
    const classes = useStyles();
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const [open, setOpen] = React.useState(false);
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };


    const logOut = (event, reason) => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('customerId')
        localStorage.removeItem('isActive')
        localStorage.removeItem('isAdmin')
        window.location.href = '/signin'
    };


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    {window.location.pathname === '/' || window.location.pathname === '/signin' ? null :
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, openDrawer && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>}
                    <Typography variant="h6" className={classes.title}>
                        Capgemini IT Cost Efficiency
        </Typography>
                    <img style={{ width: '40px', marginRight: '10px' }} src={logo} alt="logo" />
                    {/* <Button color="inherit" onClick={() => { window.location.href = '/signup'; }}>Login</Button> */}
                    {window.location.pathname === '/' || window.location.pathname === '/signin' ? null :
                        <Button color="inherit" onClick={logOut}>Logout</Button>}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <List>
                    <ListItem button key='User Dashboard' component={Link} to="/landing">
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary='User Dashboard' />
                    </ListItem>
                </List>
                <Divider />
                <Typography className={classes.leftnavClientTitle}>
                    Client
                        </Typography>
                <List>
                    <ListItem button key='Dashboard' component={Link} to="/dashboard">
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                    <ListItem button key='Measures' component={Link} to="/measures">
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary='Measures' />
                    </ListItem>
                    <ListItem button key='Settings' component={Link} to="/settings">
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default Navbar;
