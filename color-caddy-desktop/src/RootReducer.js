// -- Action Type Constants --
const SET_HSL = 'SET HSL';
const SET_RGB = 'SET RGB';
const SET_HEX = 'SET HEX';

const SET_COLOR = 'SET COLOR';
const SET_FORMAT = 'SET FORMAT';

// -- Conversion Functions --
const convertHSL = (hsl) => {
	var temp = hsl.slice(); 
	temp[1] = hsl[1] + "%";
	temp[2] = hsl[2] + "%";
	return("hsl(" + temp.join() + ")");	
}

const convertRGB = (hsl) => {
	var temp = HSLtoRGB(hsl);
	return("rgb(" + temp.join() + ")"); 
}

const convertHEX = (hsl) => {
	var rgb = HSLtoRGB(hsl);
	function RGBColortoHEX(colorVal) {
		colorVal = parseInt(colorVal).toString(16).toUpperCase();
		if(colorVal.length < 2) {
			colorVal = "0" + colorVal;
		}
		return colorVal;
	}
	var temp = [RGBColortoHEX(rgb[0]), RGBColortoHEX(rgb[1]), RGBColortoHEX(rgb[2])];
	return ("#" + temp.join(''));
}

//IN: rgb - [(0-255),(0-255),(0-255)]
//OUT: hsl - [(0-360),(0-100),(0-100)]
const RGBtoHSL = (rgb) => {
	rgb[0] /= 255;
	rgb[1] /= 255;
	rgb[2] /= 255;
	var max = Math.max(...rgb);
	var min = Math.min(...rgb);
	var h = (max + min) / 2;
	var s = (max + min) / 2;
	var l = (max + min) / 2;
	if(max == min) {
		h = 0;
		s = 0;
	}
	else {
		var delta = max - min;
		s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
		switch(max) {
			case rgb[0]:
				h = (rgb[1] - rgb[2]) / delta + (rgb[1] < rgb[2] ? 6 : 0);
				break;
			case rgb[1]:
				h = (rgb[2] - rgb[0]) / delta + 2;
				break;
			case rgb[2]:
				h = (rgb[0] - rgb[1]) / delta + 4;
				break;
		}
		h /= 6;
	}
	return [Math.round(h*360),Math.round(s*100*10)/10,Math.round(l*100*10)/10];
}

const HSLtoRGB = (hsl) => {
	function toFixed(num, fixed) {
    	var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    	return num.toString().match(re)[0];
	}

	var h = parseFloat(toFixed(hsl[0] / 360, 4));
	var s = parseFloat(toFixed(hsl[1] / 100, 4));
	var l = parseFloat(toFixed(hsl[2] / 100, 4));
  	var r, g, b;

 	if (s == 0) {
    	r = g = b = l; // achromatic
  	} 
  	else {
    	function hue2rgb(p, q, t) {
      		if (t < 0) t += 1;
      		if (t > 1) t -= 1;
      		if (t < 1/6) return p + (q - p) * 6 * t;
      		if (t < 1/2) return q;
      		if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      		return p;
    	}

    	var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    	var p = 2 * l - q;

    	r = hue2rgb(p, q, h + 1/3);
    	g = hue2rgb(p, q, h);
    	b = hue2rgb(p, q, h - 1/3);
  	}
  	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function HEXtoRGB(hex) {
    var rgb = [parseInt(hex[0], 16), parseInt(hex[1], 16), parseInt(hex[2], 16)];
	return rgb;
}

// -- Action Creators --
const setColor = (newColor) => {
	return({
		type:SET_COLOR,
		color:newColor
	});
}
//updates the key color based on a HSL value
const setHSL = (newHSL) => {
	return({
		type:SET_HSL,
		hsl:newHSL
	});
}
//updates the key color based on a RGB value
const setRGB = (newRGB) => {
	return({
		type:SET_RGB,
		rgb:newRGB
	});
}
//updates the key color based on a HEX value
const setHEX = (newHEX) => {
	return({
		type:SET_HEX,
		hex:newHEX
	});
}
//updates the current format of the colors
const setFormat = (newFormat) => {
	return({
		type:SET_FORMAT,
		format:newFormat
	});
}

const DEFAULT_STATE = {
	color:[90,5,4],
	convert: convertHSL,
	format:"hsl"
}


const reducer = (state=DEFAULT_STATE,action) => {
	switch(action.type) {
		case SET_COLOR:
			return({color:action.color, convert:state.convert, format:state.format});
		case SET_HSL:
			return({color:action.hsl, convert:state.convert, format:state.format});
		case SET_RGB:
			var hsl = RGBtoHSL(action.rgb.slice());
			return({color:hsl, convert:state.convert, format:state.format});
		//FINISH ME
		case SET_HEX:
			//#123
			var hex;
			if(action.hex.length == 4) {
				hex = [action.hex.slice(1,2),action.hex.slice(2,3),action.hex.slice(3,4)];
			}
			//#0F0F0F
			else if(action.hex.length == 7) {
				hex = [action.hex.slice(1,3),action.hex.slice(3,5),action.hex.slice(5,7)];
			}
			else {
				return state;
			}
			return({color:RGBtoHSL(HEXtoRGB(hex)), convert:state.convert, format:state.format});
		case SET_FORMAT:
			switch(action.format) {
				case "hsl":
					return({color:state.color, convert:convertHSL, format:"hsl"});
					break;
				case "rgb":
					return({color:state.color, convert:convertRGB, format:"rgb"});
					break;
				case "hex":
					return({color:state.color, convert:convertHEX, format:state.format});
					break;
			}
		default:
			return state;
	}
}

export default reducer;
export {setHSL, setRGB, setHEX};
export {setFormat};
export {HSLtoRGB, convertHEX};