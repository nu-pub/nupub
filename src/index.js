// the main file in our front-end app
// create-react-app expects a file in src/index.js and loads everything from here

import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import App from './views/App'

// connect our app to firebase 
const dbConfig = {
  apiKey: "AIzaSyBf_9rVSF8HlMFZemYR8qxNfNk5Wk0oxrI",
  authDomain: "nwhacks2021.firebaseapp.com",
  projectId: "nwhacks2021",
}

Firebase.initializeApp(dbConfig)

// Google Analytics
// https://github.com/react-ga/react-ga#api
ReactGA.initialize("nwhacks2021.appspot.com")

// Sentry
// https://docs.sentry.io/clients/javascript/integrations/react/
// window.Raven.config(process.env.REACT_APP_SENTRY_RAVEN_TRACKING_URL).install()

// render the App component to our document root with React
ReactDOM.render(<App />, document.getElementById('root'))
