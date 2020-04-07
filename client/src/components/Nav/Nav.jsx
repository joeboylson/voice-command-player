import React from 'react';
import PubSub from 'pubsub-js';
import Icon from '../Assets/Icon'

// STYLING
import '../../styling/nav.scss'

const Nav = () => {

    const [isListening, setIsListening] = React.useState(false);

    PubSub.subscribe('TOGGLE_LISTENING', (event, data) => setIsListening(data) );

    return (
        <div id={'nav'}>
            <button
                className={'icon-button'}
                onClick={() => PubSub.publish('TOGGLE_LISTENING', !isListening)}
            >
                <Icon type={isListening ? 'mic' : 'mic_off'}/>
            </button>
        </div>
    )

}

export default Nav;