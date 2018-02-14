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
        width: 300,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        backgroundColor: "bisque"
    },
    errorMsg:{
        color: "red",
        fontFamily: "Roboto, sans-serif",
        fontSize: 15
    }
};

const renderPasswordField = (field) => (
    <TextField name={"password"}
               floatingLabelFixed={true}
               floatingLabelText={"Password"}
               onChange={field.input.onChange}
               errorText={field.meta.error}/>
);

const renderEmailField = (field) => (
    <TextField name={"email"}
               floatingLabelFixed={true}
               floatingLabelText={"Email"}
               onChange={field.input.onChange}
               errorText={field.meta.error}/>
);




class LoginRegisterForm extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {handleSubmit, isLogin } = this.props;
        let buttonText = isLogin? "Sign in" : "Register";
        return (
            <Paper style={styles.paper} zDepth={2}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="email" validate={[email]} component={renderEmailField} type="text" />
                    </div>
                    <div>
                        <Field name="password" validate={[minLength2]} component={renderPasswordField} type="text" />
                    </div>

                    <RaisedButton
                        type="submit"
                        label={buttonText}
                        secondary={true}
                        style={styles.button}
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                    />
                    <div style={styles.errorMsg}>{this.props.errorMsg}</div>
                </form>
            </Paper>
        )
    }

}

LoginRegisterForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired
};


export const LoginForm = reduxForm({
    form: "login"
})(LoginRegisterForm);

export const RegisterForm = reduxForm({
    form: "register"
})(LoginRegisterForm);
