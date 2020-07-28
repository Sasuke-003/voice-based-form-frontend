import React from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import "./editable-question.styles.css";

const useStyles = makeStyles({
  root: {
    width: "770px",
    margin: "auto",
    marginTop: '20px',
    paddingBottom: "64px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const EditableQuestion = ({ data, handleChange }) => {
  const classes = useStyles();
  return (
    <section className="home-section">
      <Card className={classes.root} raised >
        <CardContent></CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </section>
  );
};

export default EditableQuestion;
