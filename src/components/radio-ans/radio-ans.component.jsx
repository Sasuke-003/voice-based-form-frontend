import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from "@material-ui/core/Radio";

class RadioAns extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data === this.props.data && nextProps.ans === this.props.ans){
          return false;
        }
        return true;
      }
    render() {
        const { data, ans , handleChange, index } =this.props;
        return (
            <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={typeof ans === 'string' ? ans : '' } onChange={(event)=> handleChange(event, index)} >
              {
                data.Opt.map( (option, i) => (
                  <FormControlLabel value={option} control={<Radio />} label={option}  key={i} />
                ) )   
              }                                             
            </RadioGroup>
          </FormControl>
        );
    }
}

export default RadioAns;