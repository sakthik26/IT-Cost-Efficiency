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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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

        //add for savings total here
        const [savingsTotalCostColumns, setSavingsTotalCostColumns] = React.useState(
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
    const [baselineTotalCostRows, setBaselineTotalCostRows] = React.useState([{ 2020: null, 2021: null, 2022: null, 2023: null, 2024: null,2025: null, 2026: null, 2027: null, 2028: null, 2029: null }]);
    const [savingsTotalCostRows, setSavingsTotalCostRows] = React.useState([{ 2020: null, 2021: null, 2022: null, 2023: null, 2024: null,2025: null, 2026: null, 2027: null, 2028: null, 2029: null }]);
    const [isAdmin, setAdmin] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
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
        if(localStorage.getItem('isActive') == "true"){
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
                for (var i = 0;data[0] && i < data[0].year.length; i++) {

                    baselineRows[data[0].year[i].year] = data[0].year[i].totalCost
                }
                console.log('here'+baselineRows)

                baselineData.push(baselineRows)
                console.log('here'+baselineData)
                //console.log(costTypeData)
                setBaselineTotalCostRows(baselineData);
                // console.log(data)
                // setRows(data);
            })
            .catch(error => console.log(error));

fetch('http://localhost:4000/savingsTarget?customer=' + localStorage.getItem('customerId'), {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                // const [rows, setRows] = React.useState([{ costType: 'LAN', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Print', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 },
                // { costType: 'Cables', 2020: 123213, 2021: 12353, 2022: 453445, 2023: 123234, 2024: 23234 }]);
                var savingsRows = {}
                var savingsData = []
                for (var i = 0 && data[0] ;i <data[0].year.length; i++) {

                    savingsRows[data[0].year[i].year] = data[0].year[i].totalCost
                }
                console.log('here'+savingsRows)

                savingsData.push(savingsRows)
                console.log('here'+savingsData)
               
                setSavingsTotalCostRows(savingsData);
                
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
                if(costTypeData.length == 0)
                costTypeData.push({})
              
                setRows(costTypeData);
              
                // console.log(data)
                // setRows(data);
            })
            .catch(error => console.log(error));

            fetch('http://localhost:4000/measures?id=' + localStorage.getItem('id') + '&customer=' + localStorage.getItem('customerId'), {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') || '' }
        })
            .then(res => res.json())
            .then(data => {
                
             
                setCustomerName(data[0].customer)
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
                if(costTypeData.length == 0)
                costTypeData.push({})
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


        }
    }, []); const classes = useStyles();


    const [customerName, setCustomerName] = React.useState('');
    const handleBaselineColumns = (event) => {
        setBaselineColumns(columns => [...columns, { title: '2025(€)', field: '2025' },
        { title: '2026(€)', field: '2026' },
        { title: '2027(€)', field: '2027' },
        { title: '2028(€)', field: '2028' },
        { title: '2029(€)', field: '2029' }]);
        event.target.parentNode.style.display='none'
    }

    const handleSavingsTotalCostRows = (event) => {
        setSavingsTotalCostColumns(columns => [...columns, { title: '2025(€)', field: '2025' },
        { title: '2026(€)', field: '2026' },
        { title: '2027(€)', field: '2027' },
        { title: '2028(€)', field: '2028' },
        { title: '2029(€)', field: '2029' }]);
        event.target.parentNode.style.display='none'
    }
    const handleBaselineTotalCostRows = (event) => {
        setBaselineTotalCostColumns(columns => [...columns, { title: '2025(€)', field: '2025' },
        { title: '2026(€)', field: '2026' },
        { title: '2027(€)', field: '2027' },
        { title: '2028(€)', field: '2028' },
        { title: '2029(€)', field: '2029' }]);
        event.target.parentNode.style.display='none'
    }

    const handleSavingsColumns = (event) => {
        setSavingsColumns(columns => [...columns, { title: '2025(€)', field: '2025' },
        { title: '2026(€)', field: '2026' },
        { title: '2027(€)', field: '2027' },
        { title: '2028(€)', field: '2028' },
        { title: '2029(€)', field: '2029' }]);
        event.target.parentNode.style.display='none'
    }


    return (
        <div className={classes.root}>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please enter values for all the fields
        </Alert>
            </Snackbar>
            {isAdmin == false && localStorage.getItem('isActive') == "true" ?
                <div>
                    <div className={classes.clientDetails}>
            {customerName}
            <AssignmentIndIcon fontSize='medium' />

        </div>
                    <Typography style={{ marginLeft: "20px" }}>
                        <h2> Targets & Baseline </h2>
                    </Typography>

                    <Typography style={{ marginLeft: "20px" }}>
                        <h2> Cost Baseline</h2>
                    </Typography>
                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleBaselineTotalCostRows}>
                     Show more year columns
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
                                        var costYearAmount = {}
                                        var baselineTotalItCost = {}
                                        var baselineTotalItCostYear = []
                                        var baselinePayload = {}
                                        for (var i in newData) {
                                            costYearAmount = {}
                                            costYearAmount['year'] = parseInt(i)
                                            costYearAmount['totalCost'] = parseInt(newData[i])
                                            baselineTotalItCostYear.push(costYearAmount)
                                        }
                                        baselinePayload.year = baselineTotalItCostYear
                                        resolve();
                                        axios
                                            .put("http://localhost:4000/baseline?customer=" + localStorage.getItem('customerId'), baselinePayload, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            .then((response) => {
                                                setBaselineTotalCostRows(prevState => {
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

                        }}
                    />

                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleBaselineColumns}>
                    Show more year columns
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        title="Baseline Cost Types"
                        columns={baselineColumns}
                        data={rows}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                   
                                    setTimeout(() => {
                                       
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
                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleSavingsTotalCostRows}>
                        Show more year columns
      </Button>
                    <MaterialTable
                        icons={tableIcons}
                        title="Total IT Cost"
                        columns={savingsTotalCostColumns}
                        options={{
                            paging: false,
                            search: false,
                        }}
                        data={savingsTotalCostRows}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        
                                        var savingsTotalItCost = {}
                                        var savingsTotalItCostYear = []
                                        var savingsPayload = {}
                                        for (var i in newData) {
                                            savingsTotalItCost = {}
                                            savingsTotalItCost['year'] = parseInt(i)
                                            savingsTotalItCost['totalCost'] = parseInt(newData[i])
                                            savingsTotalItCostYear.push(savingsTotalItCost)
                                        }
                                        savingsPayload.year = savingsTotalItCostYear
                                        resolve();
                                        axios
                                            .put("http://localhost:4000/savingsTarget?customer=" + localStorage.getItem('customerId'), savingsPayload, {
                                                headers: { 'x-access-token': localStorage.getItem('token') }
                                            })
                                            .then((response) => {
                                                setSavingsTotalCostRows(prevState => {
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

                        }}
                    />






                    <Button style={{ marginLeft: "20px", marginTop: "10px", marginRight: "10px" }} variant="outlined" color="primary" onClick={handleSavingsColumns}>
                      Show more year columns
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

export default Settings;
