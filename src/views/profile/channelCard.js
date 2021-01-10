import React, {useEffect, useState} from 'react'
import firebase from 'firebase'

const ChannelCard = (props) => {

    const [channelTitle, setChannelTitle] = useState("")
    const [numBlocks, setNumBlocks] = useState("")

    useEffect(() => {
        props.db.collection('channels').doc(props.id).get().then(function(doc) {
            console.log(doc.data().title)
            if(doc.data().title!=undefined) {
                setChannelTitle(doc.data().title)
            } 
            if(doc.data().numBlocks!=undefined) {
                setNumBlocks(doc.data().numBlocks)
            } 
        })
    })

    return(
        <div>
            {props.id}
        </div>
    )
}

export default ChannelCard