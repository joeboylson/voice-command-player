import React from 'react';
import YouTube from '@u-wave/react-youtube'; // https://www.npmjs.com/package/@u-wave/react-youtube

const Video = (props) => {

    const { 
        setVideoStatus,
        videoStatus
    } = props

    const [player, setPlayer] = React.useState({});

    React.useEffect(() => {
        console.log('PLAYER', player)
    }, [player])

    React.useEffect(() => {
        console.log('VIDEO STATUS', videoStatus)

        switch (videoStatus) {
            case 0:
                return pauseVideo();
            case 1:
                return resumeVideo();
            case 2:
                return pauseVideo();
        }
    }, [videoStatus])

    // onReady	function		Sent when the YouTube player API has loaded.
    // onError	function		Sent when the player triggers an error.
    // onCued	function	() => {}	Sent when the video is cued and ready to play.
    // onBuffering	function	() => {}	Sent when the video is buffering.
    // onPlaying	function	() => {}	Sent when playback has been started or resumed.
    // onPause	function	() => {}	Sent when playback has been paused.
    // onEnd	function	() => {}	Sent when playback has stopped.
    // onStateChange	function

    const onPlaying = (event) => setVideoStatus(event.data);
    const onPause = (event) => console.log('ON PAUSE', event);
    const onEnd = (event) => console.log('ON END', event);

    const pauseVideo = () => {
        try {
            player.pauseVideo()
        } catch(e) {
            console.log('PAUSE VIDEO ERROR', e)
        }
    }

    const resumeVideo = () => {
        try {
            player.playVideo();
        } catch(e) {
            console.log('RESUME VIDEO ERROR', e)
        }
    }

    return (
        <main>

            <YouTube
                video="Xa0Q0J5tOP0"
                onReady={(event) => setPlayer(event.target)}
                onPlaying={(event) => setVideoStatus(event.data)}
                onPause={(event) => setVideoStatus(event.data)}
                onEnd={(event) => setVideoStatus(event.data)}
            />

            <button onClick={pauseVideo}>PAUSE</button>
            <button onClick={resumeVideo}>START</button>

        </main>
    )
}

export default Video;