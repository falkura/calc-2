import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Inp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(e) {
    this.props.onInpChange(e.target.value);
  }

  onClick(e) {
    this.props.onInpClick(e.target.value);
  }

  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.corId}
        type="text"
        value={this.props.value}
        onClick={this.onClick}
        onChange={this.handleChange}
      />
    );
  }
}

class Butt extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.onButtClick(e.target.value);
  }
  render() {
    const sym = this.props.value;
    return (
      <button className="butt" value={sym} onClick={this.handleClick}>
        {sym}
      </button>
    );
  }
}

const calcElements = [
  7,
  8,
  9,
  "/",
  4,
  5,
  6,
  "*",
  1,
  2,
  3,
  "-",
  0,
  ".",
  "+",
  "<",
];

class ButtonField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sym: "&",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(i) {
    this.props.onClick(i);
  }
  renderButton(i) {
    //const sym = this.state.sym;
    return (
      <Butt key={i} value={calcElements[i]} onButtClick={this.handleClick} />
    );
  }

  render() {
    const buttArr = [];
    const rows = [];

    for (let i = 0; i < calcElements.length; i++) {
      buttArr.push(this.renderButton(i));
    }

    for (let i = 1; i < 5; i++) {
      const row = <div>{buttArr.slice(i * 4 - 4, i * 4)}</div>;
      rows.push(row);
    }

    return rows;
  }
}

String.prototype.isNum = function isNum() {
  return Number.isInteger(Number(this));
};

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numToCalc: "",
      result: "",
      pos: -1,
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inpClick = this.inpClick.bind(this);
    this.resClick = this.resClick.bind(this);
  }

  onChange(i) {
    console.log("not available");
  }

  checkForSym(num, total, pos) {
    if (num.isNum()) {
      if (total.length === 1 && num === "0") return total;
      else return total + num;
    } else if (
      num === "*" ||
      num === "/" ||
      num === "+" ||
      num === "-" ||
      num === "."
    ) {
      if (total[total.length - 1].isNum()) return total + num;
      else return total.slice(0, -1) + num;
    } else if (num === "<") {
      if (pos === -1) return total.slice(0, pos);
      else {
        const right = total.slice(pos + 1, total.length);
        const left = total.slice(0, pos);
        const nextPos = pos - 1;
        this.setState({ pos: nextPos });
        return left.concat(right);
      }
    } else return total;
  }

  handleClick(i) {
    var currentVal = this.checkForSym(i, this.state.numToCalc, this.state.pos);
    console.log(currentVal);
    //if (!currentVal[currentVal.length - 1].isNum()) currentVal.slice(0, -1);
    const result = i.isNum() ? eval(currentVal) : this.state.result;
    this.setState({ numToCalc: currentVal, result: result });
    console.log(this.state.pos);
  }

  inpClick(e) {
    const pos = document.querySelector("#inp").selectionStart - 1;
    this.setState({ pos: pos });
  }

  resClick(e) {
    this.setState({ result: "", numToCalc: "" });
  }

  render() {
    return (
      <div>
        <Inp
          corId="inp"
          onInpChange={this.onChange}
          value={this.state.numToCalc}
          onInpClick={this.inpClick}
        />
        <ButtonField
          onClick={this.handleClick}
          currentNum={this.state.numToCalc}
        />
        <Inp
          className="res"
          onInpChange={this.onChange}
          value={"=" + this.state.result}
          onInpClick={this.resClick}
        />
      </div>
    );
  }
}

ReactDOM.render(<Calc />, document.getElementById("root"));
