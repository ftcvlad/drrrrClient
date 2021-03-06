let backendHost, wsHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'localhost') {
    backendHost = 'http://localhost:8080/';
    wsHost = 'ws://localhost:8090/';
} else if(hostname === 'laravel-mysql-persistent-draughts.a3c1.starter-us-west-1.openshiftapps.com') {
    backendHost = 'http://laravel-mysql-persistent-draughts.a3c1.starter-us-west-1.openshiftapps.com/public/index.php/';
    wsHost = 'ws://websocketroute-draughts.a3c1.starter-us-west-1.openshiftapps.com'

}
else{
    console.log(hostname);
}

export const API_ROOT = backendHost;
export const WS_ROOT = wsHost;