import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'

const BlockCard = (props) => {

    const [blockTitle, setBlockTitle] = useState(props.title)

    useEffect(() => {
        
    })

    return(
        <div className="channelCard">
            <Link to={`/block/${props.blockId}`}>
                {blockTitle}
            </Link>
        </div>
    )
}

export default BlockCard