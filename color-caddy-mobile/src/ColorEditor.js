import React, { Component } from 'react';
import ColorBlock from './ColorBlock.js';

import './EditorStyle.css';
import {HSLtoHEX, RGBtoHSL, HEXtoRGB, HSLtoRGB} from './UtilityFunctions.js';

const validHEXFont = "rgb(10,10,10)";
const invalidHEXFont = "red";

class ColorEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {hsl:this.props.keyColor, rgb:HSLtoRGB(this.props.keyColor), hex:HSLtoHEX(this.props.keyColor), hexFont:validHEXFont};
		this.setFromHEX = this.setFromHEX.bind(this);
		this.setFromRGB = this.setFromRGB.bind(this);
		this.setFromHSL = this.setFromHSL.bind(this);
	}
	setFromHEX(value) {
		const RGB = HEXtoRGB(value);
		const HSL = RGBtoHSL(RGB);
		this.setState({rgb:RGB});
		this.setState({hsl:HSL});
		this.props.updateColor(this.state.hsl);
	}
	setFromRGB() {
		const HSL = RGBtoHSL(this.state.rgb);
		const HEX = HSLtoHEX(HSL);
		this.setState({hsl:HSL});
		this.setState({hex:HEX});
		this.props.updateColor(this.state.hsl);
	}
	setFromHSL() {
		const RGB = HSLtoRGB(this.state.hsl);
		const HEX = HSLtoHEX(this.state.hsl);
		this.setState({rgb:RGB});
		this.setState({hex:HEX});
		this.props.updateColor(this.state.hsl);
	}
	render() {

		var currColor = this.state.hsl.slice();
		currColor[1] = currColor[1] + "%";
		currColor[2] = currColor[2] + "%";
		currColor = "hsl(" + currColor.join() + ")";
		const style = {backgroundColor:currColor};

		return(
			<div className="container">
				<div className="editorPanel">
					<div id="overview">
						<div id="colorDisplay" style={style} />
					</div>
				</div>
				<div className="editorPanel" id="hexPanel">
					<h2>HEX</h2>
					<input type="text" placeholder="eg: (#0F0F0F)" id="HEXField" value={this.state.hex} style={{color:this.state.hexFont}} onInput={
						(e) => {									
								if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.target.value)){
									this.setState({hexFont:validHEXFont});
									this.setFromHEX(e.target.value);
								} 
								else{
									this.setState({hexFont:invalidHEXFont});
								}
								this.setState({hex:e.target.value});

					}}/>
				</div>
				<div className="editorPanel" id="hslEditor">
					<h2>HSL</h2>
					<input type="range" className="slider" id="hueSlider" min="0" max="100" value={this.state.hsl[0]} onChange={
						(e) => {this.setState({hsl:[e.target.value,this.state.hsl[1],this.state.hsl[2]]});
								this.setFromHSL();}}/>
					<input type="range" className="slider" id="satSlider" min="0" max="100" value={this.state.hsl[1]} onChange={
						(e) => {this.setState({hsl:[this.state.hsl[0],e.target.value,this.state.hsl[2]]});
								this.setFromHSL();}}/>
					<input type="range" className="slider" id="lightSlider" min="0" max="100" value={this.state.hsl[2]} onChange={
						(e) => {this.setState({hsl:[this.state.hsl[0],this.state.hsl[1],e.target.value]});
								this.setFromHSL();}}/>
				</div>
				<div className="editorPanel" id="rgbEditor">
					<h2>RGB</h2>
					<input type="range" className="slider" id="redSlider" min="0" max="255" value={this.state.rgb[0]} onChange={
						(e) => {this.setState({rgb:[e.target.value,this.state.rgb[1],this.state.rgb[2]]});
								this.setFromRGB();}}/>
					<input type="range" className="slider" id="greenSlider" min="0" max="255" value={this.state.rgb[1]} onChange={
						(e) => {this.setState({rgb:[this.state.rgb[0],e.target.value,this.state.rgb[2]]});
								this.setFromRGB();}}/>
					<input type="range" className="slider" id="blueSlider" min="0" max="255" value={this.state.rgb[2]} onChange={
						(e) => {this.setState({rgb:[this.state.rgb[0],this.state.rgb[1],e.target.value]});
								this.setFromRGB();}}/>
				</div>
			</div>
		);
	}
}
export default ColorEditor;