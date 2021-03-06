import React, { Component } from "react";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import CircularProgress from "@material-ui/core/CircularProgress";

import { req } from "../../url/url";

import ResponseFormCard from "../response-form-card/response-form-card.component";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();


const useStyles = {
  root: {
    transition: "box-shadow 280ms",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "2%",
    backgroundColor: "#F0EBF8",
  },
  formTitle: {
    width: "100%",
    fontSize: "32px",
    fontWeight: 400,
    textTransform: "uppercase",
  },
  formDesc: {
    width: "100%",
    fontSize: "20px",
    fontWeight: 400,
  },
  cir: {
    marginTop: "40%",
  },
  divider: {
    margin: "2%",
    marginBottom: "2%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "2%",
  },
};

function hasNumbers(t) {
  var regex = /\d/g;
  return regex.test(t);
}

let timerID;
const timeOutValue = 1000;

class ResponseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: [],
      popperStatus: false,
      ansData: [],
      mstat: false,
      currentIndex: 0,
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

  componentDidMount = async () => {
    const {
      match: { params },
    } = this.props;

    await delay(2000);

    const res = await req.form.detail(params.id);

    this.setState(
      {
        formData: res,
      },
      () => {
        this.setDataToState(res.Data);
        this.voiceCommands();
      }
    );
  };

  handleClose = (event) => {
    this.setState({ popperStatus: false });
  };

  handleOpen = (event) => {
    this.setState({ popperStatus: true });
  };

  setDataToState = async (data) => {
    let newData = [];
    let newMicData = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].Typ === "CB") {
        let op = [];

        for (let j = 0; j < data[i].Opt.length; j++) {
          op.push(false);
        }

        newData.push(op);
      } else if (data[i].Typ === "DD" && data[i].Opt.length !== 0) {
        newData.push(data[i].Opt[0]);
      } else {
        newData.push("");
      }

      newMicData.push(false);
    }

    const {
      match: { params },
    } = this.props;

    await delay(2000);

    const res = await req.form.detail(params.id);

    this.setState(
      {
        formData: res,
      },
      () => {
        this.setDataToState(res.Data);
      }
    );
  };

  handleClose = (event) => {
    this.setState({ popperStatus: false });
  };

  handleOpen = (event) => {
    this.setState({ popperStatus: true });
  };

  setDataToState = (data) => {
    let newData = [];
    let newMicData = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].Typ === "CB") {
        let op = [];

        for (let j = 0; j < data[i].Opt.length; j++) {
          op.push(false);
        }

        newData.push(op);
      } else if (data[i].Typ === "DD" && data[i].Opt.length !== 0) {
        newData.push(data[i].Opt[0]);
      } else {
        newData.push("");
      }

      newMicData.push(false);
    }

    this.setState({
      ansData: newData,
      micStatus: newMicData,
    });
  };

  handleChange = (event, index) => {
    const { value } = event.target;

    this.setState({
      ansData: this.state.ansData.map((c, i) => {
        if (index !== i) return c;
        return value;
      }),
    });
  };

  handleCheckBoxChange = (event, index, ai) => {
    const { checked } = event.target;

    let newData = this.state.ansData;
    newData[index][ai] = checked;

    this.setState({
      ansData: newData,
    });
  };

  submitForm = async () => {
    let newData = [];

    const { formData, ansData } = this.state;

    for (let i = 0; i < ansData.length; i++) {
      if (formData.Data[i].Typ === "CB") {
        let op = [];
        for (let j = 0; j < ansData[i].length; j++) {
          if (ansData[i][j] === true) {
            op.push(j);
          }
        }
        newData.push(op);
      } else if (formData.Data[i].Typ === "TF") {
        newData.push(ansData[i]);
      } else {
        for (let k = 0; k < formData.Data[i].Opt.length; k++) {
          if (ansData[i] === formData.Data[i].Opt[k]) {
            newData.push(k);
          }
        }
      }
      this.handleClose();
    }

    try {
      const {
        match: { params },
      } = this.props;
      const formSubmitData = {
        FormTemplateID: params.id,
        Data: newData,
      };

      await req.form.answer(formSubmitData);

      alert("successfully submitted");
    } catch (error) {
      console.log(error);
    }
  };


  voiceCommands = () => {

    const { formData, currentIndex } = this.state;

    recognition.onstart = () => {
      console.log("started");

      this.setState({
        mstat: true,
      });
    };

    recognition.onresult = (e) => {
      let current = e.resultIndex;
      let transcript = e.results[current][0].transcript;

     
      transcript = transcript.toLowerCase();
      console.log(transcript);

        // compare code
        if ((transcript.substr(0, 5) === "focus" && hasNumbers(transcript) ) || transcript === 'focus for' || transcript === 'focus tree' || transcript === 'focus one' || transcript === 'focus to' ) {
          let number = transcript.match(/\d+/);
          if(transcript==='focus one') number = 1;
          if(transcript==='focus to') number = 2;
          if(transcript==='focus tree') number = 3;
          if(transcript==='focus for') number = 4;
          //focus number
          if (number <= formData.Data.length) {
            this.setState({
              currentIndex: number-1
            })
            global.toSpeech("question "+number+" is focused")
          }
          else if( number < 0 ){
            global.toSpeech("wrong question number")
          }
          else{
            this.setState({
              currentIndex: formData.Data.length-1
            })
            global.toSpeech("question "+formData.Data.length+" is focused")
          }
        } else if (
          transcript.substr(0, 6) === "submit" ||
          transcript === "submit form"
        ) {
          this.submitForm();
          global.toSpeech("Form submitted successfully")
        } else {
          if (formData.Data[currentIndex].Typ === "CB") {
            let newData = this.state.ansData;
            let i = this.state.formData.Data[currentIndex].Opt.indexOf(transcript);
    
            if (i !== -1) {
              console.log(newData[currentIndex]);
              newData[currentIndex][i] = !newData[currentIndex][i];
              this.setState({
                ansData: newData,
              });
              if (newData[currentIndex][i]) {
                global.toSpeech(transcript + "is selected");
              } else {
                global.toSpeech(transcript + "is removed");
              }
            } else {
              global.toSpeech(transcript + " is not in the options");
            }
          } else if (formData.Data[currentIndex].Typ === "TF") {
            this.setState({
              ansData: this.state.ansData.map((c, i) => {
                if (currentIndex !== i) return c;
                return transcript;
              }),
            });
          } else {
            let i = this.state.formData.Data[currentIndex].Opt.indexOf(transcript);
            if (i !== -1) {
              this.setState({
                ansData: this.state.ansData.map((c, i) => {
                  if (currentIndex !== i) return c;
                  return transcript;
                }),
              });
              global.toSpeech("option set");
            } else {
              global.toSpeech(transcript + " is not in the options");
            }
          }
        }
      
    };

    recognition.onspeechend = () => {
      recognition.stop();

      console.log("stopped");

      this.setState({
        mstat: false,
      });
    };
  };

  micOn = () => {
    recognition.start();
  };

  componentWillUpdate() {
    this.voiceCommands();
  }

  componentDidUpdate() {
    this.voiceCommands();
  }

  render() {
    const { formData, popperStatus, ansData, mstat, currentIndex } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {formData.length === 0 ? (
          <CircularProgress className={classes.cir} />
        ) : null}

        <div
          style={{
            margin: "auto",
            paddingBottom: "5px",
            maxWidth: "770px",
          }}
        >
          <div
            style={{
              margin: "45px",
              marginBottom: "20px",
            }}
          >
            <div className={classes.formTitle}>
              <Typography variant="h5" className={classes.formTitle}>
                {formData.Title}
              </Typography>
            </div>
            <div className={classes.formDesc}>
              <Typography variant="h5" className={classes.formDesc}>
                {formData.Desc}
              </Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
        </div>

        {formData.length !== 0
          ? formData.Data.map((data, index) => (
              <ResponseFormCard
                currentIndex={currentIndex}
                handleSpeechToText={this.handleSpeechToText}
                data={data}
                key={index}
                index={index}
                handleChange={this.handleChange}
                ansData={ansData}
                handleCheckBoxChange={this.handleCheckBoxChange}
              />
            ))
          : null}
        <MyFloatingButton onClick={this.micOn} mic disabled={mstat} />
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
            Are you sure you want to submit this form ?
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

export default withStyles(useStyles)(withRouter(ResponseForm));
