import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'

const ChannelLink = (props) => {

    const db = firebase.firestore()

    const [channelTitle, setChannelTitle] = useState(props.title)

    useEffect(() => {
        db.collection("channels").doc(props.id).get(function(doc) {
            console.log(doc.data().title)
            setChannelTitle(doc.data().title)
        })
    })

    return(
        <div className="channelCard">
            <Link to={`/channel/${props.id}`}>
                {channelTitle}
            </Link>
        </div>
    )
}

export default ChannelLink