import React, { Component } from 'react';

import {HSLtoHEX} from './UtilityFunctions.js';

import './ColorBlockStyle.css';
//colored div that is displayed/stored within a scheme container
//takes a HSL color and converts it to HEX / displays it inside the block for easy reference

//props:
    //colorInfo - HSL value representing the color stored in the block


class ColorBlock extends Component {
    constructor(props) {
        super(props);
        //more in CSS file!
    }
    render() {
        //change this to get either black or white based on contrast
        var FONT_STYLE = {};
        if(this.props.colorInfo[2] >= 50) {
            FONT_STYLE = {color:"black"};
        }
        else {
            FONT_STYLE = {color:"white"};
        }
        return(
            <div className="colorBlock" style={{backgroundColor:HSLtoHEX(this.props.colorInfo)}}>
                <h4 style={FONT_STYLE}>{HSLtoHEX(this.props.colorInfo)}</h4>
            </div>
        );
    }
}

export default ColorBlock;