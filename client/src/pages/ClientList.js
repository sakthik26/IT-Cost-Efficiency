import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'; import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Select from '@material-ui/core/Select';


// simple dialog imports

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

//simple dialog imports - end



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

function ClientList() {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
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
        setOpen(true);
    }

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
        if (localStorage.getItem('emailId') && localStorage.getItem('isAdmin') == 'true') {
            setAdmin(true)
        }

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

                setSelectedCustomer(localStorage.getItem('customerId'))

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
                    Customer has been Modified. Navigate to the User Dashboard to view selected customer measures.
        </Alert>
            </Snackbar>
            {isAdmin == false && localStorage.getItem('isActive') == "true" ?
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
                                    key={item.customerId}
                                >
                                    {item.customer}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                : isAdmin == false && localStorage.getItem('isActive') == "false" ? <Typography variant="h6" className={classes.title}>
                    Your account has been temporarily deactivated, please contact your administrator.
      </Typography>
                    :
                    <Typography variant="h6" className={classes.title}>
                       You have not been assigned customers at the moment, please contact your administrator.
                     
      </Typography>
            }

        </div>
    );
}

export default ClientList;
