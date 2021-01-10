import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import ChannelCard from './channelCard'
import {Button, TextField} from '@material-ui/core'

const ProfilePage = (props) => {


    const db = firebase.firestore()
    const user = firebase.auth()

    const [channelList, setChannelList] = useState([])
    const [blockList, setBlockList] = useState([])
    const [channelInput, setChannelInput] = useState("")
    const [updated, setUpdated] = useState(false)

    useEffect(() => {
        
        db.collection(`users`).doc(user.uid).get().then(function(doc) {

            if(doc.data().channels!=undefined) {
                setChannelList(doc.data().channels)
            } else {
                setChannelList([])
            }

            if(doc.data().blocks!=undefined) {
                setBlockList(doc.data().channels)
            } else {
                setBlockList([])
            }

        }).catch(function(error) {
            console.log(error)
            setChannelList([])
        })

        db.collection(`channels`)
    }, [updated])

    const handleAdd = () => {

        db.collection('channels').add({
            datetime: new Date(),
            owner: firebase.auth().currentUser.uid,
            title: channelInput,
        }).then(function(docRef) {

            // db.collection('users').doc(user.uid).get(function(doc){
            //     if (doc.data().channels==undefined) {
            //         console.log("creating channels")
            //         db.collection('users').doc(user.uid).add({
            //             channels: [docRef.id]
            //         }, {merge: true})
            //     } else {
            //         console.log("updating channels")
            //         db.collection(`users`).doc(user.uid).update({
            //             channels: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            //         }, {merge: true}).then(function(){
            //             setUpdated(!updated)
            //         }) 
            //     }
            // })
            
        }).catch(function(error){
            console.log(error)
        })

        setChannelInput("")
    }

    const channelsDisplay = channelList.map((channel) => {
            return (
                <ChannelCard db={db} id={channel} key={channel}/>
            )
        }
    )

    const addChannelArea = (
        <div>
            <TextField 
                value={channelInput}
                onChange={(e) => setChannelInput(e.target.value)}
                placeholder="Enter a channel name..."
            />
            <Button onClick={handleAdd}
                disabled={(channelInput.length < 3)}
            >Create Channel</Button>
        </div>
    )


    return(
        <div className="profilePage">
            <div className="topSection">
                {user.uid}
                {addChannelArea}
            </div>
            <div className="listSection">
                {channelsDisplay}
            </div>
        </div>
    )
}

export default ProfilePage