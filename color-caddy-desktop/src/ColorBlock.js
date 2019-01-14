import React, { Component } from 'react';
import './ColorBlockStyle.css';

const copy = require('clipboard-copy');

//colored div that is displayed/stored within a scheme container
//shows color information (eg: "rgb(40,23,230)") when hovered
//copies information to clipboard when clicked

//props:
    //colorInfo - (eg: "rgb(40,23,230)")

class ColorBlock extends Component {
    constructor(props) {
        super(props);
        //more in CSS file!
        this.state = {info:props.colorInfo};
        this.styling = {
            backgroundColor: this.props.colorInfo
        };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onMouseEnter() {
        this.styling = {
            backgroundColor: "black"
        };
        this.setState({info:" - click to copy - "});
    }
    onMouseLeave() {
        this.styling = {
            backgroundColor: this.props.colorInfo,
        };
        this.setState({info:this.props.colorInfo});
    }
    onClick() {
        this.setState({info:" - copied! - "})
        copy(this.props.colorInfo);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.colorInfo != this.props.colorInfo) {
            this.setState({info:nextProps.colorInfo});
            this.styling = {
                backgroundColor: nextProps.colorInfo
            };
        }
    }
    render() {
        //change this to get either black or white based on contrast
        const FONT_STYLE = {color:"white"};
        return(
            <div className="colorBlock" style={this.styling} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
                <h4 style={FONT_STYLE}>{this.state.info}</h4>
            </div>
        );
    }
}

export default ColorBlock;