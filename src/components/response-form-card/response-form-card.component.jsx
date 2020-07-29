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

const ResponseFormCard = () => {
  const { data } = this.props;
  const classes = useStyles();

  return (
    <div>
      <div className="card-wrapper">
        <Card className={classes.card}>
          <CardContent>
            <div className="question">
              <Typography variant="h5" gutterBottom>
                {data.Question === ""
                  ? "Please write a question here..."
                  : data.Question}
              </Typography>
            </div>
            <div>
              <FormControl component="fieldset">
                <FormGroup>
                  {data.AnswerType === "TxtFld" ? (
                    <InputField label={"Answer here"} disabled fullWidth />
                  ) : null}
                  {data.Answers.map((option, index) => {
                    if (
                      data.AnswerType === "ChkBox" &&
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
                      data.AnswerType === "RadBtn" &&
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
                      data.AnswerType === "DrpDwn" &&
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
