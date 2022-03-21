import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [new Array(9).fill(null)],
      xIsNext: true,
      step: 0,
    };
  }

  handleClick = (i) => {
    const squares = [...this.state.history[this.state.step]];
    if (squares[i] || this.calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: [...this.state.history, squares],
      xIsNext: !this.state.xIsNext,
      step: this.state.step + 1,
    });
  };

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step) {
    this.setState({
      history: [...this.state.history.slice(0, step + 1)],
      step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    let current = this.state.history[this.state.step];
    let status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    let winner = this.calculateWinner(current);
    if (winner) {
      status = `${winner} win`;
    }

    const moves = this.state.history.map((suqares, step) => {
      const desc = step ? "Go to move #" + step : "Go to game start";
      return (
        <li key={step}>
          <button onClick={() => this.jumpTo(step)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
