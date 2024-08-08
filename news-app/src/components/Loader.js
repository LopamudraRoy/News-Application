import React, { Component } from "react";
import loading from "./Ajax-loader.gif";

export class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading}></img>
      </div>
    );
  }
}

export default Loader;
