import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
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

//simple dialog imports - end
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    customer: {
        margin: 20
    },
    table: {
        minWidth: 650,
    },
    chart: {
        marginTop: 100,
        width: '1000px !important',
        height: '600px !important',
    },
}));

function Settings() {
    const [initialChartState, setInitialChartState] = React.useState(true);
    const [date, setDate] = React.useState({ key: Date.now() });


    const [cState, setCState] = React.useState({
        labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [{
            label: 'HD0',
            backgroundColor: "#747474",
            data: []
        }, {
            label: 'HD1',
            backgroundColor: "#ba962b",
            data: []
        }, {
            label: 'HD2',
            backgroundColor: "#dfd937",
            data: []
        }, {
            label: 'HD3',
            backgroundColor: "#02bb71",
            data: []
        },
        {
            label: 'HD4',
            backgroundColor: "#518a59",
            data: []
        },
        {
            label: 'HD5',
            backgroundColor: "#178b15",
            data: []
        }]
    })

    const [baselineTotalCostColumns, setBaselineTotalCostColumns] = React.useState(
        [
            { title: 'Overall', field: 'overall' },
            { title: '2020(€)', field: '2020', sorting: true },
            { title: '2021(€)', field: '2021' },
            { title: '2022(€)', field: '2022' },
            { title: '2023(€)', field: '2023' },
            { title: '2024(€)', field: '2024' },
        ]);
    const [baselineColumns, setBaselineColumns] = React.useState(
        [
            { title: 'Cost Type', field: 'costType' },
            {
                title: 'Sphere of Action',
                field: 'sphereOfAction',
                lookup: { '': '', 'infrastructure': 'Infrastructure', 'applications': 'Applications', 'partner': 'Partner', 'staff': 'Staff' },
            },
            { title: '2020(€)', field: '2020', sorting: true },
            { title: '2021(€)', field: '2021' },
            { title: '2022(€)', field: '2022' },
            { title: '2023(€)', field: '2023' },
            { title: '2024(€)', field: '2024' },
        ]);

    const [savingsColumns, setSavingsColumns] = React.useState(
        [
            { title: 'Cost Type', field: 'costType' },
            {
                title: 'Sphere of Action',
                field: 'sphereOfAction',
                lookup: { '': '', 'infrastructure': 'Infrastructure', 'applications': 'Applications', 'partner': 'Partner', 'staff': 'Staff' },
            },
            { title: '2020(€)', field: '2020', sorting: true },
            { title: '2021(€)', field: '2021' },
            { title: '2022(€)', field: '2022' },
            { title: '2023(€)', field: '2023' },
            { title: '2024(€)', field: '2024' },
        ])

    const [rows, setRows] = React.useState([]);
    const [savingsCostTypeRows, setSavingsCostTypeRows] = React.useState([]);
    const [baselineTotalCostRows, setBaselineTotalCostRows] = React.useState([{ 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }]);
    const [isAdmin, setAdmin] = React.useState(false);
    const [customers, setCustomers] = React.useState('');
    const [customerOptions, setCustomerOptions] = React.useState([]);
    const [consultant, setConsultant] = React.useState('');
    const [consultantOptions, setConsultantOptions] = React.useState([]);


    const [customersAssigned, setCustomersAssigned] = React.useState([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState('');
    const [consultantAccess, setConsultantAccess] = React.useState([]);

    const [customerName, setCustomerName] = React.useState('');
    const [customerDepartment, setCustomerDepartment] = React.useState('');
    const handleCustomerChange = (event) => {
        setCustomers(event.target.value);
    };

    const handleCustomerToDeleteChange = (event) => {
        setCustomerToDelete(event.target.value);
    };
    const handleConsultantToDeleteChange = (event) => {
        setConsultantToDelete(event.target.value);
    };

    const handleConsultantToDeactivateChange = (event) => {
        setConsultantToDeactivate(event.target.value);
    };
    const handleConsultantChange = (event) => {
        setConsultant(event.target.value);
    };

    const changeCustomerSelected = (event) => {
        setSelectedCustomer(event.target.value)
        localStorage.setItem('customerId', event.target.value)
        fetch('http://localhost:4000/measures?id=' + localStorage.getItem('id') + '&customer=' + localStorage.getItem('customerId'), {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setRows(data);
            })
            .catch(error => console.log(error));

    }

    const handleConsultant = (event) => {

        // if (consultantAccess.map(consultant => consultant.email).indexOf(consultant) >= 0) {
        //   alert('Consultant already assigned to the customer')
        // }

        for (var i = 0; i < consultantAccess.length; i++) {
            if (consultantAccess[i].email == consultant && consultantAccess[i].customer == customers) {
                alert('Consultant already assigned to the customer')
                return
            }
        }
        let payload = {
            customer: customers,
            email: consultant,
            permission: "root",
            permission_level: "1"
        }

        console.log(consultantAccess)

        axios
            .post("http://localhost:4000/userrights", payload, {
            })
            .then((response) => {
                setConsultantAccess(consultantAccess => [...consultantAccess, response.data]);

            })
            .catch(function (e) {
                console.log(e);
            });
    }
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const logOut = (event, reason) => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('customerId')
        window.location.href = '/signin'
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleDelete = (email) => {

        axios
            .delete("http://localhost:4000/userrights/" + email, {
            })
            .then((response) => {
                let consultants = consultantAccess.filter(consultant => consultant.email != email)
                setConsultantAccess(consultants)
            })
            .catch(function (e) {
                console.log(e);
            });
    };


    useEffect(() => {
        // const result = await axios.get(
        //   'http://localhost:4000/measures',
        // );



        axios
            .get("http://localhost:4000/measuredetails" + '?customer=' + localStorage.getItem('customerId'), {
            })
            .then((response) => {
                console.log('Response here' + response.data)
                var year = { '2020': { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 }, '2021': { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 }, '2022': { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 }, '2023': { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 }, '2024': { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 } }
                var hdLevel = ['HD0', 'HD1', 'HD2', 'HD3', 'HD4', 'HD5']
                var savingsPotential = { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 }
                for (var i = 0; i < response.data.length; i++) {
                    for (var k in year) {
                        for (var m = 0; m < hdLevel.length; m++) {
                            if (new Date(response.data[i][hdLevel[m]]).getFullYear() == k) {
                                savingsPotential[hdLevel[m]] += response.data[i].savingsPotential[0][hdLevel[m]]

                            }
                        }
                        for (var h = 0; h < hdLevel.length; h++) {
                            year[k][hdLevel[h]] += savingsPotential[hdLevel[h]]
                        }

                        savingsPotential = { 'HD0': 0, 'HD1': 0, 'HD2': 0, 'HD3': 0, 'HD4': 0, 'HD5': 0 }
                    }

                }
                console.log(year)
                var arr = []
                // for (var y = 0; y < hdLevel.length; year++) {
                //     for (var i in year) {
                //         arr.push(year[i][hdLevel[y]])
                //     }
                // }
                for (var j = 0; j < hdLevel.length; j++) {
                    for (var i in year) {
                        arr.push(year[i][hdLevel[j]])
                    }
                    cState.datasets[j].data = arr
                    arr = []
                }
                console.log(arr)
                // cState.datasets[0].data = [112, 0, 0, 0, 0]
                // cState.datasets[1].data = [100, 0, 0, 0, 0]
                setDate({ key: Date.now() })

                setInitialChartState(false)
            })
            .catch(function (e) {
                console.log(e);
            });

        axios
            .get("http://localhost:4000/api/users ", {
            })
            .then((response) => {
                setConsultantOptions(response.data.filter((consultant) => consultant.email != "admin@gmail.com").map((consultant) => consultant.email));

            })
            .catch(function (e) {
                console.log(e);
            });

        axios
            .get("http://localhost:4000/userrights", {
            })
            .then((response) => {
                // setCustomerOptions(response.data.map((customer) => customer.customer));
                // var customers = {}
                // for (var i = 0; i < response.data.length; i++) {
                //   customers[response.data[i].customer] = []
                // }
                setConsultantAccess(response.data)
                setCustomersAssigned(response.data.filter((consultant) => consultant.email == localStorage.getItem('emailId')))

                setSelectedCustomer(response.data.filter((consultant) => consultant.email == localStorage.getItem('emailId'))[0].customerId)
            })
            .catch(function (e) {
                console.log(e);
            });
    }, []); const classes = useStyles();


    const [createCustomerDialog, showCreateCustomerDialog] = React.useState(false);
    const [deleteCustomerDialog, showDeleteCustomerDialog] = React.useState(false);
    const [deleteConsultantDialog, showDeleteConsultantDialog] = React.useState(false);
    const [deactivateConsultantDialog, showDeactivateConsultantDialog] = React.useState(false);
    const [customerToDelete, setCustomerToDelete] = React.useState('');
    const [consultantToDelete, setConsultantToDelete] = React.useState('');
    const [consultantToDeactivate, setConsultantToDeactivate] = React.useState('');

    const handleCreateCustomerOpen = () => {
        showCreateCustomerDialog(true);
    };

    const handleCreateCustomerClose = () => {
        showCreateCustomerDialog(false);
    };

    const handleDeleteCustomerOpen = () => {
        showDeleteCustomerDialog(true);
    };

    const handleDeleteCustomerClose = () => {
        showDeleteCustomerDialog(false);
    };

    const handleDeleteConsultantOpen = () => {
        showDeleteConsultantDialog(true);
    };

    const handleDeleteConsultantClose = () => {
        showDeleteConsultantDialog(false);
    };

    const handleDeactivateConsultantOpen = () => {
        showDeactivateConsultantDialog(true);
    };

    const handleDeactivateConsultantClose = () => {
        showDeactivateConsultantDialog(false);
    };

    const handleCreateCustomer = () => {
        var payload = {
            customer: customerName,
            department: customerDepartment
        }
        axios
            .post("http://localhost:4000/customers", payload, {
            })
            .then((response) => {
                setCustomerOptions(customer => [...customer, response.data.customer]);
                showCreateCustomerDialog(false);
            })
            .catch(function (e) {
                console.log(e);
            });
    }

    const handleDeleteCustomer = (customerToDelete) => {

        axios
            .delete("http://localhost:4000/customers/" + customerToDelete, {
            })
            .then((response) => {
                let customers = customerOptions.filter(customer => customer != customerToDelete)
                setCustomerOptions(customers)
                handleDeleteCustomerClose()
                window.location.href = "/measures"
            })
            .catch(function (e) {
                console.log(e);
            });
    }
    const handleDeleteConsultant = (consultantToDelete) => {

        axios
            .delete("http://localhost:4000/api/users/" + consultantToDelete, {
            })
            .then((response) => {
                let consultants = consultantOptions.filter(consultant => consultant != consultantToDelete)
                setConsultantOptions(consultants)
                handleDeleteConsultantClose()

            })
            .catch(function (e) {
                console.log(e);
            });
    }
    const handleDeactivateConsultant = (consultantToDeactivate) => {

        axios
            .put("http://localhost:4000/api/users/" + consultantToDeactivate, {
                "email": consultantToDeactivate, "isActive": false
            })
            .then((response) => {

                handleDeactivateConsultantClose()
                alert('Consultant has been deactivated')
            })
            .catch(function (e) {
                console.log(e);
            });
    }

    const handleBaselineColumns = (event) => {
        setBaselineColumns(columns => [...columns, { title: '2025', field: '2025' },
        { title: '2026', field: '2026' },
        { title: '2027', field: '2027' },
        { title: '2028', field: '2029' },
        { title: '2029', field: '2029' }]);
    }

    const handleBaselineTotalCostRows = (event) => {
        setBaselineTotalCostColumns(columns => [...columns, { title: '2025', field: '2025' },
        { title: '2026', field: '2026' },
        { title: '2027', field: '2027' },
        { title: '2028', field: '2029' },
        { title: '2029', field: '2029' }]);
    }

    const handleSavingsColumns = (event) => {
        setSavingsColumns(columns => [...columns, { title: '2025', field: '2025' },
        { title: '2026', field: '2026' },
        { title: '2027', field: '2027' },
        { title: '2028', field: '2029' },
        { title: '2029', field: '2029' }]);
    }

    const changeCustomerName = (e) => {
        setCustomerName(e.target.value)
    }

    const changeCustomerDepartment = (e) => {
        setCustomerDepartment(e.target.value)
    }
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
                    {/* <Button color="inherit" onClick={() => { window.location.href = '/signup'; }}>Login</Button> */}
                    <Button color="inherit" onClick={logOut}>Logout</Button>
                </Toolbar>

            </AppBar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please enter values for all the fields
        </Alert>
            </Snackbar>
            <div className={classes.chart}>
                <Bar
                    redraw
                    data={cState}
                    options={{
                        tooltips: {
                            displayColors: true,
                            callbacks: {
                                mode: 'x',
                            },
                        },
                        scales: {
                            xAxes: [{
                                barPercentage: 0.7,
                                stacked: true,
                                gridLines: {
                                    display: false,
                                }
                            }],
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                },
                                type: 'linear',
                            }]
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: { position: 'bottom' },
                    }}
                />
            </div>
        </div>
    );
}

export default Settings;
