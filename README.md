Simple Application which allow to calculate exchange of choosen currency.
Application is based on Websockets and Fxcm API

All avaiable currencies is fetch from API though Axios Http get request, and each of the currency pair,
is subscribed. Subscribtion is done via Axios request as well.

To 'talk' with api Bearer token is mandatory to establish connection. 

To run Application rename file .env.template -> .env and run wiht `npm run start` this is local server. 
