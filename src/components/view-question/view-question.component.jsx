import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ReactDOM from "react-dom";
import shallowCompare from 'react-addons-shallow-compare';
import PanoramaFishEyeIcon from "@material-ui/icons/PanoramaFishEye";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputField from '../input-field/inputfield.component'

import Typography from "@material-ui/core/Typography";

import "./view-question.styles.css";

const useStyles = ({
  card: {
    textAlign: "left",
    marginTop: "2%",
  },
});


class ViewQuestion extends React.Component {

shouldComponentUpdate(nextProps, nextState){

  return shallowCompare(this, nextProps, nextState);

}

  render(){
    const  { data, classes } = this.props;
    return (
      <div>
        <div className="card-wrapper">
          <Card className={classes.card}>
            <CardContent>
              <div className="question">
                <Typography variant="h5" gutterBottom>
                  {
                    data.Question === '' ?
                      
                    'Please write a question here...'
                    :
                    data.Question
                    
                  }
                </Typography>
              </div>
              <div >
                <FormControl component="fieldset" >
                  <FormGroup>

                    {
                      data.AnswerType === 'TxtFld' ?

                      <InputField label={'Answer here'} disabled fullWidth  />

                      :

                      null

                    }
                    {
                      data.Answers.map((option, index) => {

                          if (data.AnswerType === 'ChkBox') {

                          return( <FormControlLabel control={<Checkbox />} label={option.value} key={index} /> )

                          }

                          else if (data.AnswerType === 'RadBtn') {

                            return( <FormControlLabel control={<Radio />} label={option.value} key={index} /> )

                          }
                          else if  (data.AnswerType === 'DrpDwn'){

                            return(

                              <Typography variant='h6' key={index} >
                                {option.value}
                              </Typography>

                            )
                          }
                          else 
                            return( null )
                              
                        }

                  )
                }
                  </FormGroup>
                  </FormControl>
            
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
};

export default withStyles(useStyles)(ViewQuestion);
