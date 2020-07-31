import React, { Component } from "react";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import CreateQuestionContainer from "../create-question-container/create-question-container.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputField from "../input-field/inputfield.component";
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MicIcon from "@material-ui/icons/Mic";
import { connect } from "react-redux";

import { setFormData } from "../../redux/form/form.action";

import { req } from "../../url/url";

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
  },
  formDesc: {
    width: "100%",
    fontSize: "20px",
  },
};

function hasNumbers(t) {
  var regex = /\d/g;
  return regex.test(t);
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.start();

let timerID;
const timeOutValue = 1000;

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: "",
      Desc: "",
      qData: [],
      currentId: "",
      popperStatus: false,
      mstat: false,
    };
  }

  storeInRedux() {
    if (timerID) clearTimeout(timerID);

    timerID = setTimeout(async () => {
      timerID = undefined;

      timerID = undefined;

      this.props.setFormData(this.state);
    }, timeOutValue);
  }

  addQuestion = () => {
    this.setState(
      {
        qData: [
          ...this.state.qData,
          {
            Question: "",
            AnswerType: "TF",
            Answers: [],
            id: Date.now(),
          },
        ],
      },
      () => {
        this.setState(
          {
            currentId: this.state.qData[this.state.qData.length - 1].id,
          },
          () => {
            this.storeInRedux();
          }
        );
      }
    );
  };

  handleChange = (event, id) => {
    const { name, value } = event.target;

    this.setState(
      {
        qData: this.state.qData.map((c) => {
          if (c.id !== id) return c;
          return { ...c, [name]: value };
        }),
      },
      () => {
        this.storeInRedux();
      }
    );
  };

  handleSpeechSelectChange = (id, text) => {
    this.setState(
      {
        qData: this.state.qData.map((c) => {
          if (c.id !== id) return c;
          return { ...c, AnswerType: text };
        }),
      },
      () => {
        this.storeInRedux();
      }
    );
  };

  handleTitleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.storeInRedux();
      }
    );
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
      },
      () => {
        this.storeInRedux();
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

    this.setState(
      {
        qData: newArray,
      },
      () => {
        this.storeInRedux();
      }
    );
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

    this.setState(
      {
        qData: newArray,
      },
      () => {
        this.storeInRedux();
      }
    );
  };

  handleSpeechDeleteAnswer = (qId, aIndex) => {
    const elementsIndex = this.state.qData.findIndex(
      (element) => element.id === qId
    );

    if (this.state.qData[elementsIndex].Answers.length < aIndex) {
      global.toSpeech("option " + aIndex + " is not available");
    } else if (this.state.qData[elementsIndex].AnswerType === "TF") {
      global.toSpeech("Cannot delete option type of textfield ");
    } else {
      let newArray = [...this.state.qData];

      newArray[elementsIndex].Answers.splice(aIndex, 1);

      this.setState(
        {
          qData: newArray,
        },
        () => {
          this.storeInRedux();
        }
      );
    }
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

    this.setState(
      {
        qData: newArray,
      },
      () => {
        this.storeInRedux();
      }
    );
  };

  handleSpeechAnswerChange = (text, qId, aIndex) => {
    const elementsIndex = this.state.qData.findIndex(
      (element) => element.id === qId
    );

    if (this.state.qData[elementsIndex].Answers.length < aIndex) {
      global.toSpeech("option " + aIndex + " is not available");
    } else if (this.state.qData[elementsIndex].AnswerType === "TF") {
      global.toSpeech("Cannot edit option type of textfield ");
    } else {
      let newArray = [...this.state.qData];

      newArray[elementsIndex].Answers[aIndex].value = text;

      this.setState(
        {
          qData: newArray,
        },
        () => {
          this.storeInRedux();
        }
      );
    }
  };

  handleEdit = (id) => {
    if (this.state.id !== id) {
      this.setState(
        {
          currentId: id,
        },
        () => {
          this.storeInRedux();
        }
      );
    }
  };

  handleClose = (event) => {
    this.setState({ popperStatus: false }, () => {
      this.storeInRedux();
    });
  };

  handleOpen = (event) => {
    this.setState({ popperStatus: true }, () => {
      this.storeInRedux();
    });
  };

  submitForm = async () => {
    let formData = [];
    const { qData, Title, Desc } = this.state;

    for (let i = 0; i < qData.length; i++) {
      let newAns = [];

      for (let j = 0; j < qData[i].Answers.length; j++) {
        if (
          qData[i].Answers[j].value.trim() !== "" &&
          qData[i].AnswerType !== "TxtFld"
        ) {
          newAns.push(qData[i].Answers[j].value);
        }
      }
      if (qData[i].AnswerType !== "TF") {
        formData.push({
          Que: qData[i].Question,
          Typ: qData[i].AnswerType,
          Opt: newAns,
        });
      } else {
        formData.push({
          Que: qData[i].Question,
          Typ: qData[i].AnswerType,
        });
      }
    }

    const FinalFormData = {
      Title: Title,
      Desc: Desc,
      Data: formData,
    };

    await req.form.create(FinalFormData);

    console.log(FinalFormData);

    this.setState(
      {
        Title: "",
        Desc: "",
        qData: [],
        currentId: "",
        popperStatus: false,
        mstat: false,
      },
      () => {
        this.storeInRedux();
      }
    );

    alert("successfully created");
  };

  voiceCommands = () => {
    const { qData, currentId } = this.state;
    recognition.onstart = () => {
      console.log("started");
      this.setState({
        mstat: true,
      });
    };

    recognition.onresult = (e) => {
      let current = e.resultIndex;
      let transcript = e.results[current][0].transcript;

      console.log(transcript + " and its type " + typeof transcript);
      transcript = transcript.toLowerCase();

      if (transcript === "add question") {
        this.addQuestion();
      } else if (
        transcript.substr(0, 4) === "add " &&
        transcript.includes("question") &&
        hasNumbers(transcript)
      ) {
        console.log(transcript.substr(4, 2) + "sd");
        let number = transcript.match(/\d+/);
        console.log("number in string is " + number);
        //add number question
        for (let i = 0; i < number; i++) {
          this.addQuestion();
        }
      } else if (
        transcript.substr(0, 5) === "focus" &&
        hasNumbers(transcript)
      ) {
        let number = transcript.match(/\d+/);
        console.log("number in string is " + number);
        //focus number
        if (number >= qData.length) {
          let id = qData[qData.length - 1].id;
          this.setState(
            {
              currentId: id,
            },
            () => {
              this.storeInRedux();
            }
          );
        } else {
          let id = qData[number - 1].id;
          this.setState(
            {
              currentId: id,
            },
            () => {
              this.storeInRedux();
            }
          );
        }
      } else if (
        transcript.substr(0, 9) === "add title" &&
        !!transcript.substr(10)
      ) {
        const title = transcript.substr(10);
        //add title 'title'
        this.setState(
          {
            Title: title,
          },
          () => {
            this.storeInRedux();
          }
        );
      } else if (
        transcript.substr(0, 15) === "add description" &&
        !!transcript.substr(18)
      ) {
        const description = transcript.substr(16);

        //add description 'description'
        this.setState(
          {
            Desc: description,
          },
          () => {
            this.storeInRedux();
          }
        );
      } else if (transcript === "add option") {
        //add option
        let typ = "";
        for (let i = 0; i < qData.length; i++) {
          if (currentId === qData[i].id) {
            typ = qData[i].AnswerType;
          }
        }
        if (typ === "TF") {
          global.toSpeech("Cannot add options for Text Field");
        } else {
          this.addAnswer(currentId);
        }
      } else if (
        transcript.substr(0, 3) === "add" &&
        transcript.includes("options")
      ) {
        const number = transcript.match(/\d+/);
        console.log("number is " + number);
        //add 'number' option
        let typ = "";
        for (let i = 0; i < qData.length; i++) {
          if (currentId === qData[i].id) {
            typ = qData[i].AnswerType;
          }
        }
        if (typ === "TF") {
          global.toSpeech("Cannot add options for Text Field");
        } else {
          for (let j = 0; j < number; j++) {
            this.addAnswer(currentId);
          }
        }
      } else if (
        transcript.substr(0, 13) === "select option" &&
        transcript.length >= 15 &&
        (transcript.substr(14) === "multiple choice" ||
          transcript.substr(14) === "multiplechoice" ||
          transcript.substr(14) === "checkbox" ||
          transcript.substr(14) === "dropdown" ||
          transcript.substr(14) === "textfield" ||
          transcript.substr(14) === "check box" ||
          transcript.substr(14) === "drop down" ||
          transcript.substr(14) === "text field")
      ) {
        const option = transcript.substr(14); //m,c,d,t
        console.log("option is " + option);
        if (option === "multiplechoice" || option === "multiple choice") {
          this.handleSpeechSelectChange(currentId, "RB");
        } else if (option === "checkbox" || option === "check box") {
          this.handleSpeechSelectChange(currentId, "CB");
        } else if (option === "textfield" || option === "text field") {
          this.handleSpeechSelectChange(currentId, "RB");
        } else if (option === "dropdown" || option === "drop down") {
          this.handleSpeechSelectChange(currentId, "DD");
        }
      } else if (
        transcript.substr(0, 13) === "edit question" &&
        !!transcript.substr(14)
      ) {
        const question = transcript.substr(14);
        console.log("question is " + question);
        //fill question string
        this.setState(
          {
            qData: this.state.qData.map((c) => {
              if (c.id !== currentId) return c;
              return { ...c, Question: question };
            }),
          },
          () => {
            this.storeInRedux();
          }
        );
      } else if (
        transcript.substr(0, 11) === "edit option" &&
        transcript.substr(15) &&
        transcript.includes("as")
      ) {
        const number = transcript.match(/\d+/);
        console.log("number is " + number);

        const value = transcript.substr(transcript.indexOf("as") + 2);
        console.log("value is " + value);
        //fill option number value
        this.handleSpeechAnswerChange(value, currentId, number - 1);
      } else if (transcript === "remove question") {
        //remove question
        this.deleteQuestion(currentId);
      } else if (
        transcript.substr(0, 13) === "remove option" &&
        !!transcript.substr(14)
      ) {
        const number = transcript.match(/\d+/);
        console.log("number is " + number);
        //remove option number
        this.handleSpeechDeleteAnswer(currentId, number);
      } else {
        global.toSpeech("Cant recognize your voice, please try again");
      }

      if (transcript === "submit form") {
        this.submitForm();
      } else {
        global.toSpeech("wrong command");
      }
    }


    recognition.onspeechend = () => {
      recognition.stop();

      console.log("stopped");

      this.setState({
        mstat: false,
      });
    };
  };

  componentWillUpdate() {
    this.voiceCommands();
  }

  componentDidUpdate() {
    this.voiceCommands();
  }

  micOn = () => {
    recognition.start();
  };

  componentDidMount() {
    console.log(this.props.reduxFormData);
    this.setState(this.props.reduxFormData);

    
  }

  render() {
    const { qData, currentId, popperStatus, Title, Desc, mstat } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div
          style={{ margin: "auto", paddingBottom: "20px", maxWidth: "770px" }}
        >
          <Card className={classes.root}>
            <CardContent>
              <div>
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <InputField
                    className={classes.formTitle}
                    placeholder="Untitled form"
                    value={Title}
                    name="Title"
                    onChange={this.handleTitleChange}
                  />
                </div>
                <div>
                  <InputField
                    className={classes.formDesc}
                    placeholder="Form description"
                    value={Desc}
                    name="Desc"
                    onChange={this.handleTitleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tooltip title="Speak">
          <IconButton
            className={classes.micIcon}
            onClick={this.micOn}
            disabled={mstat}
          >
            <MicIcon className={classes.micIcon}></MicIcon>
          </IconButton>
        </Tooltip>

        {qData.map((data, index) => (
          <CreateQuestionContainer
            no={index + 1}
            key={data.id}
            data={data}
            currentId={currentId}
            handleEdit={this.handleEdit}
            handleChange={this.handleChange}
            addAnswer={this.addAnswer}
            deleteAnswer={this.deleteAnswer}
            handleAnswerChange={this.handleAnswerChange}
            deleteQuestion={this.deleteQuestion}
            handleTitleChange={this.handleTitleChange}
          />
        ))}
        <MyFloatingButton onClick={this.addQuestion} />
        <MyFloatingButton onClick={this.handleOpen} done />

        <Dialog
          open={popperStatus}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Items"}</DialogTitle>

          <DialogContent>
            Are you sure you want to create this form ?
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>

            <Button onClick={this.submitForm} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  reduxFormData: state.form.data,
});

const mapDispatchToProps = (dispatch) => ({
  setFormData: (data) => dispatch(setFormData(data)),
});

export default withStyles(useStyles)(
  connect(mapStatetoProps, mapDispatchToProps)(CreateForm)
);
