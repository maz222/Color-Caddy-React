import { connect } from 'react-redux';

import React, { Component } from 'react';
import ColorBlock from './ColorBlock.js';

import './ShadesStyle.css';


//div that holds a series of colorBlocks that represent different shades of a color
//props:
	//stepValue - the difference in lightness between each shade. used to determine how many total shades
		//---Frome Redux container / state
			//keyColor - the color used to determine the various shades. HSL FORMAT ([H,S,L])
    		//converterFunction - a function that takes a HSL value and then converts it to either RGB,HEX, or HSL based on the currently selected model
class Shades extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		var colors = []
		const K_COLOR = this.props.keyColor;
		for(var i=1; i <= parseInt(100/this.props.stepValue);i++) {
			colors.push([K_COLOR[0],K_COLOR[1],(K_COLOR[2]+this.props.stepValue*i)%100]);
		}
		colors.sort(function(a,b){return b[2]-a[2]});
		for(i in colors) {
			colors[i] = this.props.convert(colors[i]);
		}
		return(
			<div id="shadesContainer">
				{colors.map(c=> <ColorBlock colorInfo={c}/> )}
			</div>
		);
	}
}
Shades.defaultProps = {
	stepValue: 10
}
function mapStateToProps(state) {
	return({keyColor:state.color, convert:state.convert});
}

//export default Shades;
export default connect(mapStateToProps)(Shades);