import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Delete from "@material-ui/icons/Delete";
import PanoramaFishEyeIcon from "@material-ui/icons/PanoramaFishEye";
import AddIcon from "@material-ui/icons/Add";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import InputField from '../input-field/inputfield.component'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import './editable-question.styles.css'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';



const useStyles =({

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

  question: {
    width: "100%",
    margin: "1px",
  },

  selectMenu: {
    marginLeft: "4%",
    width: "50%",
    borderRadius: "4px",
  },

  optionCards: {
    display: "flex",
    width: "100%",
    marginTop: "2%",
  },

  deleteIcon: {
    float: "right",
    fontSize: "35px",
    marginTop: "8px",
  },

});


class EditableQuestion extends Component {

  render() {

    const { data, handleChange, deleteQuestion, addAnswer, deleteAnswer, handleAnswerChange, classes } = this.props;

    return (
        <div className="card-wrapper" >

          {/* question  */}
          <Card className={classes.root} raised >
            <CardContent>

              <Grid container component='div' spacing={1} >

              <Grid item xs={12}>
              
                <InputField
                  className={classes.question}
                  id="filled-basic"
                  fullWidth
                  variant="filled"
                  placeholder="Question"
                  name='Question'
                  value={data.Question}
                  onChange={(event)=> handleChange(event, data.id)}
                  
                />
                </Grid>
                <Grid item xs={8}>


                <FormControl className='formControl' fullWidth >
                  <Select
                        className={classes.selectMenu}
                        name='AnswerType'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.AnswerType}
                        onChange={(event) => handleChange( event, data.id )}
                    >

                    <MenuItem value={'RB'}> 
                      <RadioButtonCheckedIcon style={{ marginRight: "8px" }} />
                        Multiple choice
                    </MenuItem>

                    <MenuItem value={'CB'}>
                    <CheckBoxOutlinedIcon style={{ marginRight: "8px" }} />
                    Checkboxes
                    </MenuItem>

                    <MenuItem value={'DD'}>
                    <ArrowDropDownCircleIcon style={{ marginRight: "8px" }} />
                    Drop-down
                    </MenuItem>

                    
                    <MenuItem value={'TF'}>
                      TextField
                    </MenuItem>

                  </Select>

                </FormControl>



                </Grid>
                <Grid item xs={4}>
                {

                  data.AnswerType === 'TxtFld' ?

                  null
                  
                  :

                 

                  <Button
                    startIcon={<AddIcon />}
                    onClick={()=>addAnswer(data.id)}
                  > 
                    Add Option
                  </Button>
          
                }
                </Grid>

               
              
             
              {
                data.AnswerType === 'TxtFld' ?
                
                <Grid item xs={12} lg={12} >
                  <InputField
                  label={'Answer here'}
                  disabled
                  fullWidth
                  />
                </Grid>

                :

                data.Answers.map((ans, index)=> (
                  <Grid item lg={4} xl={4} md={6}  xs={12} key={index}>
                  
                    <Card className={classes.optionCards}>
                      {
                        data.AnswerType === 'ChkBox' ?

                        <CheckBoxOutlineBlankIcon  style={{ margin: "18px" }} />

                        :

                        <PanoramaFishEyeIcon style={{ margin: "18px" }} />

                      }
                        
                      <InputField 
                        type='text'
                        value={ans.value}
                        onChange={(event)=>handleAnswerChange(event,data.id,ans.id)}
                      />
                      <IconButton aria-label="delete" onClick={()=> deleteAnswer(data.id, ans.id)} >
                        <CloseIcon  />
                      </IconButton>
                    </Card>
                  
                  </Grid>
                ))

              }
                
                  
                <Grid item xs={12}><Divider /><Divider /></Grid>

                <Grid item xs={12}>
                  <IconButton aria-label="delete" onClick={()=> deleteQuestion(data.id)} >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        
    );
  }


}

export default withStyles(useStyles)(EditableQuestion);
