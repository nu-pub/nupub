import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import ChannelCard from './channelCard'
import {Button, TextField} from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'



const ProfilePage = (props) => {


    const db = firebase.firestore()

    const [channelList, setChannelList] = useState([])
    const [blockList, setBlockList] = useState([])
    const [channelInput, setChannelInput] = useState("")
    const [updated, setUpdated] = useState(false)
    const [user, loading, error] = useAuthState(firebase.auth())

    useEffect(() => {
        if (user) {
            db.collection(`users/${user.uid}/channels`).get().then(function(querySnapshot) {
                var tempArray = []
            
                querySnapshot.forEach(element => {
                    tempArray.push(element.data())
                });

                console.log(tempArray)
                setChannelList(tempArray)
    
            }).catch(function(error) {
                console.log(error)
                setChannelList([])
            })
        }
        //db.collection(`channels`)
    }, [updated, user])

    const handleAdd = () => {
        var copyList = [...channelList]
        db.collection('channels').add({
            datetime: new Date(),
            owner: user.uid,
            title: channelInput,
        }).then(function(docRef) {
            db.collection(`users/${user.uid}/channels`).add({
                id: docRef.id,
                position: channelList.length,
                title: channelInput,
                datetime: new Date()
            })
            
            copyList.push({
                id: docRef.id,
                position: channelList.length,
                title: channelInput,
                datetime: new Date()
            })

            setChannelList(copyList)

        }).catch(function(error){
            console.log(error)
        })
        setChannelInput("")
    }

    // var sortedList = channelList.sort(function(a, b) {
    //     return b.position - a.position
    // })

    var channelsDisplay = channelList.map((channel, index) => {
            return (
                <ChannelCard db={db} title={channel.title} channelId={channel.id} key={index}/>
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
            {!loading && (
                <div>
                    <div className="topSection">
                    {user.uid}
                    {addChannelArea}
                    </div>
                    <div className="listSection">
                        {channelsDisplay}
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default ProfilePage