import React from 'react';
import anycontrol from 'anycontrol';
import PubSub from 'pubsub-js';

import Video from '../Video/Video';
import Slider from '../Assets/Slider'
import Nav from '../Nav/Nav'
import Icon from '../Assets/Icon'

// STYLING
import '../../styling/app.scss'

const App = () => {

    // -1 – unstarted
    // 0 – ended
    // 1 – playing
    // 2 – paused
    // 3 – buffering
    // 5 – video cued

    const voiceController = new anycontrol()
    voiceController.debug(true)

    const voiceCommands = [
        {command: 'start', effect: () => PubSub.publish('PLAY_VIDEO') },
        {command: 'resume', effect: () => PubSub.publish('PLAY_VIDEO') },
        {command: 'stop', effect: () => PubSub.publish('PAUSE_VIDEO') },
        {command: 'pause', effect: () => PubSub.publish('PAUSE_VIDEO') }
    ]

    voiceCommands.forEach( ({command, effect} ) => {
        voiceController.addCommand(command, effect)
    })

    PubSub.subscribe('TOGGLE_LISTENING', (event, isListening) => {
        if (isListening) return startVoiceController();
        stopVoiceController();
    });

    const startVoiceController = () => {
        try {
            voiceController.start()
        } catch(e) {
            console.log(e)
        }
    }

    const stopVoiceController = () => {
        try {
            voiceController.stop()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <main>

            <Nav />

            <div id={'main-content'}>

                <Video/>

                <button 
                    className={'icon-button'}
                    onClick={() => { 
                        console.log('play')
                        PubSub.publish('PLAY_VIDEO') 
                    }}
                >
                        <Icon type={'play_arrow'}/>
                </button>

                <button 
                    className={'icon-button'}
                    onClick={() => { PubSub.publish('PAUSE_VIDEO') }}
                >
                    <Icon type={'pause'}/>    
                </button>

            </div>

        </main>
    )
}

export default App;