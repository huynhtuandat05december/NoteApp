import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CssBaseline } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

function Nav(props) {
    const classes = useStyles();
    const logOutSubmit = () => {
        localStorage.clear();
        props.setLogin(false);
    }

    return (
        <div className={classes.root}  >
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <Link to="/" className={classes.link}>
                        <ListItem button >
                            <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                    </Link>
                    <Link to="/create" className={classes.link}>
                        <ListItem button >
                            <ListItemIcon>{<NoteAddIcon />}</ListItemIcon>
                            <ListItemText primary='Create' />
                        </ListItem>
                    </Link>
                    <Link to="/" className={classes.link} onClick={() => logOutSubmit()}>
                        <ListItem button >
                            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                            <ListItemText primary='LogOut' />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
}

export default Nav;
// function Nav(props) {
//     return (
//         <div><h1>ABC</h1></div>
//     )
// }
// export default Nav