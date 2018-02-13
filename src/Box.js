import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
  static defaultProps = {
    onBoxClick() {},
  }

  render() {
    let {color, id, onBoxClick, show} = this.props;
    if(!show) {
      color = "#2c3e50";
    }
    return (
      <button className="box" 
              style={{background: color}} 
              onClick={() => onBoxClick(id, show)}
      ></button>
    );
  }
}

export default Box;