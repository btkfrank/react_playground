import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {[...Array(3)].map((item, i) => {
          return (
            <div className="board-row" key={i}>
              {[...Array(3)].map((it, j) => this.renderSquare(i * 3 + j))}
            </div>
          );
        })}
      </div>
    );
  }
}
