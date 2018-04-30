import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import configureStore from './store/configureStore';
import Root from './components/Root';
//import './styles/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SocketClient from './functions/SocketClient';

import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    datePicker: {
        selectColor: "#d0ab44",

        color: "red",
        textColor: "#d0ab44",
        calendarTextColor: "#42454c",

        selectTextColor: "brown",
        calendarYearBackgroundColor: "#42454c",
        headerColor: "#42454c",


    },
    flatButton:{
        color:"white",
        textColor: "red",
        primaryTextColor: "#9c1818",
        secondaryTextColor: "white"

    }
});


const socketClient = new SocketClient();
let store ;
configureStore(socketClient)
    .then(createdStore=>{
        store = createdStore;
        ReactDOM.render(
            <App />,
            document.getElementById('app')
        );
    });

//muiTheme={getMuiTheme(darkBaseTheme)}
const App = () => (
    <MuiThemeProvider muiTheme={muiTheme} >
        <Root store={store} />
    </MuiThemeProvider>
);







