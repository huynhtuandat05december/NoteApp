import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'timeago.js'
import axios from 'axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function Home(props) {
    const classes = useStyles();
    const [notes, setNotes] = useState([]);


    const getNotes = async (token) => {
        // console.log(token)
        const res = await axios.get('/api/notes', {
            headers: { Authorization: token }
        })
        // console.log(res.data);
        setNotes(res.data);

    }
    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        // console.log(token);
        if (token) {
            getNotes(token)
        }

    }, [])

    const deleteNote = async (id) => {
        try {
            // console.log(id);
            const token = localStorage.getItem('tokenStore');
            if (token) {
                await axios.delete(`/api/notes/${id}`, {
                    headers: { Authorization: token }
                })
            }
            await getNotes(token);
        }
        catch (err) {
            // console.log(err)
            window.location.href = "/";
        }
    }

    return (
        <div className='note-wrapper'>
            {
                notes.map(note => {
                    return (
                        <Card className="card" key={note._id}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings" onClick={() => deleteNote(note._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                title={note.name}
                                subheader={format(note.date)}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" >
                                    {note.title}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {note.content}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Link to={`edit/${note._id}`} >
                                    <IconButton aria-label="add to favorites">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </Card>
                    )

                })
            }
        </div>
    );
}

export default Home;