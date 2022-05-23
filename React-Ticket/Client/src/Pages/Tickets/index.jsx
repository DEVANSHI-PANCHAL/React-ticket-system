import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddTicketDialog from "./components/AddTicketDialog";
import TextField from "@mui/material/TextField/TextField";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from "@mui/material/TableFooter";
import {getTickets, resolveTicket} from "../../service/ticketService";
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import Chip from '@mui/material/Chip';

import "./style.css";
import EditTicketDialog from "./components/EditTicketDialog";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
const Tickets = () => {
    const [orderBy, setOrderBy] = useState('createdAt');
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('desc');
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [total, setTotal] = React.useState(0);
    const [editData, setEditData] = React.useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const creator =JSON.parse(localStorage.getItem('user'))
    // console.log(creator.id)
    const resolve = (id) => {
      
        resolveTicket(id).then (response => {
          
            getAllTickets(page, rowsPerPage, orderBy, order, searchKeyword);
        })
    };
    useEffect(() => {
        getAllTickets(page, rowsPerPage, orderBy, order, searchKeyword);
    }, [])

    const getAllTickets = (pageIndex = page, pageSize = rowsPerPage, sortType = orderBy, sortDirection = order, searchKeyword = searchKeyword) => {
        getTickets(pageIndex, pageSize, sortType, sortDirection, searchKeyword).then(response => {
            console.log("TICKETS :: ", response)
            setRows(response.data.tickets);
            setTotal(response.data.total);
        })
    }
    // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getAllTickets(newPage, rowsPerPage, orderBy, order, searchKeyword)
    };

    const handleSort = (orderBy, order) => {
        setOrder(order);
        setOrderBy(orderBy);
        getAllTickets(page, rowsPerPage, orderBy, order, searchKeyword)
    };

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };

    const toggleEditDialog = () => {
        setIsEditOpen(!isEditOpen);
    };

   

    const handleEdit = (data) => {
        setEditData(data)
        toggleEditDialog()
    };

    const handleSearch = () => {
        getAllTickets(page, rowsPerPage, orderBy, order, searchKeyword)
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-8 d-flex"}>
                        <TextField value={searchKeyword} onChange={(event) => setSearchKeyword(event.target.value)} className={"d-block mr-4"} variant={"outlined"} label={"Search"} size={"small"} placeholder={"Search by Ticket Id and Description"}/>
                        {" "}&nbsp;&nbsp;
                        <Button size={"small"} className={"ml-2"} color={"success"} variant={"contained"} onClick={handleSearch}>Search</Button>
                    </div>
                    <div className={"col-4 d-flex justify-content-end"}>
                        <Button size={"small"} className={"ml-auto"} color={"success"} variant={"contained"} onClick={toggleDialog}>Add Ticket</Button>
                    </div>
                </div>
                <div className={"row mt-4"}>
                    <div className={"col-12"}>
                        <Box sx={{ width: '100%' }}>
                            <Paper sx={{ width: '100%', mb: 2 }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead component={"th"} className={'head'}>
                                            <TableRow>
                                                <TableCell>
                                                    Status
                                                </TableCell>
                                               
                                                <TableCell
                                                    sortDirection={orderBy === 'ticket_id' ? order : false}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === 'ticket_id'}
                                                        direction={orderBy === 'ticket_id' ? order : 'asc'}
                                                        onClick={() => handleSort('ticket_id', order === 'asc' ? 'desc' : 'asc')}
                                                    >
                                                        Ticket No
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell
                                                    sortDirection={orderBy === 'ticket_description' ? order : false}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === 'ticket_description'}
                                                        direction={orderBy === 'ticket_description' ? order : 'asc'}
                                                        onClick={() => handleSort('ticket_description', order === 'asc' ? 'desc' : 'asc')}
                                                    >
                                                        Ticket Description
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell
                                                    sortDirection={orderBy === 'createdAt' ? order : false}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === 'createdAt'}
                                                        direction={orderBy === 'createdAt' ? order : 'asc'}
                                                        onClick={() => handleSort('createdAt', order === 'asc' ? 'desc' : 'asc')}
                                                    >
                                                        Created On
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell
                                                    sortDirection={orderBy === 'createdAt' ? order : false}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === 'createdBy'}
                                                        direction={orderBy === 'createdBy' ? order : 'asc'}
                                                        onClick={() => handleSort('createdBy', order === 'asc' ? 'desc' : 'asc')}
                                                    >
                                                        Created By
                                                    </TableSortLabel>
                                                </TableCell>

                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {console.log("asdasd", rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))}
                                        <TableBody>
                                            {rows.map((row,index) => (
                                                
                                                
                                                <TableRow
                                                    key={row.ticket_id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <Chip size={"small"} label={row.resolved ? "Resolved" : "Active"} color={row.resolved ? "success" : "primary"} />
                                                    </TableCell>
                                                    <TableCell>{ index+1 }</TableCell>
                                                    {/* <TableCell component="th" scope="row">
                                                        {row.ticket_id}
                                                    </TableCell> */}
                                                    <TableCell component="th" scope="row">
                                                        {row.ticket_description}
                                                    </TableCell>
                                                    <TableCell>{new Date(row.createdAt).toDateString()}</TableCell>
                                                    <TableCell>{row.createdBy.firstName + " " + row.createdBy.lastName}</TableCell>
                                                  
                                                    <TableCell>
                                                        <span>
                                                            
                                                            {!row.resolved &&
                                                            
                                                            <>
                                                                 {creator?.id === row?.createdBy?.id?(
                                                                <>
                                                                <EditIcon className={"edit-icon"} titleAccess={"Edit"} onClick={() => handleEdit(row)}/>
                                                                <CheckIcon className={"resolve-icon"}
                                                                           titleAccess={"Resolve"}
                                                                           onClick={() => resolve(row._id)}/>
                                                                           </>
                                                             ):(
                                                                 <>
                                                                {/* <EditIcon className={"edit-icon"} titleAccess={"Edit"} disabled/> */}
                                                                {/* <CheckIcon className={"resolve-icon"}
                                                                           titleAccess={"Resolve"}
                                                                           disabled/> */}
                                                                           </>
                                                                 )}
                                                            </>
                                                            }
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[]}
                                                    colSpan={3}
                                                    count={total}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    // onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </div>
                </div>
            </div>
            <AddTicketDialog toggle={toggleDialog} isOpen={isOpen} reloadData={handleSearch}/>
            <EditTicketDialog data={editData} toggle={toggleEditDialog} isOpen={isEditOpen} reloadData={handleSearch}/>
        </>
    )
};

export default Tickets;