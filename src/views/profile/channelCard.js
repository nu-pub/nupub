import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'

const ChannelCard = (props) => {

    const [channelTitle, setChannelTitle] = useState(props.title)
    const [numBlocks, setNumBlocks] = useState("")

    useEffect(() => {
        
    })

    return(
        <div>
            <Link to={'/channel/'+ props.channelId}>
                {channelTitle}
            </Link>
        </div>
    )
}

export default ChannelCard