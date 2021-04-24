import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    email: Yup.string().email().required('This field is required1'),
    password: Yup.string().required('This field is required2'),

})