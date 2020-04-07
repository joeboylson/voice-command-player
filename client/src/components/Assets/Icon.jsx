import React from 'react';
import PropTypes from 'prop-types';

// https://material.io/resources/icons/?style=baseline
const Icon = (props) => {

    return (
        <div className={'icon-wrapper'}>
            <i class='material-icons'>{props.type}</i>
        </div>
    )

}

Icon.propTypes = {
    type: PropTypes.string
};

export default Icon;