import React from 'react';
import Video from './Video';
import anycontrol from 'anycontrol';



const App = () => {

    // -1 – unstarted
    // 0 – ended
    // 1 – playing
    // 2 – paused
    // 3 – buffering
    // 5 – video cued
    const [videoStatus, setVideoStatus] = React.useState(-1);
    const [isListening, setIsListening] = React.useState(false);

    const voiceController = new anycontrol()
    voiceController.debug(true)

    const voiceCommands = [
        {command: 'start', effect: () => setVideoStatus(1)},
        {command: 'resume', effect: () => setVideoStatus(1)},
        {command: 'stop', effect: () => setVideoStatus(2)},
        {command: 'pause', effect: () => setVideoStatus(2)}
    ]

    voiceCommands.forEach( ({command, effect} ) => {
        voiceController.addCommand(command, effect)
    })

    React.useEffect(() => {
        if (isListening) return startVoiceController()
        return stopVoiceController()
    }, [isListening])

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
        <div>

            <p>{isListening ? 'Listening' : 'Not Listening'}</p>

            <input 
                type={'checkbox'}
                onChange={(event) => setIsListening(event.target.checked)}    
            />

            <div>
                <h3>AVAILABLE COMMANDS:</h3>
                {
                    voiceCommands.map( ({command}) => {
                        return <p>{command}</p>
                    })
                }
            </div>



            <Video 
                setVideoStatus={setVideoStatus}
                videoStatus={videoStatus}
            />
        </div>
    )
}

export default App;