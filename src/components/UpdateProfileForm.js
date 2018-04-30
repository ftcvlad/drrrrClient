import React from "react";

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';
import { BeatLoader} from 'react-spinners';
import {httpUpdateUserProfile} from '../actions/http/profileActions';
const styles = {
    outerContainer: {


        width: 300,
        //margin: "auto",
        padding: 5,
        backgroundColor: "#42454c",
        marginTop:50
    },
    innerContainer:{
        flexDirection: "column",
        display: "flex",
        backgroundColor:"#4f525a",
        padding:10
    },
    inputStyle:{
        color:"white",
        WebkitBoxShadow: '0 0 0 1000px #4f525a inset'//to prevent autofill background https://stackoverflow.com/questions/34429195/disable-autofill-forms-with-react-and-material-ui
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

class UpdateProfileForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {username: "", gender: "", birthday:"", updating:false}
    }

    static getDerivedStateFromProps(nextProps, PrevState){

        return {username: nextProps.user.username, gender: nextProps.user.gender, birthday: nextProps.user.birthday}
    }


    handleUpdateProfile() {
        console.log(this.state.username);
        console.log(this.state.gender);
        console.log(this.state.birthday);


        let data = {
            username: this.state.username,
            gender: this.state.gender,
            birthday: this.state.birthday
        };

        this.setState({updating:true});
        this.props.dispatch(httpUpdateUserProfile(data, this.props.user.id))
            .then(()=>this.setState({updating:false}));

    }

    render() {
        console.log(this.state.gender);

        let datepickerValue = this.state.birthday ? new Date(this.state.birthday*1000)  : null;
        return (

            <div style={styles.outerContainer}>
                <div style={styles.innerContainer}>
                    <div>
                        <TextField name={"username"}
                                   floatingLabelFixed={true}
                                   floatingLabelText={"Username"}
                                   value={this.state.username}
                                    hintStyle={styles.hintStyle}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.inputStyle}
                                    underlineFocusStyle={styles.tfUnderlineFocusStyle}
                                    onChange={(() => {
                                       return ((e, value) => this.setState({username: value}));
                                    })()}/>

                    </div>




                    <div>
                        <RadioButtonGroup name="gender"
                                          onChange={(() => {
                                              return ((e, value) => this.setState({gender: value}));
                                          })()}
                                          defaultSelected={this.state.gender}>
                            <RadioButton
                                value={0}




                                iconStyle={{fill: 'white'}}
                                labelStyle={{color:"#d0ab44"}}
                                label="Male"

                            />
                            <RadioButton
                                value={1}
                                label="Female"
                                iconStyle={{fill: 'white'}}
                                labelStyle={{color:"#d0ab44"}}

                            />

                        </RadioButtonGroup>

                    </div>

                    <div style={{marginTop:15}}>


                            <DatePicker hintText="Select birth date"

                                        inputStyle={{color: 'white'}}
                                        value={datepickerValue}
                                        onChange={(() => {
                                            return ((e, value) => this.setState({birthday: value.getTime() / 1000}));
                                        })()}/>


                    </div>

                    <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-around"
                    }}>



                        <RaisedButton
                            type="submit"
                            label={"Update profile"}
                            disabled={this.state.updating}
                            secondary={true}
                            onClick={this.handleUpdateProfile.bind(this)}
                            buttonStyle={styles.submitButton}
                            // style={styles.button}
                        />


                            <BeatLoader
                                color={'white'}
                                size={10}
                                loading={this.state.updating}/>


                    </div>

                </div>


            </div>


        );
    }

}

UpdateProfileForm.propTypes = {
   user:PropTypes.object.isRequired,
   dispatch: PropTypes.func.isRequired

};



export default UpdateProfileForm;