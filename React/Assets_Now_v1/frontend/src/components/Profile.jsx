import React from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Profile({ isDark, user, userDispatch }) {

    async function handleDelete() {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/api/users?user=${user.user.email}`, {
            method: "DELETE"
        });
        if (response.ok) {
            userDispatch({ type: "user/logout" });
        }
    }


    async function handleLogout() {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/api/users/logout`, {
            method: "POST",
            credentials: "include"
        });
        if (response.ok) {
            userDispatch({ type: "user/logout" });
        }

    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <div id='profile-logo'>
                    <img id='account-logo' src={`/images/profile-logo-${isDark ? "dark" : "white"}.svg`} height="25" />
                </div>
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                user={user}
                handleLogout={handleLogout}
                handleDelete={handleDelete}
            />
        </div>
    );
}


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Account Info:</DialogTitle>
            <List sx={{ pt: 0 }} disablePadding>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.user.name} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.user.email} />
                </ListItem>
                <ListItem disablePadding>
                    <div className='profile-btns'>
                        <ListItemButton
                            autoFocus
                            onClick={() => props.handleLogout()}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "red" }}>
                                    <LogoutIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                        <ListItemButton
                            autoFocus
                            onClick={() => props.handleDelete()}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "red" }}>
                                    <DeleteIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItemButton>
                    </div>
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};