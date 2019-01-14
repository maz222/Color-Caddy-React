import React, { Component } from 'react';
import "./ModelSelectStyle.css";

import { connect } from 'react-redux';

import { setFormat } from './RootReducer.js';

class ModelSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {currentModel:props.currentModel, contentDispay:"none"};
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onMouseEnter() {
		this.setState({contentDispay:"block"});
	}
	onMouseLeave() {
		this.setState({contentDispay:"none"});
	}
	render() {
		return (
			<div className="dropdown" id="modelSelect">
				<button className="dropbtn" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>color format<i className="fas fa-caret-down"></i></button>
				<div className="dropdown-content" style={{display:this.state.contentDispay}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
					<a href="#" onClick={() => {this.setState({contentDispay:"none"});this.props.setFormat("rgb");}}>RGB</a>
					<a href="#" onClick={() => {this.setState({contentDispay:"none"});this.props.setFormat("hex");}}>HEX</a>
					<a href="#" onClick={() => {this.setState({contentDispay:"none"});this.props.setFormat("hsl");}}>HSL</a>
				</div>
			</div>
		);
	}
}
ModelSelect.defaultProps = {
	currentModel: "hsl"
}
function mapDispatchToProps(dispatch) {
	return({
		setFormat:(format) => {dispatch(setFormat(format))}
	})
}
export default connect(null,mapDispatchToProps)(ModelSelect);