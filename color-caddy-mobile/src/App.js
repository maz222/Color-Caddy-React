import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MainMenu from './MainMenu.js';
import ColorEditor from './ColorEditor.js';
import ColorScheme from './ColorScheme.js';

const EDITOR = "Editor";
const COMPLEMENTARY = {title:"Complementary",mods:[[180,0,0],[0,0,0]]};
const ANALGOUS = {title:"Analgous",mods:[[30,0,0],[-30,0,0],[0,0,0]]};
const SPLIT = {title:"Split",mods:[[150,0,0],[210,0,0],[0,0,0]]};
const TRIAD = {title:"Triadic",mods:[[120,0,0],[-120,0,0],[0,0,0]]};
const TETRAD = {title:"Tetradic",mods:[[60,0,0],[180,0,0],[-120,0,0],[0,0,0]]};
const SQUARE = {title:"Square",mods:[[90,0,0],[-90,0,0],[180,0,0],[0,0,0]]};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {menuVisible:props.menuVisible, currentContent:props.currentContent, keyColor:props.keyColor};
        this.updateContent = this.updateContent.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.getContent = this.getContent.bind(this);
    }
    updateContent(contentTitle) {
        console.log("new content: " + contentTitle);
        this.setState({menuVisible:!this.state.menuVisible});
        this.setState({currentContent:contentTitle});
    }
    updateColor(color) {
        this.setState({keyColor:color});
    }
    getContent() {
        switch(this.state.currentContent) {
            case EDITOR:
                return(<ColorEditor keyColor={this.state.keyColor} updateColor={this.updateColor}/>);
            case COMPLEMENTARY.title:
                return(<ColorScheme keyColor={this.state.keyColor} scheme={COMPLEMENTARY} />);
            case ANALGOUS.title:
                return(<ColorScheme keyColor={this.state.keyColor} scheme={ANALGOUS} />);
            case SPLIT.title:
                return(<ColorScheme keyColor={this.state.keyColor} scheme={SPLIT} />);
            case TRIAD.title:
                return(<ColorScheme keyColor={this.state.keyColor} scheme={TRIAD} />);
            case TETRAD.title:
                return(<ColorScheme keyColor={this.state.keyColor} scheme={TETRAD} />);
            case SQUARE.title:
                return(<ColorScheme keyColor={this.state.keyColor} scheme={SQUARE} />);
            default: 
                return(<ColorEditor keyColor={this.state.keyColor} updateColor={this.updateColor}/>);
        }
    }
    render() {
        return (
            <div id="app">
                {this.state.menuVisible && <MainMenu setContent={this.updateContent}/>}
                <div id="mainContent">
                    <div id="header">
                        <button type="button" onClick={()=>{this.setState({menuVisible:!this.state.menuVisible});}}><i className="fas fa-bars"></i></button>
                        <h1>Color Caddy</h1>
                    </div>
                    <div id="contentContainer">
                        {this.getContent()}
                    </div>
                </div>
            </div>
        );
    }
}
App.defaultProps = {
    menuVisible:false,
    currentContent:"Split",
    keyColor:[0,100,50]
}
export default App;
