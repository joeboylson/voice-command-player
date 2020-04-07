import React from 'react';
import YouTube from '@u-wave/react-youtube'; // https://www.npmjs.com/package/@u-wave/react-youtube
import PubSub from 'pubsub-js';
import {isEmpty} from 'lodash'

// STYLING
import '../../styling/video.scss'
import Slider from '../Assets/Slider';

const Video = () => {

    const [player, setPlayer] = React.useState({});

    const pausePlayer = () => {
        console.log(player)
        if (!isEmpty(player)) return player.pauseVideo();
    }
    
    const playPlayer = () => {
        console.log(player)
        if (!isEmpty(player)) return player.playVideo();
    }

    const seekTo = (time) => {
        if (!isEmpty(player)) return player.seekTo(time);
    }

    PubSub.subscribe('PAUSE_VIDEO', () => pausePlayer(player) );
    PubSub.subscribe('PLAY_VIDEO', () => playPlayer(player) );
    PubSub.subscribe('SEEK_VIDEO', (event, data) => seekTo(data))

    React.useState(() => {
        if (!isEmpty(player)) {
            player.hideVideoInfo()

            setInterval(() => {
                console.log(player.getCurrentTime())
            }, 1000)
        }
    }, [player])

    const markers = isEmpty(player) ? [] : [
        {time: Math.random() * player.getDuration()},
        {time: Math.random() * player.getDuration()},
        {time: Math.random() * player.getDuration()},
        {time: Math.random() * player.getDuration()},
        {time: Math.random() * player.getDuration()},
        {time: Math.random() * player.getDuration()},
    ]


    return (

        <div>

            <YouTube
                id={'video'}
                video="Xa0Q0J5tOP0"
                onReady={(event) => setPlayer(event.target)}
                modestBranding={true}
                showCaptions={false}
                controls={false}
                annotations={false}
                />

            <Slider 
                player={player} 
                markers={markers}    
            />

        </div>
    )
}

export default Video;