import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { set } from 'react-ga'
import { Link } from 'react-router-dom'
import BlockCard from './blockCard'

const ChannelPage = (props) => {

    const db = firebase.firestore()

    const [user, loading, error] = useAuthState(firebase.auth())
    const [blockList, setBlockList] = useState([])
    const [title, setTitle] = useState("")
    const [ownerId, setOwnerId] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [updated, setUpdated] = useState(false)

    useEffect(()=>{
        if(user) {
            db.collection(`channels`).doc(props.match.params.channelId).get().then(function(doc){
                if(doc.data().owner!=undefined) {
                    setOwnerId(doc.data().owner)
                    db.collection(`users`).doc(doc.data().owner).get().then(function(docTwo) {
                        if(docTwo.data().name!=undefined) {
                            setOwnerName(docTwo.data().name)
                        } else {
                            setOwnerName(docTwo.data().email)
                        }
                    })
                }
            })

            db.collection(`channels/${props.match.params.channelId}/blocks`).get().then(function(querySnapshot){
                var sourceArray = []
                querySnapshot.forEach(element => {
                    sourceArray.push({
                        source: element.data().source,
                        path: element.id
                    }
                    )
                });
                console.log(sourceArray)
                setBlockList(sourceArray)
            }).catch(function(error) {
                console.log(error)
            })
        }
    }, [updated])

    console.log(ownerName)

    var channelsDisplay = blockList.map((block, index) => {
        return (
            <BlockCard db={db} id={block.path} source={block.source} key={index}/>
        )
    }
)
    return(
        <div className="channelPage">
            <div className="channelMetaData">
                <Link to={`/user/${ownerId}`}>{ownerName}</Link>
                {props.title}
            </div>
            <div className="blockList">
                {channelsDisplay}
            </div>
        </div>
    )
}

export default ChannelPage