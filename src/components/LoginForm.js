import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';

//validation rules
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);



const styles={
    button: {
        margin: "25 25 10 25",
        width:230
    },
    paper: {
        height: 250,
        width: 290,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        backgroundColor: "#42454c",
        padding:5
    },
    errorMsg:{
        color: "red",
        fontFamily: "Roboto, sans-serif",
        fontSize: 15
    },
    inputStyle:{
        color:"white",
        WebkitBoxShadow: '0 0 0 1000px #4f525a inset'
    },
    hintStyle:{
        zIndex: "1"
    },
    tfUnderlineFocusStyle:{
        display: "none"
    },

    floatingLabelStyle:{
        color:"#d0ab44"
    },
    submitButton: {
        backgroundColor: "#9c1818",
        border: "1px solid #9c1818"
    }
};

const renderPasswordField = (field) => (
    <TextField name={"password"}
               floatingLabelFixed={true}
               floatingLabelText={"Password"}
               floatingLabelStyle={styles.floatingLabelStyle}
               inputStyle={styles.inputStyle}
               hintStyle={styles.hintStyle}
               underlineFocusStyle={styles.tfUnderlineFocusStyle}
               onChange={field.input.onChange}
               errorText={field.meta.error}/>
);

const renderEmailField = (field) => (
    <TextField name={"email"}
               floatingLabelFixed={true}
               floatingLabelText={"Email"}
               floatingLabelStyle={styles.floatingLabelStyle}
               inputStyle={styles.inputStyle}
               hintStyle={styles.hintStyle}
               underlineFocusStyle={styles.tfUnderlineFocusStyle}
               onChange={field.input.onChange}
               errorText={field.meta.error}/>
);




class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {handleSubmit, label } = this.props;

        return (
            <Paper style={styles.paper} zDepth={2}>
                <form style={{backgroundColor:"#4f525a"}} onSubmit={handleSubmit}>
                    <div>
                        <Field name="email" validate={[email]} component={renderEmailField} type="text" />
                    </div>

                    <div>
                        <Field name="password" validate={[minLength2]} component={renderPasswordField} type="text" />
                    </div>

                    <RaisedButton
                        type="submit"
                        label={label}
                        secondary={true}
                        buttonStyle={styles.submitButton}
                        style={styles.button}
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                    />
                    <div style={styles.errorMsg}>{this.props.errorMsg}</div>
                </form>
            </Paper>
        )
    }

}

LoginForm.propTypes = {
    label: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired
};


export default reduxForm({
    form: "login"
})(LoginForm);


