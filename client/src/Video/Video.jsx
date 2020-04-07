import React from 'react';
import YouTube from '@u-wave/react-youtube'; // https://www.npmjs.com/package/@u-wave/react-youtube
import PubSub from 'pubsub-js';

// PLAYER
import {pausePlayer, playPlayer} from '../../js/player';

const Video = () => {

    const [player, setPlayer] = React.useState({});

    PubSub.subscribe('PAUSE_VIDEO', () => pausePlayer(player) );
    PubSub.subscribe('PLAY_VIDEO', () => playPlayer(player) );

    return (
        <main>

            <YouTube
                video="Xa0Q0J5tOP0"
                onReady={(event) => setPlayer(event.target)}
            />

        </main>
    )
}

export default Video;