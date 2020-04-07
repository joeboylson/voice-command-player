import React from 'react';
import PubSub from 'pubsub-js';
import {isEmpty} from 'lodash';

const Slider = (props) => {

    const {player, markers} = props

    const [time, setTime] = React.useState(0);
    React.useEffect(() => {
        if (isEmpty(player)) return;
        const timer = window.setInterval(() => {
            setTime(player.getCurrentTime());
        }, 1000);
        
        return () => window.clearInterval(timer)
    }, [player]);

    const seek = (toTime) => {
        setTime(toTime)
        PubSub.publish('SEEK_VIDEO', toTime)
    }

    return (
        <div className={'slider'}>

            <div class={'marker-wrapper'}>
                { markers.map((marker, index) => {
                    return <span 
                        className={'marker'}
                        style={{left: `calc(${isEmpty(player) ? '16px' : (marker.time / player.getDuration()) * 100}% - 16px)`}}
                        onClick={() => PubSub.publish('SEEK_VIDEO', marker.time - 3)}
                    >{index}</span>
                })}
            </div>

            <input 
                type="range" 
                value={time} 
                min={0}
                max={isEmpty(player) ? 0 : player.getDuration()}
                onChange={(e) => seek(Number(e.target.value))}
            />
        </div>
    );
}

export default Slider