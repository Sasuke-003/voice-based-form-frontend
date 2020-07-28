import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
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
import "./create-question-container.styles.css";

const useStyles = makeStyles({
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
    width: "50%",
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

class CreateQuestionContainer extends Component {
  render() {
    const { data, currentId, handleEdit, handleChange } = this.props;
    const classes = useStyles();
    return (
      <div>
        {/* <div onClick={() => handleEdit(data.id)}>
          {true ? (
            <EditableQuestion data={data} handleChange={handleChange} />
          ) : (
            <ViewQuestion data={data} />
          )}
        </div> */}

        <div className="card-wrapper">
          <Card className={classes.root}>
            <CardContent>
              <div>
                <TextField
                  className={classes.formTitle}
                  placeholder="Untitled form"
                />
                <TextField
                  className={classes.formDesc}
                  placeholder="Form description"
                />
              </div>
            </CardContent>
          </Card>

          {/* question  */}
          <Card className={classes.root}>
            <CardContent>
              <div className="text-select-div">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  placeholder="Question"
                  className={classes.question}
                />

                <Select
                  className={classes.selectMenu}
                  variant="outlined"
                  id="demo-simple-select-outlined"
                  label="Multiple choice"
                >
                  <MenuItem value="">{/* <em>None</em> */}</MenuItem>
                  <MenuItem value="Checkboxes">
                    <CheckBoxOutlinedIcon style={{ marginRight: "8px" }} />
                    Checkboxes
                  </MenuItem>
                  <MenuItem value="Multiple choice">
                    <RadioButtonCheckedIcon style={{ marginRight: "8px" }} />
                    Multiple choice
                  </MenuItem>
                  <MenuItem value="Drop-down">
                    <ArrowDropDownCircleIcon style={{ marginRight: "8px" }} />
                    Drop-down
                  </MenuItem>
                </Select>
              </div>
              <div className="options">
                {/* options */}
                <ul>
                  <li>
                    <Card className={classes.optionCards}>
                      <PanoramaFishEyeIcon style={{ margin: "18px" }} />
                      <p>option 1</p>
                      <CloseIcon style={{ margin: "18px" }} />
                    </Card>
                  </li>
                  <li>
                    <Card className={classes.optionCards}>
                      <PanoramaFishEyeIcon style={{ margin: "18px" }} />
                      <p>option 1</p>
                      <CloseIcon style={{ margin: "18px" }} />
                    </Card>
                  </li>
                </ul>
              </div>
              <div className="add-option">
                <p>Add options </p>
                <AddIcon style={{ marginTop: "3px" }} />
              </div>

              <Divider style={{ marginTop: "50px" }} />
              <div className="bottom-contents">
                <Delete className={classes.deleteIcon} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  render() {
    const { data, currentId, handleEdit, handleChange } = this.props;

    return (
      <div onClick={() => handleEdit(data.id)}>
        {currentId === data.id ? (
          <EditableQuestion data={data} handleChange={handleChange} />
        ) : (
          <ViewQuestion data={data} />
        )}
      </div>
    );
  }
}

export default CreateQuestionContainer;
