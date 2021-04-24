import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
InputContent.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,



};
InputContent.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',

}
const useStyles = makeStyles({
    titleStyle: {
        resize: 'none',
        background: 'white',
        margin: '5px 0',
        borderRadius: '5px'

    },

})
function InputContent(props) {
    const classes = useStyles();
    const { field, label, placeholder } = props;
    const { name, value, onChange, onBlur } = field;
    // console.log(value);
    return (
        <TextField
            id="outlined-multiline-static"
            label={label}
            multiline
            fullWidth
            placeholder={placeholder}
            className={classes.titleStyle}
            variant="outlined"
            rows={20}
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={value}
            // value={value}
            name={name}
        />
    );
}

export default InputContent;