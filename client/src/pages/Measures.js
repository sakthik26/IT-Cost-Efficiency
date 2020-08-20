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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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
        marginTop: '100px',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft:'40px'
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
    clientDetails: {
        /* float: right; */
        display: 'flex',
        /* float: right; */
        flexDirection: 'row-reverse',
        /* position: relative; */
        margin: '100px 30px 0px 0px',
        alignItems: 'center'
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
    const [rows, setRows] = React.useState([]);
    const [isAdmin, setAdmin] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('');
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
        fetch('http://localhost:4000/measures?id=' + localStorage.getItem('id') + '&customer=' + localStorage.getItem('customerId'), {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {
                
                setRows(data);
                setCustomerName(data[0].customer)
            })
            .catch(error => console.log(error));

    }, []); const classes = useStyles();

    return (
        <div className={classes.root}>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please enter values for all the fields
        </Alert>
            </Snackbar>
            {/* {rows.length > 0 && isAdmin == false && localStorage.getItem('isActive') == "true" ? */}
            {rows.length > 0 && isAdmin == false && localStorage.getItem('isActive') == "true" ?
                <div>
<div className={classes.clientDetails}>
                {customerName}
                <AssignmentIndIcon fontSize='medium' />

            </div>
                    <Button style={{ margin: "10px 10px", display: "block" }} variant="outlined" color="primary" onClick={() => { history.push('/measuredetails') }}>
                        Create Measure
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        localization={{
                            pagination: {
                                labelRowsPerPage: '10'
                            },

                            body: {
                                emptyDataSourceMessage: 'No records to display',
                            }
                        }}
                        title="Customer Measures"
                        columns={columns}
                        actions={[
                            {
                                icon: EditIcon,
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    history.push('/measuredetails/' + rowData.measureId)
                                }
                            }
                        ]}
                        data={rows}
                        editable={{

                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        axios
                                            .delete("http://localhost:4000/measuredetails/" + oldData.measureId, {
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

export default Measures;
