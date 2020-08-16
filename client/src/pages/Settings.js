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


// simple dialog imports

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

//simple dialog imports - end
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
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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
}));

function Settings() {
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
        if (!localStorage.getItem('id')) {
            window.location.href = "/signin"
            return
        }
        if (localStorage.getItem('emailId') && localStorage.getItem('emailId') === 'admin@gmail.com') {
            setAdmin(true)
        }
        fetch('http://localhost:4000/baseline?customer=' + localStorage.getItem('customerId'), {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                // const [rows, setRows] = React.useState([{ costType: 'LAN', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Print', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Cables', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }]);
                var baselineRows = {}
                var baselineData = []
                for (var i = 0; i < data.length; i++) {

                    baselineRows[data[i].year] = data[i].totalCost
                }
                console.log(baselineRows)

                baselineData.push(baselineRows)

                //console.log(costTypeData)
                setBaselineTotalCostRows(baselineData);
                // console.log(data)
                // setRows(data);
            })
            .catch(error => console.log(error));
        fetch('http://localhost:4000/costtype?customer=' + localStorage.getItem('customerId') + '&type=baseline', {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {


                // const [rows, setRows] = React.useState([{ costType: 'LAN', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Print', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Cables', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }]);
                // var costTypes = {}
                var costTypeData = []
                for (var i = 0; i < data.length; i++) {
                    var costType = {}
                    for (var j = 0; j < data[i].costTypeYear.length; j++) {
                        costType[data[i].costTypeYear[j]['year']] = data[i].costTypeYear[j]['amount']
                    }
                    costType.costType = data[i].costType
                    costType.sphereOfAction = data[i].sphereOfAction
                    costTypeData.push(costType)
                }
                // if (costTypes[data[i].costType]) {
                //     costTypes[data[i].costType][data[i].costTypeYear] = data[i].amount
                // }
                // else {
                //     costTypes[data[i].costType] = {}
                //     costTypes[data[i].costType][data[i].costTypeYear] = data[i].amount
                // }
                //}

                // for (var i in costTypes) {
                //     costTypes[i]['costType'] = i
                //     costTypeData.push(costTypes[i])
                // }
                // console.log(costTypeData)
                setRows(costTypeData);
                // console.log(data)
                // setRows(data);
            })
            .catch(error => console.log(error));

        fetch('http://localhost:4000/costtype?customer=' + localStorage.getItem('customerId') + '&type=savings', {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {


                // const [rows, setRows] = React.useState([{ costType: 'LAN', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Print', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Cables', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }]);
                // var costTypes = {}
                var costTypeData = []
                for (var i = 0; i < data.length; i++) {
                    var costType = {}
                    for (var j = 0; j < data[i].costTypeYear.length; j++) {
                        costType[data[i].costTypeYear[j]['year']] = data[i].costTypeYear[j]['amount']
                    }
                    costType.costType = data[i].costType
                    costType.sphereOfAction = data[i].sphereOfAction
                    costTypeData.push(costType)
                }

                // if (costTypes[data[i].costType]) {
                //     costTypes[data[i].costType][data[i].costTypeYear] = data[i].amount
                // }
                // else {
                //     costTypes[data[i].costType] = {}
                //     costTypes[data[i].costType][data[i].costTypeYear] = data[i].amount
                // }
                //}

                // for (var i in costTypes) {
                //     costTypes[i]['costType'] = i
                //     costTypeData.push(costTypes[i])
                // }
                // console.log(costTypeData)
                setSavingsCostTypeRows(costTypeData);
                // console.log(data)
                // setRows(data);
            })
            .catch(error => console.log(error));


        axios
            .get("http://localhost:4000/customers", {
            })
            .then((response) => {
                setCustomerOptions(response.data.map((customer) => customer.customer));
                // var customers = {}
                // for (var i = 0; i < response.data.length; i++) {
                //   customers[response.data[i].customer] = []
                // }
                // setConsultantAccess(customers)
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

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please enter values for all the fields
        </Alert>
            </Snackbar>
            {rows.length > 0 && localStorage.getItem('isActive') == "true" ?
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCustomer}
                            onChange={changeCustomerSelected}
                        >
                            {customersAssigned.map(item =>
                                <MenuItem
                                    value={item.customerId}
                                >
                                    {item.customer}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Typography style={{ marginLeft: "20px" }}>
                        <h2> Targets & Baseline </h2>
                    </Typography>

                    <Typography style={{ marginLeft: "20px" }}>
                        <h2> Cost Baseline</h2>
                    </Typography>
                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleBaselineTotalCostRows}>
                        +  Add Columns
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        title="Total IT Cost"
                        columns={baselineTotalCostColumns}
                        options={{
                            paging: false,
                            search: false,
                        }}
                        data={baselineTotalCostRows}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        newData.customerId = localStorage.getItem('customerId') + ''
                                        resolve();
                                        axios
                                            .put("http://localhost:4000/measures/" + oldData.measureId, newData, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            .then((response) => {
                                                setRows(prevState => {
                                                    const data = [...prevState];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })

                                }),

                        }}
                    />

                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleBaselineColumns}>
                        +  Add Columns
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        title="Baseline Cost Types"
                        columns={baselineColumns}
                        data={rows}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    // if (Object.keys(newData).length < 8) {
                                    //     setOpen(true);
                                    //     reject()
                                    // }
                                    // else {
                                    setTimeout(() => {
                                        console.log(newData)
                                        var costTypeYearAmount = {}
                                        var costTypeYearAmountData = []
                                        var costTypePayload = {}
                                        costTypePayload.customerId = localStorage.getItem('customerId') + ''
                                        costTypePayload.costTypeGroup = 'printingforexecutives'
                                        costTypePayload.costType = newData.costType
                                        costTypePayload.type = 'baseline'
                                        costTypePayload.sphereOfAction = newData.sphereOfAction
                                        delete (newData.costType)
                                        delete (newData.sphereOfAction)
                                        for (var i in newData) {
                                            costTypeYearAmount = {}
                                            costTypeYearAmount['year'] = parseInt(i)
                                            costTypeYearAmount['amount'] = parseInt(newData[i])
                                            costTypeYearAmountData.push(costTypeYearAmount)
                                        }
                                        costTypePayload.costTypeYear = costTypeYearAmountData
                                        //console.log(costTypePayload)
                                        resolve();
                                        axios
                                            .post("http://localhost:4000/costtype/", costTypePayload, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            //{ costType: 'LAN', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }
                                            .then((response) => {
                                                setRows(prevState => {
                                                    const data = [...prevState];
                                                    var costType = {}


                                                    for (var j = 0; j < response.data.costTypeYear.length; j++) {
                                                        costType[response.data.costTypeYear[j]['year']] = response.data.costTypeYear[j]['amount']
                                                    }
                                                    costType.costType = response.data.costType
                                                    costType.sphereOfAction = response.data.sphereOfAction

                                                    // console.log(response.data)
                                                    data.push(costType);
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })
                                    // }
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {

                                    setTimeout(() => {
                                        var costTypeYearAmount = {}
                                        var costTypeYearAmountData = []


                                        var newCostTypeData = JSON.parse(JSON.stringify(newData))
                                        var payload = {}
                                        payload.costType = newCostTypeData.costType
                                        delete (newCostTypeData.customerId)
                                        delete (newCostTypeData.costType)
                                        delete (newCostTypeData.sphereOfAction)
                                        for (var i in newCostTypeData) {
                                            costTypeYearAmount = {}
                                            costTypeYearAmount['year'] = parseInt(i)
                                            costTypeYearAmount['amount'] = parseInt(newCostTypeData[i])
                                            costTypeYearAmountData.push(costTypeYearAmount)
                                        }
                                        payload.costTypeYear = costTypeYearAmountData
                                        payload.sphereOfAction = newData.sphereOfAction
                                        // newData.customerId = localStorage.getItem('customerId') + ''
                                        resolve();
                                        axios
                                            .put('http://localhost:4000/costtype?customer=' + localStorage.getItem('customerId') + '&type=baseline', payload, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            .then((response) => {
                                                setRows(prevState => {
                                                    const data = [...prevState];
                                                    console.log('data' + data)
                                                    console.log(newData)

                                                    data[data.indexOf(oldData)] = newData;
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })

                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        console.log(oldData)
                                        axios
                                            .delete('http://localhost:4000/costtype?customer=' + localStorage.getItem('customerId') + '&type=baseline&costtype=' + oldData.costType, {
                                            })
                                            .then((response) => {
                                                setRows(prevState => {
                                                    const data = [...prevState];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })
                                }),
                        }}
                    />

                    {/* total cost here */}
                    <Typography style={{ marginLeft: "20px" }}>
                        <h2> Saving Targets</h2>
                    </Typography>
                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleBaselineTotalCostRows}>
                        +  Add Columns
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        title="Total IT Cost"
                        columns={baselineTotalCostColumns}
                        options={{
                            paging: false,
                            search: false,
                        }}
                        data={baselineTotalCostRows}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        newData.customerId = localStorage.getItem('customerId') + ''
                                        resolve();
                                        axios
                                            .put("http://localhost:4000/measures/" + oldData.measureId, newData, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            .then((response) => {
                                                setRows(prevState => {
                                                    const data = [...prevState];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })

                                }),

                        }}
                    />






                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleBaselineColumns}>
                        +  Add Columns
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        title="Saving Cost Types"
                        columns={savingsColumns}
                        data={savingsCostTypeRows}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    // if (Object.keys(newData).length < 8) {
                                    //     setOpen(true);
                                    //     reject()
                                    // }
                                    // else {
                                    setTimeout(() => {
                                        console.log(newData)
                                        var costTypeYearAmount = {}
                                        var costTypeYearAmountData = []
                                        var costTypePayload = {}
                                        costTypePayload.customerId = localStorage.getItem('customerId') + ''
                                        costTypePayload.costTypeGroup = 'printingforexecutives'
                                        costTypePayload.costType = newData.costType
                                        costTypePayload.type = 'savings'
                                        costTypePayload.sphereOfAction = newData.sphereOfAction
                                        delete (newData.costType)
                                        delete (newData.sphereOfAction)
                                        console.log('spa- ' + newData.sphereOfAction)
                                        for (var i in newData) {
                                            costTypeYearAmount = {}
                                            costTypeYearAmount['year'] = parseInt(i)
                                            costTypeYearAmount['amount'] = parseInt(newData[i])
                                            costTypeYearAmountData.push(costTypeYearAmount)
                                        }
                                        costTypePayload.costTypeYear = costTypeYearAmountData
                                        //console.log(costTypePayload)
                                        resolve();
                                        axios
                                            .post("http://localhost:4000/costtype/", costTypePayload, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            //{ costType: 'LAN', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }
                                            .then((response) => {
                                                setSavingsCostTypeRows(prevState => {
                                                    const data = [...prevState];
                                                    var costType = {}


                                                    for (var j = 0; j < response.data.costTypeYear.length; j++) {
                                                        costType[response.data.costTypeYear[j]['year']] = response.data.costTypeYear[j]['amount']
                                                    }
                                                    costType.costType = response.data.costType
                                                    costType.sphereOfAction = response.data.sphereOfAction

                                                    // console.log(response.data)
                                                    data.push(costType);
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })
                                    // }
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {

                                    setTimeout(() => {
                                        var costTypeYearAmount = {}
                                        var costTypeYearAmountData = []


                                        var newCostTypeData = JSON.parse(JSON.stringify(newData))
                                        var payload = {}
                                        payload.costType = newCostTypeData.costType
                                        delete (newCostTypeData.customerId)
                                        delete (newCostTypeData.costType)
                                        delete (newCostTypeData.sphereOfAction)
                                        console.log(newCostTypeData)
                                        for (var i in newCostTypeData) {
                                            costTypeYearAmount = {}
                                            costTypeYearAmount['year'] = parseInt(i)
                                            costTypeYearAmount['amount'] = parseInt(newCostTypeData[i])
                                            costTypeYearAmountData.push(costTypeYearAmount)
                                        }
                                        payload.costTypeYear = costTypeYearAmountData
                                        payload.sphereOfAction = newData.sphereOfAction
                                        // newData.customerId = localStorage.getItem('customerId') + ''
                                        resolve();
                                        axios
                                            .put('http://localhost:4000/costtype?customer=' + localStorage.getItem('customerId') + '&type=savings', payload, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            .then((response) => {
                                                setSavingsCostTypeRows(prevState => {
                                                    const data = [...prevState];
                                                    console.log('data' + data)
                                                    console.log(newData)

                                                    data[data.indexOf(oldData)] = newData;
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })

                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        console.log(oldData)
                                        axios
                                            .delete('http://localhost:4000/costtype?customer=' + localStorage.getItem('customerId') + '&type=savings&costtype=' + oldData.costType, {
                                            })
                                            .then((response) => {
                                                setSavingsCostTypeRows(prevState => {
                                                    const data = [...prevState];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return data;
                                                })
                                            })
                                            .catch(function (e) {
                                                console.log(e);
                                            }, 600);
                                    })
                                }),
                        }}
                    />
                </div>
                : isAdmin == false ? <Typography variant="h6" className={classes.title}>
                    You have not been assigned customers at the moment, please contact your administrator.
          </Typography>
                    :
                    <div>
                        <div>
                            <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleCreateCustomerOpen}>
                                Create Customer
      </Button>
                            <Dialog open={createCustomerDialog} onClose={handleCreateCustomerClose} aria-labelledby="form-dialog-title">

                                <DialogTitle id="form-dialog-title">Create</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please enter the customer details
          </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        onChange={changeCustomerName}
                                        label="Customer Name"
                                        value={customerName}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        onChange={changeCustomerDepartment}
                                        value={customerDepartment}
                                        label="Department"
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCreateCustomerClose} color="primary">
                                        Cancel
          </Button>
                                    <Button onClick={handleCreateCustomer} color="primary">
                                        Create
          </Button>
                                </DialogActions>
                            </Dialog>


                            <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleDeleteCustomerOpen}>
                                Delete Customer
      </Button>
                            <Dialog open={deleteCustomerDialog} onClose={handleDeleteCustomerClose} aria-labelledby="form-dialog-title">

                                <DialogTitle id="form-dialog-title">Delete Customer</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please select the customer to delete
          </DialogContentText>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={customerToDelete}
                                            onChange={handleCustomerToDeleteChange}
                                        >
                                            {customerOptions.map(item => (
                                                <MenuItem
                                                    value={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeleteCustomerClose} color="primary">
                                        Cancel
          </Button>
                                    <Button onClick={() => { handleDeleteCustomer(customerToDelete) }} color="primary">
                                        Delete
          </Button>
                                </DialogActions>
                            </Dialog>


                            <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleDeleteConsultantOpen}>
                                Delete Consultant
            </Button>
                            <Dialog open={deleteConsultantDialog} onClose={handleDeleteConsultantClose} aria-labelledby="form-dialog-title">

                                <DialogTitle id="form-dialog-title">Delete Consultant</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please select the consultant to delete
          </DialogContentText>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Consultant</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={consultantToDelete}
                                            onChange={handleConsultantToDeleteChange}
                                        >
                                            {consultantOptions.map(item => (
                                                <MenuItem
                                                    value={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeleteConsultantClose} color="primary">
                                        Cancel
          </Button>
                                    <Button onClick={() => { handleDeleteConsultant(consultantToDelete) }} color="primary">
                                        Delete
          </Button>
                                </DialogActions>
                            </Dialog>

                            <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleDeactivateConsultantOpen}>
                                Deactivate Consultant
            </Button>
                            <Dialog open={deactivateConsultantDialog} onClose={handleDeactivateConsultantClose} aria-labelledby="form-dialog-title">

                                <DialogTitle id="form-dialog-title">Deactivate Consultant</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please select the consultant to deactivate
          </DialogContentText>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Consultant</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={consultantToDeactivate}
                                            onChange={handleConsultantToDeactivateChange}
                                        >
                                            {consultantOptions.map(item => (
                                                <MenuItem
                                                    value={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeactivateConsultantClose} color="primary">
                                        Cancel
          </Button>
                                    <Button onClick={() => { handleDeactivateConsultant(consultantToDeactivate) }} color="primary">
                                        Deactivate
          </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <FormControl style={{ marginLeft: "60px" }} className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={customers}
                                onChange={handleCustomerChange}
                            >
                                {customerOptions.map(item => (
                                    <MenuItem
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginLeft: "20px" }} className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Consultant</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={consultant}
                                onChange={handleConsultantChange}
                            >
                                {consultantOptions.map(item => (
                                    <MenuItem
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            onClick={handleConsultant}

                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add
          </Button>

                        {customerOptions.map(customer => (
                            <div style={{ marginLeft: "60px" }} className={classes.customer}>
                                {customer} - {consultantAccess.map(consultant => {

                                    return (consultant.customer === customer) ?
                                        // <span> {consultant.email} </span>
                                        <Chip

                                            label={consultant.email}

                                            onDelete={() => handleDelete(consultant.email, customer)}
                                        />

                                        : null
                                })}
                            </div>
                        ))}

                    </div>
            }
        </div>
    );
}

export default Settings;
