import React from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputField from '../input-field/inputfield.component'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


const AnswerType = ({ id, AnswerType, Answers, deleteAnswer, handleAnswerChange }) => {

    const classes = useStyles();

    return (
        <div>

            <Grid container spacing={2} xl={4}>
            
            {

                Answers.map(( ans ) => (
                    
                    <Grid key={ans.id} item  xl={4}>
                                <Grid item xl={5} >
                                <InputField
                                    key= {ans.id+1}
                                    margin="normal"
                                    required
                                    id="email"
                                    label="option"
                                    name="option"
                                    autoComplete="false"
                                    autoFocus
                                    onChange={(event) => handleAnswerChange(event, id, ans.id)}
                                    value={ans.value}
                                />
                                </Grid>
                                <Grid item xl={4}>
                                <Button key= {ans.id+2} variant="contained" color="primary" onClick={()=> deleteAnswer(id, ans.id)} >
                                    delete
                                </Button>
                                </Grid>
                    </Grid>
    


                )  )

            }
               
            </Grid>
           
            
        </div>
    );
};

export default AnswerType;