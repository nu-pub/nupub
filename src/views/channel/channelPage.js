import React, { useState } from 'react'

const ChannelPage = (props) => {
    return(
        <div>
            {props.match.params.channelId}
        </div>
    )
}

export default ChannelPage