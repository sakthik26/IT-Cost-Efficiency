import React from 'react';
import { useHistory } from 'react-router-dom'
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
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { Icon } from '@material-ui/core';
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
        marginTop: '100px'
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

function Measures() {
    const history = useHistory();
    const [columns, setColumns] = React.useState(
        [
            { title: 'Measure ID', field: 'measureId', sorting: true },
            { title: 'Customer', field: 'customerId.customer' },
            { title: 'External Measure ID', field: 'externalMeasureId' },
            { title: 'Measure', field: 'measure' },
            { title: 'Description', field: 'description' },
            { title: 'Saving Potential (€)', field: 'potential', type: 'numeric' },
            { title: 'Duration in Months', field: 'durat    ionInMonth', type: 'numeric' },
            { title: 'Status', field: 'status' },
            { title: 'Status Lang', field: 'statusLang' },
        ]);
    const [rows, setRows] = React.useState({
        rows: []
    });
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

    const handleConsultantToReactivateChange = (event) => {
        setConsultantToReactivate(event.target.value);
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
                setOpen(true)
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
    const handleDelete = (email, customer) => {

        axios
            .delete("http://localhost:4000/userrights/" + email, {
            })
            .then((response) => {
                let consultants = consultantAccess.filter(consultant => consultant.email != email)
                setConsultantAccess(consultants)
                setOpen(true)
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
        if (localStorage.getItem('emailId') && localStorage.getItem('isAdmin') == true) {
            setAdmin(true)
        }

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
    const [reactivateConsultantDialog, showReactivateConsultantDialog] = React.useState(false);
    const [customerToDelete, setCustomerToDelete] = React.useState('');
    const [consultantToDelete, setConsultantToDelete] = React.useState('');
    const [consultantToDeactivate, setConsultantToDeactivate] = React.useState('');
    const [consultantToReactivate, setConsultantToReactivate] = React.useState('');
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

    const handleReactivateConsultantOpen = () => {
        showReactivateConsultantDialog(true);
    };

    const handleReactivateConsultantClose = () => {
        showReactivateConsultantDialog(false);
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
                setOpen(true)
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
                setOpen(true)
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
                setOpen(true)
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
                setOpen(true)
            })
            .catch(function (e) {
                console.log(e);
            });
    }

    const handleReactivateConsultant = (consultantToReactivate) => {

        axios
            .put("http://localhost:4000/api/users/" + consultantToReactivate, {
                "email": consultantToReactivate, "isActive": true
            })
            .then((response) => {

                handleReactivateConsultantClose()
                setOpen(true)
            })
            .catch(function (e) {
                console.log(e);
            });
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
                <Alert onClose={handleClose} severity="success">
                    Operation is successful
        </Alert>
            </Snackbar>

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


                    <Button style={{ marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleReactivateConsultantOpen}>
                        Reactivate Consultant
            </Button>
                    <Dialog open={reactivateConsultantDialog} onClose={handleReactivateConsultantClose} aria-labelledby="form-dialog-title">

                        <DialogTitle id="form-dialog-title">Reactivate Consultant</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please select the consultant to Reactivate
          </DialogContentText>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Consultant</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={consultantToReactivate}
                                    onChange={handleConsultantToReactivateChange}
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
                            <Button onClick={handleReactivateConsultantClose} color="primary">
                                Cancel
          </Button>
                            <Button onClick={() => { handleReactivateConsultant(consultantToReactivate) }} color="primary">
                                Reactivate
          </Button>
                        </DialogActions>
                    </Dialog>


                </div>
                <FormControl style={{ marginLeft: "20px" }} className={classes.formControl}>
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
                    <div style={{ marginLeft: "20px" }} className={classes.customer}>
                        {customer} - {consultantAccess.map(consultant => {

                            return (consultant.customer === customer) ?
                                // <span> {consultant.email} </span>
                                <Chip
                                    style={{ marginLeft: "5px" }}
                                    label={consultant.email}

                                    onDelete={() => handleDelete(consultant.email, customer)}
                                />

                                : null
                        })}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Measures;
