import { connect } from 'react-redux';
import React, { Component } from 'react';
import ColorScheme from './ColorScheme.js'
import "./SchemeContainerStyle.css"

const COMPLEMENTARY = {title:"Complementary",mods:[[180,0,0],[0,0,0]]};
const ANALGOUS = {title:"Analgous",mods:[[30,0,0],[-30,0,0],[0,0,0]]};
const SPLIT = {title:"Split",mods:[[150,0,0],[210,0,0],[0,0,0]]};
const TRIAD = {title:"Triadic",mods:[[120,0,0],[-120,0,0],[0,0,0]]};
const TETRAD = {title:"Tetradic",mods:[[60,0,0],[180,0,0],[-120,0,0],[0,0,0]]};
const SQUARE = {title:"Square",mods:[[90,0,0],[-90,0,0],[180,0,0],[0,0,0]]};

const DEFAULT_SCHEMES = [COMPLEMENTARY, ANALGOUS, SPLIT, TRIAD, TETRAD, SQUARE];

//Container div for the color Schemes
//props:
	//schemes - array of scheme data (see above)
	//keyColor - the current key color used to generate the schemes
	//
class SchemeContainer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const SCHEMES = this.props.schemes.map((item,i) => <ColorScheme scheme={item} gridID={i+1} keyColor={this.props.keyColor} convert={this.props.convert} />);
		return(
			<div id="schemesContainer">
				{SCHEMES}
			</div>
		);
	}
}
SchemeContainer.defaultProps = {
	schemes: DEFAULT_SCHEMES,
};
function mapStateToProps(state) {
	return({keyColor:state.color, convert:state.convert});
}

export default connect(mapStateToProps)(SchemeContainer);