import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import TextField from "@mui/material/TextField/TextField";
import {useState} from "react";
import "./style.css"
import {addTicket} from "../../../service/ticketService";
import {useSelector} from "react-redux";

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const AddTicketDialog = ({isOpen, toggle, reloadData}) => {
    const[userold,setuserold] = useState(JSON.parse(localStorage.getItem('user')))
    const auth = useSelector((state) => state.auth);
  
    const [ticketNo, setTicketNo] = useState({
        email:userold?.email
    });
  

    const [ticketDescription, setTicketDescription] = useState("");
    
    const handleAddTicket = () => {
        const data = {
            ticket_id: ticketNo,
            ticket_description: ticketDescription
        }
        addTicket(data).then(response => {
          
            toggle();
            reloadData();
        })
    }

    return (

            <Dialog
                onClose={toggle}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                className={"ticket-dialog"}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={toggle}>
                    Add New Ticket
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className={"d-block"}>
                        <TextField value={auth?.user?.email} disabled className={"d-block mt-2"} variant={"outlined"} label={"Email"} size={"small"} />
                        <TextField multiline rows={3} onChange={(event) => setTicketDescription(event.target.value)} className={"d-block mt-2"} variant={"outlined"} label={"Description"} size={"small"} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAddTicket}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

    );
};

export default AddTicketDialog;
