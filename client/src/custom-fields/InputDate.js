import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
InputDate.propTypes = {
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
};
InputDate.defaultProps = {
    type: 'date',
    label: '',
}
const useStyles = makeStyles((theme) => ({
    textField: {
        resize: 'none',
        background: 'white',
        margin: '5px 0',
        borderRadius: '5px',
    },
}));
function InputDate(props) {
    const classes = useStyles();
    const { name, form, label } = props;
    const { values, setFieldValue } = form;
    const handleDate = (value) => {
        setFieldValue(name, value)

    }
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.textField}
                    fullWidth
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    id="date-picker-outline"
                    label={label}
                    value={values.date}
                    onChange={handleDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default InputDate;