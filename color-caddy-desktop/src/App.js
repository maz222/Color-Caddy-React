import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import './MiscStyle.css';

import SchemeContainer from './SchemeContainer.js';
import Shades from './Shades.js';
import ModelSelect from './ModelSelect.js';

import ColorEditor from './ColorEditor.js';

class App extends Component {
	constructor(props) {
		super(props);
	}
  	render() {
    	return (
            <div style={{height: "100%", width: "100%", display:"flex", flexDirection:"column"}}>
                <header>
                	<h1>color caddy</h1>
                    <ModelSelect />
                </header>
          		<div id="page" style={{display:"flex", flexGrow:1}}>
                    <div id="sideBar" style={{width: "calc(10% - 20px)", padding:"10px", backgroundColor: "rgb(40,40,40)", height:"calc(100%-20px)", borderRight:"1px solid black"}}>
                    	<Shades keyColor={[180,.5,.4]}/>
                    </div>
                    <div id="mainContent">
                    	<div id="editor" style={{backgroundColor: "rgb(40,40,40)", width: "100%", height: "25%"}}>
                    		<ColorEditor />
                    	</div>
          				<SchemeContainer />
                    </div>
          		</div>
                <div id="footer">
                	<p>made by <a href="#" style={{color:"#2196f3"}}>Ben Rollins</a></p>
                </div>
            </div>
    	);
  	}
}

export default App;
