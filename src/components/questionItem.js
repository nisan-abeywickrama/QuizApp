import React, { Component } from "react";
import "../App.css"

var id = 0;

export class questionItem extends Component {

  state = {
    question: [],
    answer: "",
    score: 0,
    done: 0

  };


  componentDidMount() {
    if (
      this.props.question &&
      typeof this.props.question[`${id}`] != "undefined"
    ) {
      this.setState({ question: this.props.question[`${id}`] });
    }
    this.setState({ loading: true })
  }


  componentWillUnmount() {
    id = 0; // if user goes back to home id resets back to 0

  }

  checkAnswer() {
    console.log(this.state.question.answer)
    if (this.state.answer === "") {
      alert("Answer cannot be empty")
      return 0;
    }
    else if (this.state.question.answer.toUpperCase() === this.state.answer.toUpperCase()) {
      let temp = this.state.score;
      temp += this.state.question.value;
      this.setState({ score: temp })
      return 1;
    }
    alert("Wrong answer")
    this.setState({ answer: "" })
  }

  //get the next question
  getNext() {

    id++;
    this.setState({ answer: "" })

    if (id < this.props.question.length) {
      if (this.props.question[`${id}`].question !== "") {
        this.setState({ question: this.props.question[`${id}`] });
      } else {
        this.getNext();
      }
    } else {
      alert("All questions Answered");
      this.setState({ done: 1 })

    }
  };

  onClicks = () => {
    if (this.checkAnswer()) {
      this.getNext();
    }

  }

  onKeys = (e) => {
    if (e.keyCode === 13)
      if (this.checkAnswer())
        this.getNext();
  }
  //when btn next is clicked



  render() {
    if (this.state.done)
      return (<div
        style={{
          height: "170px",
          backgroundColor: "#FFAE5C",
          margin: "100px 0px",
          paddingTop: "60px",
          transition: "0.8s ease"
        }}
      ><p>YOUR FINAL SCORE: <span>{this.state.score}</span></p>
      </div>
      )
    return (

      <div style={{
        width: "50%",
        margin: "auto",
        transition: "0.8s ease" // not working
      }}>
        {this.props.question &&
          typeof this.props.question[`${id}`] != "undefined" ? (
            <div
              style={{
                height: "170px",
                backgroundColor: "#FFAE5C",
                margin: "100px 0px",
                paddingTop: "60px",

              }}
            >
              <p>{this.props.question[`${id}`].question}</p>
              <div style={{
                marginTop: "200px",

              }} >
                <input type="text" placeholder="Answer..."
                  value={this.state.answer}
                  onChange={(e) => this.setState({ answer: e.target.value })}
                  style={{
                    padding: "10px"
                  }}
                  onKeyDown={this.onKeys}
                />
                <button
                  style={{
                    padding: "10px 50px"
                  }}
                  onClick={this.onClicks}>
                  NEXT
            </button>
              </div><div>
                <p style={{ fontSize: "40px", marginTop: "100px" }}>Score:
                <span>{this.state.score}</span></p>
              </div>
            </div>
          ) : (
            ""
          )}
      </div>


    );
  }
}

export default questionItem;
