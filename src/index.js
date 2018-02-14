import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import configureStore from './store/configureStore';
import Root from './components/Root';
//import './styles/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Echo from "laravel-echo";
import Pusher from 'pusher-js';

let store ;
configureStore()
    .then(createdStore=>{
        store = createdStore;
        ReactDOM.render(
            <App />,
            document.getElementById('app')
        );
    });

//muiTheme={getMuiTheme(darkBaseTheme)}
const App = () => (
    <MuiThemeProvider >
        <Root store={store} />
    </MuiThemeProvider>
);





// // Assuming Pusher
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '6d7a5647256303979656',
//     cluster: 'eu',
//     encrypted: true
// });
//
// window.Echo.channel('game1channel')
//     .listen('ExampleEvent', (e) => {
//         console.log(e.update);
//     });