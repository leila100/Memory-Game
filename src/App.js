import React, { Component } from 'react';
import Box from './Box';
import NavBar from './NavBar';
import './App.css';

const NUM_COLORS = 8;

class App extends Component {

  constructor(props) {
    super(props);
    const boxList = this.getBoxes(NUM_COLORS);
    this.state = {boxList, turn:1, box1ID:0};
    this.onBoxClick = this.onBoxClick.bind(this);
    this.checkPair = this.checkPair.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBoxes = this.getBoxes.bind(this);
  }

  getBoxes(num) {
    const colorSet = new Set();
    while (colorSet.size < num) {
      colorSet.add(this.getAllRandomColor());
    }
    const colorList = Array.from(colorSet);
    const shuffleArray = arr => arr.slice().sort(() => Math.random() - 0.5);
    const boxColorList = shuffleArray([...colorList, ...colorList]);
    const boxList = boxColorList.map((color, id) => ({color, id, show:false}));
    return boxList;
  }
  
  getAllRandomColor() {
    let colorIndex = Math.floor(Math.random() * this.props.allColors.length);
    return this.props.allColors[colorIndex];
  }
  
  onBoxClick(id, show) {
    if(!show) {
      const boxList = this.state.boxList.map((box, i) => { 
        if(i === id) {
          box.show = true;
        }
        return box;
      });
      this.setState({boxList});
      setTimeout(() => {
        this.checkPair(id);
      }, 700);
    }
  }
  
  checkPair(id) {
    if(this.state.turn === 1) {
      this.setState({box1ID: id});
      this.setState({turn: 2});
    } else {
      const boxList = [...this.state.boxList]; 
      if(boxList[id].color !== boxList[this.state.box1ID].color) { //if no match
          boxList[id].show = false;
          boxList[this.state.box1ID].show = false;
      }
      this.setState({boxList});
      this.setState({turn: 1});
    }
  }
  
  handleSubmit(e, num) {
    this.onNewGame(e, num);
  }
  
  onNewGame(e, num) {
    e.preventDefault();
    const boxList = this.getBoxes(num/2);
    console.log(boxList);
    this.setState({boxList, turn:1, box1ID:0});
  }

  render() {
    const boxList = this.state.boxList.map((box) => (
      <Box key={box.id} {...box} onBoxClick={this.onBoxClick}/>
    ));
    return (
      <div className="container">
        <div >
          <div className="list">
            <h1 className="display-4">MEMORY GAME</h1>
            {boxList}
          </div>
          <NavBar  onNewGame={this.onNewGame} handleSubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"]
};

export default App;
