import React from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "./editable-question.styles.css";

const useStyles = makeStyles({
  root: {
    width: "770px",
    margin: "auto",
    marginTop: "20px",
    paddingBottom: "64px",
  },
});

const EditableQuestion = ({ data, handleChange }) => {
  const classes = useStyles();
  return (
    <section className="home-section">
      <Card className={classes.root} raised>
        <CardContent></CardContent>
        <CardActions></CardActions>
      </Card>
    </section>
  );
};

export default EditableQuestion;
