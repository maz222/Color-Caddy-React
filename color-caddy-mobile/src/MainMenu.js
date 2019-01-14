import React, { Component } from 'react';

import './MainMenuStyle.css';

class MainMenu extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div id="mainMenu">
				<button type="button" id="editorButton" value="Editor" onClick={(e)=>{this.props.setContent(e.target.value);}}>Editor</button>
				<hr />
				<button type="button" className="schemeButton" value="Complementary" onClick={(e)=>{this.props.setContent(e.target.value);}}>Complementary</button>
				<hr />
				<button type="button" className="schemeButton" value="Split" onClick={(e)=>{this.props.setContent(e.target.value);}}>Split</button>
				<hr />
				<button type="button" className="schemeButton" value="Triadic" onClick={(e)=>{this.props.setContent(e.target.value);}}>Triadic</button>
				<hr />
				<button type="button" className="schemeButton" value="Tetradic" onClick={(e)=>{this.props.setContent(e.target.value);}}>Tetradic</button>
				<hr />
				<button type="button" className="schemeButton" value="Square" onClick={(e)=>{this.props.setContent(e.target.value);}}>Square</button>
			</div>
		);
	}
}

export default MainMenu;