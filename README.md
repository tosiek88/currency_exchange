Simple Application which allow to calculate exchange of choosen currency.
Application is based on Websockets and Fxcm API

All avaiable currencies is fetch from API though Axios Http get request, and each of the currency pair,
is subscribed. Subscribtion is done via Axios request as well.

To 'talk' with api Bearer token is mandatory to establish connection. 

To run Application rename file .env.template -> .env and run wiht `npm run start` this is local server. 
Open a browser in adres:

`  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.10:3000
`

LOCAL STORAGE
Custom middleware - localStorageMiddleware is responsible for saving state when Websocket will send action.disconnect,
this when event `beforeunload` trigger. Store will be loaded if is avaiable on LocalStorage.

Formik has been used in Amount Function Component.






