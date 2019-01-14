import React, { Component } from 'react';
import ColorBlock from './ColorBlock.js';

import './EditorStyle.css';

import { connect } from 'react-redux';

import {setHSL, setRGB, setHEX} from './RootReducer.js';
import {HSLtoRGB, convertHEX} from './RootReducer.js';

const validFontColor = "black";
const invalidFontColor = "red";

class ColorEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {hexValue:convertHEX(props.keyColor), hexFontColor:validFontColor};
	}
	checkHEXvalue(value) {
		this.setState({hexValue:value});
		if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value)) {
			this.setState({hexFontColor:validFontColor});
			this.props.setHEX(value);
		}
		else {
			this.setState({hexFontColor:invalidFontColor});
		}
	}
	componentWillReceiveProps(nextProps) {
        if(nextProps.keyColor != this.props.keyColor) {
            this.setState({hexValue:convertHEX(nextProps.keyColor)});
        }
    }
	render() {
		const HSL = <HSLEditor setHSL={this.props.setHSL} hue={this.props.keyColor[0]} sat={this.props.keyColor[1]} light={this.props.keyColor[2]}/>;
		const rgbColor = HSLtoRGB(this.props.keyColor);
		const RGB = <RGBEditor setRGB={this.props.setRGB} red={rgbColor[0]} green={rgbColor[1]} blue={rgbColor[2]}/>
		var modelEditor = null;
		switch(this.props.currentModel) {
			case "hsl":
				modelEditor = HSL;
				break;
			case "rgb":
				modelEditor = RGB;
				break;
		}
		return(
			<div id="colorEditor">
				<div id="colorDisplay">
					<ColorBlock colorInfo={this.props.convert(this.props.keyColor)} />
					<div id="hexContainer">
						<label>Hex:</label>
						<input type="text" id="hexField" value={this.state.hexValue} onChange={(e) => {this.checkHEXvalue(e.target.value)}} style={{color:this.state.hexFontColor}}/>
					</div>
				</div>
				{modelEditor}
			</div>
		);
	}
}
ColorEditor.defaultProps = {
	currentModel: "hsl"
}
function mapStateToProps(state) {
	return({
		keyColor:state.color, 
		convert:state.convert,
		currentModel:state.format});
}
function mapDispatchToProps(dispatch) {
	return({
		setHSL:(hsl) => {dispatch(setHSL(hsl))},
		setRGB:(rgb) => {dispatch(setRGB(rgb))},
		setHEX:(hex) => {dispatch(setHEX(hex))}
	});
}




class RGBEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {red:props.red, green:props.green, blue:props.blue,
			redTextColor:validFontColor, blueTextColor:validFontColor, greenTextColor:validFontColor,
			redField:props.red, greenField:props.green, blueField:props.blue};
	}
	checkRGBValue(value) {
		if(isNaN(value) || value.length == 0) {
			return null;
		}
		return Math.max(0,Math.min(value,255));
	}
	render() {
		return(
			<div id="RGBEditor" className="editor">
				<div className="sliderContainer">
					<input type="text" id="redField" className="sliderField" value={this.state.redField} style={{color:this.state.redTextColor}} placeholder="red (0-255)" onChange={(e) => {
						var val = this.checkRGBValue(e.target.value);
						if(val != null) {
							this.props.setRGB([val, this.state.green, this.state.blue]);
							this.setState({redTextColor:validFontColor});
							this.setState({red:val});
							this.setState({redField:val});
						}
						else {
							this.setState({redTextColor:invalidFontColor});
							this.setState({redField:e.target.value});
						}
					}}/>
					<input type="range" min="0" max="255" id="redSlider" className="slider" value={this.state.red} onChange={(e) => {
						this.setState({red:e.target.value});
						this.setState({redField:e.target.value});
						this.setState({redTextColor:validFontColor});
						this.props.setRGB([e.target.value, this.state.green, this.state.blue]);
					}}/>
				</div>
				<div className="sliderContainer">
					<input type="text" id="greenField" className="sliderField" value={this.state.greenField} style={{color:this.state.greenTextColor}} placeholder="green (0-255)" onChange={(e) => {
						var val = this.checkRGBValue(e.target.value);
						if(val != null) {
							this.props.setRGB([this.state.red, val, this.state.blue]);
							this.setState({greenTextColor:validFontColor});
							this.setState({green:val});
							this.setState({greenField:val});
						}
						else {
							this.setState({greenTextColor:invalidFontColor});
							this.setState({greenField:e.target.value});
						}
					}}/>
					<input type="range" min="0" max="255" id="greenSlider" className="slider" value={this.state.green} onChange={(e) => {
						this.setState({green:e.target.value});
						this.setState({greenField:e.target.value});
						this.setState({greenTextColor:validFontColor});
						this.props.setRGB([this.state.red, e.target.value, this.state.blue]);
					}}/>
				</div>
				<div className="sliderContainer">
					<input type="text" id="blueField" className="sliderField" value={this.state.blueField} style={{color:this.state.blueTextColor}} placeholder="blue (0-255)" onChange={(e) => {
						var val = this.checkRGBValue(e.target.value);
						if(val != null) {
							this.props.setRGB([this.state.red, this.state.green, val]);
							this.setState({blueTextColor:validFontColor});
							this.setState({blue:val});
							this.setState({blueField:val});
						}
						else {
							this.setState({blueTextColor:invalidFontColor});
							this.setState({blueField:e.target.value});
						}
					}}/>
					<input type="range" min="0" max="255" id="blueSlider" className="slider" value={this.state.blue} onChange={(e) => {
						this.setState({blue:e.target.value});
						this.setState({blueField:e.target.value});
						this.setState({blueTextColor:validFontColor});
						this.props.setRGB([this.state.red, this.state.green, e.target.value]);
					}}/>
				</div>
			</div> 
		);
	}
}
RGBEditor.defaultProps = {
	red: 0,
	green:0,
	blue:0,
};

class HSLEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {hue:props.hue ,sat:props.sat ,light:props.light,
			hueFieldColor:validFontColor, satFieldColor:validFontColor, lightFieldColor:validFontColor,
			hueField:props.hue, satField:props.sat, lightField:props.light};
	}
	checkHSLValue(value, maxValue=100) {
		if(isNaN(value) || value.length == 0) {
			return null;
		}
		return Math.max(0,Math.min(value,maxValue));
	}
	render() {
		return(
			<div id="HSLEditor" className="editor">
				<div className="sliderContainer">
					<label>Hue:</label>
					<input type="text" id="hueField" className="sliderField" placeholder="hue (0-360)" value={this.state.hueField} style={{color:this.state.hueFieldColor}} onChange={(e) => {
						this.setState({hueField:e.target.value});
						var val = this.checkHSLValue(e.target.value, 360);
						if(val != null) {
							this.setState({hueFieldColor:validFontColor});
							this.setState({hue:val});
							this.setState({hueField:val});
							this.props.setHSL([val, this.state.sat, this.state.light]);
						}
						else {
							this.setState({hueFieldColor:invalidFontColor});
							this.setState({hueField:e.target.value});
						}
					}}/>
					<input type="range" min="0" max="360" id="hueSlider" className="slider" value={this.state.hue} onChange={(e) => {
						var val = this.checkHSLValue(e.target.value, 360);
						this.setState({hue:val});
						this.setState({hueField:val});
						this.setState({hueFieldColor:validFontColor});
						this.props.setHSL([val, this.state.sat, this.state.light]);
					}}/>
				</div>
				<div className="sliderContainer">
					<label>Saturation:</label>
					<input type="text" id="satField" className="sliderField" placeholder="saturation (0-100)" value={this.state.satField} style={{color:this.state.satFieldColor}} onChange={(e) => {
						this.setState({satField:e.target.value});
						var val = this.checkHSLValue(e.target.value);
						if(val != null) {
							this.setState({satFieldColor:validFontColor});
							this.setState({sat:val});
							this.setState({satField:val});
							this.props.setHSL([this.state.hue, val, this.state.light]);
						}
						else {
							this.setState({satFieldColor:invalidFontColor});
							this.setState({satField:e.target.value});
						}
					}}/>
					<input type="range" min="0" max="100" id="satSlider" className="slider" value={this.state.sat} onChange={(e) => {
						var val = this.checkHSLValue(e.target.value);
						this.setState({sat:val});
						this.setState({satField:val});
						this.setState({satFieldColor:validFontColor});
						this.props.setHSL([this.state.hue, val, this.state.light]);
					}}/>
				</div>
				<div className="sliderContainer">
					<label>Lightness:</label>
					<input type="text" id="lightField" className="sliderField" placeholder="lightness (0-100)" value={this.state.lightField} style={{color:this.state.lightFieldColor}} onChange={(e) => {
						this.setState({lightField:e.target.value});
						var val = this.checkHSLValue(e.target.value);
						if(val != null) {
							this.setState({lightFieldColor:validFontColor});
							this.setState({light:val});
							this.setState({lightField:val});
							this.props.setHSL([this.state.hue, this.state.sat, val]);
						}
						else {
							this.setState({lightFieldColor:invalidFontColor});
							this.setState({lightField:e.target.value});
						}
					}}/>
					<input type="range" min="0" max="100" id="lightSlider" className="slider" value={this.state.light} onChange={(e) => {
						var val = this.checkHSLValue(e.target.value);
						this.setState({light:val});
						this.setState({lightField:val});
						this.setState({lightFieldColor:validFontColor});
						this.props.setHSL([this.state.hue, this.state.sat, val]);
					}}/>
				</div>
			</div> 
		);
	}
}
HSLEditor.defaultProps = {
	hue: 0,
	sat: 0,
	light: 0,
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorEditor);
