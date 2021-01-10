import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../css/header.css'

import {
    Button, Dialog, DialogContent, 
    DialogTitle, DialogActions, 
} from '@material-ui/core';

const uiConfig = {
    signinFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callback: {
        signinSuccessWithAuthResult: () => false,
    }
}

const Auth = (props) => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user)
            setOpen(false)
            if(user) {
                const db = firebase.firestore()
                db.collection('users').doc(user.uid).set({
                    name: user.displayName,
                    email: user.email
                }), {merge: true}
            }
        })

        return () => unregisterAuthObserver();
    }, [])

    const signinDialog = (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Signin/Signup</DialogTitle>
        <DialogContent>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {setOpen(false)}} color="primary">
                Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )

    return (
        <div className="authContainer">
            {!isSignedIn ? (
            <div>
                {signinDialog}
                <Button variant="outlined" onClick={() => setOpen(true)}>Sign in/up</Button>
            </div>
            )
            : 
            (
                <div>
                    {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
                    <Button variant="outlined" onClick={() => firebase.auth().signOut()}>Sign-out</Button>
                </div>
            )
            }
        </div>
    );
}

export default Auth