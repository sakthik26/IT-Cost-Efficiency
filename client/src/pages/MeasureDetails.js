import React from 'react';
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router';

import axios from 'axios';
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
import PropTypes, { element } from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';
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

export default function MeasureDetails(props) {
    const history = useHistory();
    const classes = useStyles();
    const [measureName, setMeasureName] = React.useState('');
    const [additionalCharges, setAdditionalCharges] = React.useState('');


    const [savingsHD0, setSavingsHD0] = React.useState(0);
    const [savingsHD1, setSavingsHD1] = React.useState(0);
    const [savingsHD2, setSavingsHD2] = React.useState(0);
    const [savingsHD3, setSavingsHD3] = React.useState(0);
    const [savingsHD4, setSavingsHD4] = React.useState(0);
    const [savingsHD5, setSavingsHD5] = React.useState(0);


    const [overrunsHD0, setOverrunsHD0] = React.useState(0);
    const [overrunsHD1, setOverrunsHD1] = React.useState(0);
    const [overrunsHD2, setOverrunsHD2] = React.useState(0);
    const [overrunsHD3, setOverrunsHD3] = React.useState(0);
    const [overrunsHD4, setOverrunsHD4] = React.useState(0);
    const [overrunsHD5, setOverrunsHD5] = React.useState(0);

    const [measureDescription, setMeasureDescription] = React.useState('');
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

    const [isSustainable, setSustainability] = React.useState(true);
    const sustainabilityValues = ["true", "false"]
    const handleSustainabilityChange = (event) => {
        if (event.target.value == "true")
            setSustainability(true);
        else
            setSustainability(false)
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
    useEffect(() => {
        if (props.match.params && props.match.params.id) {

            var id = props.match.params.id

            async function fetchData() {
                const res = await fetch("http://localhost:4000/measuredetails/" + id);
                res
                    .json()
                    .then(response => {
                        var measureDetail = response[0]
                        setMeasureName(measureDetail.measure)
                        setMeasureDescription(measureDetail.description)
                        setCurrency(measureDetail.currency)
                        setLever(measureDetail.lever)
                        setArea(measureDetail.area)
                        setHdValue(measureDetail.currentHGValue)
                        setSustainability(measureDetail.sustainable)
                        setValidFrom(measureDetail.validFrom)
                        setValidTo(measureDetail.validTo)
                        setHd0(measureDetail.HD0)
                        setHd1(measureDetail.HD1)
                        setHd2(measureDetail.HD2)
                        setHd3(measureDetail.HD3)
                        setHd4(measureDetail.HD4)
                        setHd5(measureDetail.HD5)
                        setSavingsHD0(measureDetail.savingsPotential[0]["HD0"])
                        setSavingsHD1(measureDetail.savingsPotential[0]["HD1"])
                        setSavingsHD2(measureDetail.savingsPotential[0]["HD2"])
                        setSavingsHD3(measureDetail.savingsPotential[0]["HD3"])
                        setSavingsHD4(measureDetail.savingsPotential[0]["HD4"])
                        setSavingsHD5(measureDetail.savingsPotential[0]["HD5"])
                        setOverrunsHD0(measureDetail.overruns[0]["HD0"])
                        setOverrunsHD1(measureDetail.overruns[0]["HD1"])
                        setOverrunsHD2(measureDetail.overruns[0]["HD2"])
                        setOverrunsHD3(measureDetail.overruns[0]["HD3"])
                        setOverrunsHD4(measureDetail.overruns[0]["HD4"])
                        setOverrunsHD5(measureDetail.overruns[0]["HD5"])
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            }

            fetchData();

        }
    }, props)


    const handleMeasureDetailUpdate = (id) => {

        var payload = {
            measure: measureName,
            description: measureDescription,
            currency: currency,
            lever: lever,
            area: area,
            currentHGValue: hdValue,
            sustainable: isSustainable,
            validFrom: new Date(validFrom).getFullYear() + "-" + new Date(validFrom).getMonth() + "-" + new Date(validFrom).getDate(),
            validTo: new Date(validTo).getFullYear() + "-" + new Date(validTo).getMonth() + "-" + new Date(validTo).getDate(),
            HD0: new Date(hd0).getFullYear() + "-" + new Date(hd0).getMonth() + "-" + new Date(hd0).getDate(),
            HD1: new Date(hd1).getFullYear() + "-" + new Date(hd1).getMonth() + "-" + new Date(hd1).getDate(),
            HD2: new Date(hd2).getFullYear() + "-" + new Date(hd2).getMonth() + "-" + new Date(hd2).getDate(),
            HD3: new Date(hd3).getFullYear() + "-" + new Date(hd3).getMonth() + "-" + new Date(hd3).getDate(),
            HD4: new Date(hd4).getFullYear() + "-" + new Date(hd4).getMonth() + "-" + new Date(hd4).getDate(),
            HD5: new Date(hd5).getFullYear() + "-" + new Date(hd5).getMonth() + "-" + new Date(hd5).getDate(),
            additionalCharges: additionalCharges,
            savingsPotential: [
                {
                    HD0: savingsHD0,
                    HD1: savingsHD1,
                    HD2: savingsHD2,
                    HD3: savingsHD3,
                    HD4: savingsHD4,
                    HD5: savingsHD5,
                }
            ],
            overruns: [
                {
                    HD0: overrunsHD0,
                    HD1: overrunsHD1,
                    HD2: overrunsHD2,
                    HD3: overrunsHD3,
                    HD4: overrunsHD4,
                    HD5: overrunsHD5,
                }
            ]
        }
        axios
            .put("http://localhost:4000/measuredetails/" + id, payload, {
            })
            .then((response) => {
                history.push('/measures')
            })
            .catch(function (e) {
                console.log(e);
            });
    }

    const handleMeasureDetailSave = (event) => {

        var payload = {
            measure: measureName,
            description: measureDescription,
            currency: currency,
            lever: lever,
            area: area,
            currentHGValue: hdValue,
            sustainable: isSustainable,
            validFrom: validFrom.getFullYear() + "-" + validFrom.getMonth() + "-" + validFrom.getDate(),
            validTo: validTo.getFullYear() + "-" + validTo.getMonth() + "-" + validTo.getDate(),
            HD0: hd0.getFullYear() + "-" + hd0.getMonth() + "-" + hd0.getDate(),
            HD1: hd1.getFullYear() + "-" + hd1.getMonth() + "-" + hd1.getDate(),
            HD2: hd2.getFullYear() + "-" + hd2.getMonth() + "-" + hd2.getDate(),
            HD3: hd3.getFullYear() + "-" + hd3.getMonth() + "-" + hd3.getDate(),
            HD4: hd4.getFullYear() + "-" + hd4.getMonth() + "-" + hd4.getDate(),
            HD5: hd5.getFullYear() + "-" + hd5.getMonth() + "-" + hd5.getDate(),
            additionalCharges: additionalCharges,
            savingsPotential: [
                {
                    HD0: savingsHD0,
                    HD1: savingsHD1,
                    HD2: savingsHD2,
                    HD3: savingsHD3,
                    HD4: savingsHD4,
                    HD5: savingsHD5,
                }
            ],
            overruns: [
                {
                    HD0: overrunsHD0,
                    HD1: overrunsHD1,
                    HD2: overrunsHD2,
                    HD3: overrunsHD3,
                    HD4: overrunsHD4,
                    HD5: overrunsHD5,
                }
            ]
        }
        axios
            .post("http://localhost:4000/measuredetails?customer=" + localStorage.getItem('customerId'), payload, {
            })
            .then((response) => {
                history.push('/measures')
            })
            .catch(function (e) {
                console.log(e);
            });
    }

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
                                value={measureName}
                                onChange={e => setMeasureName(e.target.value)}
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
                                value={measureDescription}
                                label="Measure Description"
                                onChange={e => setMeasureDescription(e.target.value)}
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
                                value={additionalCharges}
                                label="Overruns or Additional Charges"
                                fullWidth
                                onChange={e => setAdditionalCharges(e.target.value)}
                                autoComplete="Overruns or Additional Charges"
                            />
                        </Grid>
                        <InputLabel style={{ width: "100%" }}> Savings potential: </InputLabel>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                onChange={e => setSavingsHD0(parseInt(e.target.value))}
                                label="HD0" value={savingsHD0}
                                fullWidth
                                autoComplete="HD0"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={savingsHD1}
                                onChange={e => setSavingsHD1(parseInt(e.target.value))}
                                label="HD1"
                                fullWidth
                                autoComplete="HD1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={savingsHD2}
                                onChange={e => setSavingsHD2(parseInt(e.target.value))}
                                label="HD2"
                                fullWidth
                                autoComplete="HD2"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={savingsHD3}
                                onChange={e => setSavingsHD3(parseInt(e.target.value))}
                                label="HD3"
                                fullWidth
                                autoComplete="HD3"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={savingsHD4}
                                onChange={e => setSavingsHD4(parseInt(e.target.value))}
                                label="HD4"
                                fullWidth
                                autoComplete="HD4"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                onChange={e => setSavingsHD5(parseInt(e.target.value))}
                                value={savingsHD5}
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
                                onChange={e => setOverrunsHD0(parseInt(e.target.value))}
                                label="HD0"
                                value={overrunsHD0}
                                fullWidth
                                autoComplete="HD0"
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                onChange={e => setOverrunsHD1(parseInt(e.target.value))}
                                label="HD1"
                                value={overrunsHD1}
                                fullWidth
                                autoComplete="HD1"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                onChange={e => setOverrunsHD2(parseInt(e.target.value))}
                                label="HD2"
                                value={overrunsHD2}
                                fullWidth
                                autoComplete="HD2"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={overrunsHD3}
                                onChange={e => setOverrunsHD3(parseInt(e.target.value))}
                                label="HD3"
                                fullWidth
                                autoComplete="HD3"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={overrunsHD4}
                                onChange={e => setOverrunsHD4(parseInt(e.target.value))}
                                label="HD4"
                                fullWidth
                                autoComplete="HD4"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                value={overrunsHD5}
                                onChange={e => setOverrunsHD5(parseInt(e.target.value))}
                                label="HD5"
                                fullWidth
                                autoComplete="HD5"
                            />
                        </Grid>
                    </Grid>

                    {props.match && props.match.params && props.match.params.id ?
                        <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="contained" color="primary" onClick={() => { handleMeasureDetailUpdate(props.match.params.id) }}>
                            Update
     </Button> :
                        <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="contained" color="primary" onClick={handleMeasureDetailSave}>
                            Save
      </Button>}




                </React.Fragment>
            </TabPanel >
            <TabPanel value={value} index={1}>
                Test
      </TabPanel>


        </div >
    );
}