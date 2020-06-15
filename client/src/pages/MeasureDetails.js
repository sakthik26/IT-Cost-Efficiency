import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo from '../assets/logo.jpg'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    dropdownWidth: {
        width: '100%'
    },
    title: {
        flexGrow: 1,
    },
    margin: {
        marginTop: '10px',
        marginBottom: '10px',
    }
}));



function TabPanel(props) {
    const { children, value, index, ...other } = props


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MeasureDetails() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('Euros');
    const currencies = ['Euros', 'US Dollars', 'Singapore Dollars', 'Yen']
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const [lever, setLever] = React.useState('IT');
    const levers = ['IT', 'Infrastructure']
    const handleLeverChange = (event) => {
        setLever(event.target.value);
    };

    const [hdValue, setHdValue] = React.useState('HD0');
    const hdValues = ['HD0', 'HD1', 'HD2', 'HD3', 'HD4', 'HD5']
    const handleHdChange = (event) => {
        setHdValue(event.target.value);
    };

    const [area, setArea] = React.useState('Network');
    const areas = ['Network', 'Infrastructure', 'Other']
    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    const [isSustainable, setSustainability] = React.useState('Yes');
    const sustainabilityValues = ['Yes', 'No']
    const handleSustainabilityChange = (event) => {
        setSustainability(event.target.value);
    };


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [validFrom, setValidFrom] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleValidFrom = (date) => {
        setValidFrom(date);
    };

    const [validTo, setValidTo] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleValidTo = (date) => {
        setValidTo(date);
    };

    const [hd0, setHd0] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleHd0 = (date) => {
        setHd0(date);
    };

    const [hd1, setHd1] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleHd1 = (date) => {
        setHd1(date);
    };

    const [hd2, setHd2] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleHd2 = (date) => {
        setHd2(date);
    };

    const [hd3, setHd3] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleHd3 = (date) => {
        setHd3(date);
    };

    const [hd4, setHd4] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleHd4 = (date) => {
        setHd4(date);
    };

    const [hd5, setHd5] = React.useState(new Date('2020-06-15T21:11:54'));

    const handleHd5 = (date) => {
        setHd5(date);
    };

    const logOut = (event, reason) => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('customerId')
        window.location.href = '/signin'
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        IT Cost Efficiency
        </Typography>

                    <img style={{ width: '50px' }} src={logo} alt="logo" />
                    {/* <Button color="inherit" onClick={() => { window.location.href = '/signup'; }}>Login</Button> */}
                    <Button color="inherit" onClick={logOut}>Logout</Button>
                </Toolbar>

            </AppBar>
            <Typography variant="h5" className={classes.margin} style={{
                paddingLeft: '10px'
            }}>
                Measures: SBI
        </Typography>

            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="New Measure" {...a11yProps(0)} />
                <Tab label="All Measures" {...a11yProps(1)} />

            </Tabs>
            <img style={{ width: '50px', position: 'absolute', right: '0px', top: '65px' }} src={logo} alt="logo" />

            <TabPanel value={value} index={0}>

                <React.Fragment>
                    {/* <Typography variant="h6" gutterBottom>
                        Shipping address
      </Typography> */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="measureName"
                                name="measureName"
                                label="Measure Name"
                                fullWidth
                                autoComplete="measure-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                className={classes.dropdownWidth}
                                value={currency}
                                onChange={handleCurrencyChange}
                            >
                                {currencies.map(currency =>
                                    <MenuItem
                                        value={currency}
                                    >
                                        {currency}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="measureDescription"
                                label="Measure Description"
                                fullWidth
                                autoComplete="Measure Description"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="demo-simple-select-label">Lever</InputLabel>
                            <Select
                                className={classes.dropdownWidth}
                                value={lever}
                                onChange={handleLeverChange}
                            >
                                {levers.map(lever =>
                                    <MenuItem
                                        value={lever}
                                    >
                                        {lever}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="demo-simple-select-label">Area</InputLabel>
                            <Select
                                className={classes.dropdownWidth}
                                value={area}
                                onChange={handleAreaChange}
                            >
                                {areas.map(area =>
                                    <MenuItem
                                        value={area}
                                    >
                                        {area}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="demo-simple-select-label">Current HD Value</InputLabel>
                            <Select
                                className={classes.dropdownWidth}
                                value={hdValue}
                                onChange={handleHdChange}
                            >
                                {hdValues.map(hdValue =>
                                    <MenuItem
                                        value={hdValue}
                                    >
                                        {hdValue}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <InputLabel id="demo-simple-select-label">Sustainable</InputLabel>
                            <Select
                                className={classes.dropdownWidth}
                                value={isSustainable}
                                onChange={handleSustainabilityChange}
                            >
                                {sustainabilityValues.map(sustainability =>
                                    <MenuItem
                                        value={sustainability}
                                    >
                                        {sustainability}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel >Valid From</InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={validFrom}
                                    onChange={handleValidFrom}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel >Valid To</InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={validTo}
                                    onChange={handleValidTo}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel >HD0</InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={hd0}
                                    onChange={handleHd0}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel > HD1 </InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={hd1}
                                    onChange={handleHd1}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <InputLabel > HD2 </InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={hd2}
                                    onChange={handleHd2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel > HD3 </InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={hd3}
                                    onChange={handleHd3}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel > HD4 </InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={hd4}
                                    onChange={handleHd4}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel > HD5 </InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"

                                    format="MM/dd/yyyy"
                                    value={hd5}
                                    onChange={handleHd5}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container className={classes.margin} spacing={3}>

                        <Grid item xs={12}>
                            <TextField
                                required

                                label="Overruns or Additional Charges"
                                fullWidth
                                autoComplete="Overruns or Additional Charges"
                            />
                        </Grid>
                        <InputLabel style={{ width: "100%" }}> Savings potential: </InputLabel>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD0"
                                fullWidth
                                autoComplete="HD0"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD1"
                                fullWidth
                                autoComplete="HD1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD1"
                                fullWidth
                                autoComplete="HD1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD2"
                                fullWidth
                                autoComplete="HD2"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD3"
                                fullWidth
                                autoComplete="HD3"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD4"
                                fullWidth
                                autoComplete="HD4"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD5"
                                fullWidth
                                autoComplete="HD5"
                            />
                        </Grid>
                    </Grid>
                    <Divider />


                    <Grid container className={classes.margin} spacing={3}>
                        <InputLabel style={{ width: "100%" }}> Overruns: </InputLabel>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD0"
                                fullWidth
                                autoComplete="HD0"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD1"
                                fullWidth
                                autoComplete="HD1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD1"
                                fullWidth
                                autoComplete="HD1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD2"
                                fullWidth
                                autoComplete="HD2"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD3"
                                fullWidth
                                autoComplete="HD3"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD4"
                                fullWidth
                                autoComplete="HD4"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required

                                label="HD5"
                                fullWidth
                                autoComplete="HD5"
                            />
                        </Grid>
                    </Grid>
                    <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="contained" color="primary">
                        Save
      </Button>



                </React.Fragment>
            </TabPanel >
            <TabPanel value={value} index={1}>
                Test
      </TabPanel>


        </div >
    );
}