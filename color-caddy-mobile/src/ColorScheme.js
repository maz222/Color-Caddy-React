import React, { Component } from 'react';
import ColorBlock from './ColorBlock.js';

import './ColorSchemeStyle.css';

//div that holds a series of ColorBlocks that represent a color scheme (complementary, triadic, etc)
//clicking on the title of the scheme will hide all the colors inside of it
//props:
    //keyColor - a color value used to generate the scheme
    //Scheme (JSON)
    	//title - the name of the scheme
    	//colorMods - an array of HSL (usually [X,0,0]) values used to determine the colors of the scheme


class ColorScheme extends Component {
    constructor(props) {
        super(props);
        //get the colors representing the color scheme
    }
    render() {
        var colors = []
        for(var m in this.props.scheme.mods) {
            var hue = (this.props.scheme.mods[m][0] + parseInt(this.props.keyColor[0]));
            while(hue < 0) {
                hue = 360 + hue;
            }
            hue = hue % 360;
            var sat = Math.max(Math.min(this.props.scheme.mods[m][1] + this.props.keyColor[1],100),0);
            var light = Math.max(Math.min(this.props.scheme.mods[m][2] + this.props.keyColor[2],100),0);
            colors.push([hue,sat,light]);
        }
        console.log(colors);
    	//maps each color to a ColorBlock component
        const BLOCKS = colors.map(c => <ColorBlock colorInfo={c} style={{height:"100%"}}/>);
        return(
            <div className="colorScheme">
            	{BLOCKS}
            </div>
        );
    }
}
export default ColorScheme;