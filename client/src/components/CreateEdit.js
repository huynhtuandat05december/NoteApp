import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import axios from 'axios';
import CreateNote from './note/CreateNote';
function CreateEdit(props) {
    const { match } = props;
    const id = match.params.id;
    const [note, setNote] = useState({});
    console.log('hello');
    useEffect(() => {
        console.log('effect')
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore');
            if (id) {
                const res = await axios.get(`/api/notes/${id}`, {
                    headers: { Authorization: token }
                })
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: res.data.date,
                    id: res.data._id
                })
            }
        }
        getNote()

    }, [match.params.id]);

    const createNote = !id;
    const initialValues = createNote ? {
        title: '',
        content: '',
        date: null,
    } : note
    return (
        <CreateNote initialValues={initialValues} createNote={createNote} id={id} />

    );
}

export default CreateEdit;