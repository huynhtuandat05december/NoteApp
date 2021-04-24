import React from 'react';
import { FastField, Form, Formik } from 'formik'
import InputContent from '../../custom-fields/InputContent';
import InputTitle from '../../custom-fields/InputTitle';
import InputDate from '../../custom-fields/InputDate';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
function CreateNote(props) {
    const { initialValues, createNote, id } = props;
    console.log(initialValues);
    const titleForm = createNote ? 'CREATE NOTE' : 'EDIT NOTE';
    const history = useHistory();
    const submitCreateNote = async value => {
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date } = value;
                console.log(title, content, date);
                const newNote = {
                    title,
                    content,
                    date,
                }
                console.log(newNote);
                await axios.post('/api/notes', newNote, {
                    headers: { Authorization: token }
                })
                return history.push('/')
            }
        }
        catch (err) {
            window.location.href = "/";
        }
    }
    const submitEditNote = async value => {
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date } = value;
                console.log(title, content, date);
                const newNote = {
                    title,
                    content,
                    date,
                }
                console.log(newNote);
                await axios.put(`/api/notes/${id}`, newNote, {
                    headers: { Authorization: token }
                })
                return history.push('/')
            }
        }
        catch (err) {
            window.location.href = "/";
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => createNote ? submitCreateNote(values) : submitEditNote(values)}
        >
            {
                FormikProps => {
                    // const { values, errors, touched, isSubmitting } = FormikProps;
                    return (
                        <div className='create-note'>
                            <h2>{titleForm}</h2>
                            <Form >
                                <FastField
                                    name='title'
                                    label="Title"
                                    placeholder="E.g: This is title ..."
                                    component={InputTitle}
                                />
                                <FastField
                                    name='content'
                                    label="Content"
                                    placeholder="E.g: This is content ..."
                                    component={InputContent}
                                />
                                <InputDate form={FormikProps} name='date' label="Date" />
                                <Button
                                    variant="contained"
                                    color={createNote ? "primary" : "secondary"}
                                    size="large"
                                    // className={classes.button}
                                    startIcon={createNote ? <SaveIcon /> : <EditIcon />}
                                    type='submit'
                                >
                                    {createNote ? 'Create' : 'Edit'}
                                </Button>
                            </Form>
                        </div>

                    )
                }
            }

        </Formik>
    );
}

export default CreateNote;
