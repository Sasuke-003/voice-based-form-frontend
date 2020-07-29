import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormGroup from "@material-ui/core/FormGroup";
import InputField from "../input-field/inputfield.component";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MicIcon from "@material-ui/icons/Mic";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = {
  card: {
    textAlign: "left",
    marginTop: "2%",
  },
  volumeUpIcon: {
    float: "right",
    fontSize: "40px",
  },
  micIcon: {
    float: "right",
    fontSize: "40px",
  },
};

const ResponseFormCard = ({data}) => {
  const classes = useStyles();

  return (
    <div>
      <div className="card-wrapper">
        <Card className={classes.card}>
          <CardContent>
            <div className="question">
              <Typography variant="h5" gutterBottom>
                {data.Que}
              </Typography>
            </div>
            <div>
            
                  {

                    
                    data.Typ === "TF" ? 
                      (<InputField label={"Answer here"} fullWidth />) 
                    : 
                    data.Typ === 'RB' ?
                    (
                      <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" >
                          {
                            data.Opt.map( (option, index) => (
                              <FormControlLabel value={option} control={<Radio />} label={option}  key={index} />
                            ) )   
                          }                                             
                        </RadioGroup>
                      </FormControl>
                      )
                    :
                    data.Typ === 'DD' ?
                    (
                      <FormControl className='formControl' fullWidth >
                        <Select
                              name='select'
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                          >
                          {
                            data.Opt.map( (option, index) => (
                              <MenuItem value={option} key={index} > 
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
                            data.Opt.map( (option, index) => (
                              <FormControlLabel control={<Checkbox  name={option} />} label={option} key={index} />
                            ) )   
                          }   
                        </FormGroup>
                      </FormControl>
                    )                
                }   
            </div>
            <Tooltip title="Listen..">
              <IconButton className={classes.volumeUpIcon} onClick={null}>
                <VolumeUpIcon className={classes.volumeUpIcon}></VolumeUpIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Speak">
              <IconButton className={classes.micIcon} onClick={null}>
                <MicIcon className={classes.micIcon}></MicIcon>
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponseFormCard;
