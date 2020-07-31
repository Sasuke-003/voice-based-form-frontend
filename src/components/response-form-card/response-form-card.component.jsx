import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormGroup from "@material-ui/core/FormGroup";
import InputField from "../input-field/inputfield.component";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Typography from "@material-ui/core/Typography";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MicIcon from "@material-ui/icons/Mic";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import shallowCompare from "react-addons-shallow-compare";
import RadioAns from '../radio-ans/radio-ans.component'
import FormControl from "@material-ui/core/FormControl";

const useStyles = ({
  card: {
    textAlign: "left",
    marginBottom: "2%",
    borderRadius: '8px'
  },
  volumeUpIcon: {
    float: "right",
    fontSize: "40px",
  },
  micIcon: {
    float: "right",
    fontSize: "40px",
  },
});



class ResponseFormCard  extends React.Component  {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data && nextProps.ansData[nextProps.index] === this.props.ansData[this.props.index] && !Array.isArray(nextProps.ansData[nextProps.index])  && nextProps.mstat === this.props.mstat ){
      return false;
    }
    return true;
  }

  handleTextToSpeech = async () => {
     global.toSpeech(this.props.data.Que);
  }

  

render(){
  

  const { currentIndex, data, index, handleChange, ansData, handleCheckBoxChange, classes } = this.props

  let ans = ansData[index];

  return (
    <div>
      <div className="card-wrapper">
        <Card className={classes.card} raised={currentIndex === index ? true : false} >
          <CardContent>
            <div className="question">
              <Typography variant="h5" gutterBottom>
                {data.Que}
              
              </Typography>
            
            </div>
            <div>
            
                  {

                    
                    data.Typ === "TF" ? 
                      (<InputField type='text' label={"Answer here"} fullWidth value={typeof ans === 'string' ? ans : '' } onChange={(event)=> handleChange(event, index)} />) 
                    : 
                    data.Typ === 'RB' ?
                    (
                      <RadioAns data={data} ans={ans} handleChange={handleChange} index={index} />
                      )
                    :
                    data.Typ === 'DD' ?
                    (
                      <FormControl className='formControl' fullWidth >
                        <Select
                              name='select'
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={typeof ans === 'string' ? ans : '' }
                              onChange={(event)=> handleChange(event, index)}
                          >
                          {
                            data.Opt.map( (option, i) => (
                              <MenuItem value={option} key={i} > 
                                {option}
                              </MenuItem>
                            ) )   
                          }   
                        </Select>
                      </FormControl>
                    )
                    :
                    (
                      <FormControl component="fieldset" >
                        <FormGroup>
                          {
                            data.Opt.map( (option, i) => (
                              <FormControlLabel control={<Checkbox checked={Array.isArray(ans) ? ans[i] : false} name={option} onChange={(event)=> handleCheckBoxChange(event, index, i)} />} label={option} key={i} />
                            ) )   
                          }   
                        </FormGroup>
                      </FormControl>
                    )                
                }   
            </div>
            <Tooltip title="Listen..">
              <IconButton className={classes.volumeUpIcon} onClick={this.handleTextToSpeech}>
                <VolumeUpIcon className={classes.volumeUpIcon}></VolumeUpIcon>
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}
};

export default withStyles(useStyles)(ResponseFormCard);
