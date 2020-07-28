import React from "react";
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
    paddingBottom: "64px",
  },
});

const EditableQuestion = ({ qData }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent></CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EditableQuestion;
