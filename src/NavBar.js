import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./NavBar.css"

class NavBar extends Component {
  static defaultProps = {
    onNewGame() {},
    handleSubmit() {}
  }

  static propTypes = {
    onNewGame: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {num:16}
  }
  
  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state.num)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Number of boxes</label>
          </div>
          <select className="custom-select" name="num" defaultValue="16" onChange = {(e) => {this.setState({[e.target.name]: e.target.value})}}> 
            <option value="4">4</option> 
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-warning" type="submit">New Game</button>
          </div>
        </div>
      </form>
    );
  }
}


export default NavBar;
