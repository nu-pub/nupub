import React, { useEffect, useState } from 'react'
import firebase from 'firebase'

const SourceSearchPage = () => {

    const db = firebase.firestore()

    useEffect(() => {
        db.collection('sources').get(function(querySelector) {
            const tempArray = []
            querySelector.forEach(element => {
                tempArray.push(element.data())
            });
        })
    })


    return(
        <div className="sourceSearchPage">
            <div className="sourceTop">
                top
            </div>
            <div className="sourceList">
                
            </div>
        </div>
    )
}

export default SourceSearchPage