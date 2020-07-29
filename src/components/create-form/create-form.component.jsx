import React, { Component } from "react";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import CreateQuestionContainer from "../create-question-container/create-question-container.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputField from '../input-field/inputfield.component'
import { withStyles } from "@material-ui/core/styles";

const useStyles = {
  root: {
    transition: "box-shadow 280ms",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "2%",
  },
  formTitle: {
    width: "100%",
    fontSize: "50px",
    fontWeight: 400,
    lineHeight: "135%",
  },
  formDesc: {
    width: "100%",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "100%",
  },
};

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qData: [],
      currentId: "",
    };
  }

  addQuestion = () => {
    this.setState(
      {
        qData: [
          ...this.state.qData,
          {
            Question: "",
            AnswerType: "TxtFld",
            Answers: [],
            id: Date.now(),
          },
        ],
      },
      () => {
        this.setState({
          currentId: this.state.qData[this.state.qData.length - 1].id,
        });
      }
    );
  };

  handleChange = (event, id) => {
    const { name, value } = event.target;

    this.setState({
      qData: this.state.qData.map((c) => {
        if (c.id !== id) return c;
        return { ...c, [name]: value };
      }),
    });
  };

  deleteQuestion = (id) => {
    this.setState(
      {
        qData: this.state.qData.filter((data) => data.id !== id),
      },
      () => {
        if (this.state.qData.length) {
          this.setState({
            currentId: this.state.qData[this.state.qData.length - 1].id,
          });
        }
      }
    );
  };

  addAnswer = (id) => {
    const elementsIndex = this.state.qData.findIndex(
      (element) => element.id === id
    );

    let newArray = [...this.state.qData];

    newArray[elementsIndex].Answers.push({
      value: "",
      id: Date.now(),
    });

    this.setState({
      qData: newArray,
    });
  };

  deleteAnswer = (qId, aId) => {
    const elementsIndex = this.state.qData.findIndex(
      (element) => element.id === qId
    );
    let newArray = [...this.state.qData];

    const answerIndex = newArray[elementsIndex].Answers.findIndex(
      (element) => element.id === aId
    );

    newArray[elementsIndex].Answers.splice(answerIndex, 1);

    this.setState({
      qData: newArray,
    });
  };

  handleAnswerChange = (event, qId, aId) => {
    const { value } = event.target;

    const elementsIndex = this.state.qData.findIndex(
      (element) => element.id === qId
    );
    let newArray = [...this.state.qData];

    const answerIndex = newArray[elementsIndex].Answers.findIndex(
      (element) => element.id === aId
    );

    newArray[elementsIndex].Answers[answerIndex].value = value;

    this.setState({
      qData: newArray,
    });
  };

  handleEdit = (id) => {
    if (this.state.id !== id) {
      this.setState({
        currentId: id,
      });
    }
  };

  componentDidMount() {
    this.addQuestion();
  }

  render() {
    const { qData, currentId } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div
          style={{ margin: "auto", paddingBottom: "20px", maxWidth: "770px" }}
        >
          <Card className={classes.root}>
            <CardContent>
              <div>
                <InputField
                  className={classes.formTitle}
                  placeholder="Untitled form"
                />

                <InputField
                  className={classes.formDesc}
                  placeholder="Form description"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {qData.map((data) => (
          <CreateQuestionContainer
            key={data.id}
            data={data}
            currentId={currentId}
            handleEdit={this.handleEdit}
            handleChange={this.handleChange}
            addAnswer={this.addAnswer}
            deleteAnswer={this.deleteAnswer}
            handleAnswerChange={this.handleAnswerChange}
            deleteQuestion={this.deleteQuestion}
          />
        ))}
        <MyFloatingButton onClick={this.addQuestion} />
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateForm);
