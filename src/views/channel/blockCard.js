import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
import '../../css/channelPage.css'

const BlockCard = (props) => {

    const db = firebase.firestore()

    const [text, setText] = useState("")
    const [sourceTitle, setsourceTitle] = useState("")

    useEffect(() => {
        const newPath = props.id.replace(/-/ig, '/')
        console.log(newPath)
        db.doc(newPath).get().then(function(doc){
            setText(doc.data().body)
        })
        db.collection('sources').doc(props.source).get().then(function(doc) {
            if(doc.data().title!=undefined) {
                setsourceTitle(doc.data().title)
            } 
        }
        )
    }, [])

    return(
        <div className="blockCard">
            <Link to={`/block/${props.id}`} style={{textDecoration:'none'}}>
                <div className="blockSource">
                    {sourceTitle}
                </div>
                <div>
                    {text}
                </div>
            </Link>
        </div>
    )
}

export default BlockCard