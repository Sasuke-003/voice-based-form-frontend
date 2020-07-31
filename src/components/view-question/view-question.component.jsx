import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import shallowCompare from "react-addons-shallow-compare";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import InputField from "../input-field/inputfield.component";

import Typography from "@material-ui/core/Typography";

import "./view-question.styles.css";

const useStyles = {
  card: {
    textAlign: "left",
    marginTop: "2%",
  },
};

class ViewQuestion extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { no, data, classes } = this.props;
    return (
      <div>
        <div className="card-wrapper">
          <Card className={classes.card}>
            <CardContent>
              <div className="question">
                <Typography variant="h5" gutterBottom>
                  {data.Question === ""
                    ? no+".Please write a question here..."
                    : no+"."+data.Question}
                </Typography>
              </div>
              <div>
                <FormControl component="fieldset">
                  <FormGroup>
                    {data.AnswerType === "TF" ? (
                      <InputField label={"Answer here"} disabled fullWidth />
                    ) : null}
                    {data.Answers.map((option, index) => {
                      if (
                        data.AnswerType === "CB" &&
                        option.value.trim() !== ""
                      ) {
                        return (
                          <FormControlLabel
                            control={<Checkbox />}
                            label={option.value}
                            key={index}
                          />
                        );
                      } else if (
                        data.AnswerType === "RB" &&
                        option.value.trim() !== ""
                      ) {
                        return (
                          <FormControlLabel
                            control={<Radio />}
                            label={option.value}
                            key={index}
                          />
                        );
                      } else if (
                        data.AnswerType === "DD" &&
                        option.value.trim() !== ""
                      ) {
                        return (
                          <Typography variant="h6" key={index}>
                            {option.value}
                          </Typography>
                        );
                      } else return null;
                    })}
                  </FormGroup>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(ViewQuestion);
