import React, { Component } from "react";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import CreateQuestionContainer from "../create-question-container/create-question-container.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputField from '../input-field/inputfield.component'
import { withStyles } from "@material-ui/core/styles";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { req } from '../../url/url';

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
      Title: '',
      Desc: '',
      qData: [],
      currentId: "",
      popperStatus: false,
    };
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

  handleTitleChange = (event) => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    })

  } 

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

  handleClose = (event) => {

    this.setState( { popperStatus: false } );

  }

  handleOpen = (event) => {

    this.setState( { popperStatus: true } );

  }

  submitForm = async () => {


    let formData = [];
    const { qData, Title, Desc } = this.state;

    for (let i=0; i<qData.length; i++){

      let newAns = [];

      for (let j=0; j<qData[i].Answers.length ; j++){
        if(qData[i].Answers[j].value.trim() !== '' && qData[i].AnswerType !== 'TxtFld'){
          newAns.push(qData[i].Answers[j].value)
        }
      }
      if(qData[i].AnswerType !== 'TxtFld'){
        formData.push({

          Que: qData[i].Question,
          Typ: qData[i].AnswerType,
          Opt: newAns, 
  
        })
      }
        else {
          formData.push({

            Que: qData[i].Question,
            Typ: qData[i].AnswerType, 
    
          })
        }

    }

    const FinalFormData = {

      Title : Title,
      Desc  : Desc,
      Data  : formData

    }

   await req.form.create( FinalFormData );

   console.log(FinalFormData)

   this.setState({Title: '',
      Desc: '',
      qData: [],
      currentId: "",
      popperStatus: false,})

   alert("successfully created")


    

  }

  componentDidMount() {
    this.addQuestion();
  }

  render() {
    const { qData, currentId, popperStatus, Title, Desc } = this.state;
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
                  value={Title}
                  name='Title'
                  onChange={this.handleTitleChange}
                />

                <InputField
                  className={classes.formDesc}
                  placeholder="Form description"
                  value={Desc}
                  name='Desc'
                  onChange={this.handleTitleChange}
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
            handleTitleChange={this.handleTitleChange}
          />
        ))}
        <MyFloatingButton onClick={this.addQuestion} />
        <MyFloatingButton onClick={this.handleOpen} done   />

        <Dialog
            open={popperStatus}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Items"}</DialogTitle>

            <DialogContent>
                Are you sure you want to create this form ? 
            </DialogContent>
            
            <DialogActions>

            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>

            <Button onClick={this.submitForm} color="primary" autoFocus >
                Submit
            </Button>

            </DialogActions>

        </Dialog>

      </div>
    );
  }
}

export default withStyles(useStyles)(CreateForm);
