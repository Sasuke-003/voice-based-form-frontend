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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MicIcon from "@material-ui/icons/Mic";

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

function hasNumbers(t)
{
var regex = /\d/g;
return regex.test(t);
} 


const SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;

const recognition  = new SpeechRecognition();


recognition.start();


recognition.onresult = (e) => {
  let current = e.resultIndex;
  let transcript = e.results[current][0].transcript;

  console.log(transcript+' and its type '+typeof(transcript));
  transcript=transcript.toLowerCase();

  if (transcript === 'add question'){
    global.addQuestion();
  }
  else if(transcript.substr(0,4) === 'add ' && transcript.includes('question') && hasNumbers(transcript) ){

    console.log(transcript.substr(4,2)+'sd');
    let number = transcript.match(/\d+/);
    console.log('number in string is '+number);
    //add number question
    
  }
  else if(transcript.substr(0,5)==='focus' && hasNumbers(transcript)){
    let number = transcript.match(/\d+/);
    console.log('number in string is '+number);
    //focus number

  }
  else if(transcript.substr(0,9)==='add title' && !!transcript.substr(10)){
      const title=transcript.substr(10);
      //add title 'title'

  }
  else if(transcript.substr(0,16)==='add description' && !!transcript.substr(18)){
    const description=transcript.substr(18);
    //add description 'description'

  }
  else if(transcript==='add option'){
    //add option

  }
  else if(transcript.substr(0,4)==='add' && transcript.includes('options') ){
    const number=transcript.match(/\d+/);
    console.log('number is '+number);
    //add 'number' option

  }
  else if(transcript.substr(0,13)==='select option' && transcript.length===15 && (transcript.substr(14)==='m'||transcript.substr(14)==='c'||transcript.substr(14)==='d'||transcript.substr(14)==='t')){
    const option=transcript.substr(14);//m,c,d,t
    console.log('option is o'+option);
    //select option 'm|c|d|t'

  }
  else if(transcript.substr(0,13)==='fill question' && !!transcript.substr(14)){
      const question=transcript.substr(14);
      console.log('question is '+question);
      //fill question string

  }
  else if(transcript.substr(0,11)==='fill option' && transcript.substr(15) && transcript.includes('as')){
    const number=transcript.match(/\d+/);
    console.log('number is '+number);

    const value=transcript.substr(transcript.indexOf('as')+2);
    console.log('value is '+value);
    //fill option number value

  }
  else if(transcript==='remove question'){
    //remove question

  }
  else if(transcript.substr(0,13)==='remove option' && !!transcript.substr(14)){
    const number=transcript.match(/\d+/);
    console.log('number is '+number);
    //remove option number
  }
  else{
    global.toSpeech('Cant recognize your voice, please try again');
  }
}

recognition.onspeechend = () => {

  recognition.stop();

}





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
      if(qData[i].AnswerType !== 'TF'){
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
      popperStatus: false,
      mstat: false,
    })

   alert("successfully created")


    

  }


  handleSpeechToText = () => {

    recognition.start();

   

  


}



  

  componentDidMount() {

    global.addQuestion = this.addQuestion;
    
    this.addQuestion();
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
        <Tooltip title="Speak">
        <IconButton className={classes.micIcon} onClick={this.handleSpeechToText} disabled={mstat} >
          <MicIcon className={classes.micIcon}></MicIcon>
        </IconButton>
      </Tooltip>

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
