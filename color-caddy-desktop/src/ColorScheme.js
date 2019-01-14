import React, { Component } from 'react';
import ColorBlock from './ColorBlock.js';

import './ColorSchemeStyle.css';

//div that holds a series of ColorBlocks that represent a color scheme (complementary, triadic, etc)
//props:
    //gridID - the id of the grid cell used for css grid layout
    //keyColor - a color value used to generate the scheme
    	//--From Redux container / state
    		//convert() - a function that takes a HSL value and then converts it to either RGB,HEX, or HSL based on the currently selected model
    		//Scheme (JSON)
    		    //title - the name of the scheme
    			//colorMods - an array of HSL (usually [X,0,0]) values used to determine the colors of the scheme


class ColorScheme extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    	//get the colors representing the color scheme
    	var colors = []
    	for(var m in this.props.scheme.mods) {
    		var hue = (this.props.scheme.mods[m][0] + parseInt(this.props.keyColor[0]));
            while(hue < 0) {
                hue = 360 + hue;
            }
            hue = hue % 360;
    		var sat = Math.max(Math.min(this.props.scheme.mods[m][1] + this.props.keyColor[1],100),0);
			var light = Math.max(Math.min(this.props.scheme.mods[m][2] + this.props.keyColor[2],100),0);
			colors.push(this.props.convert([hue,sat,light]));
    	}
    	//maps each color to a ColorBlock component
        const BLOCKS = colors.map(c => <ColorBlock colorInfo={c} style={{height:"100%"}}/>);
        return(
            <div className="colorScheme" id={"grid"+this.props.gridID.toString()}>
            	<h2>{this.props.scheme.title}</h2>
            	<div className="blocksContainer">
            		{BLOCKS}
            	</div>
            </div>
        );
    }
}
ColorScheme.defaultProps = {
	convert:(hsl)=>{return("hsl(" + hsl.join() + ")");}
}

export default ColorScheme;