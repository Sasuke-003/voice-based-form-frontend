import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ReactDOM from "react-dom";

import Typography from "@material-ui/core/Typography";

import "./view-question.styles.css";

const useStyles = makeStyles({
  card: {
    textAlign: "left",
    marginTop: "2%",
  },
});

const ViewQuestion = ({ data, handleChange }) => {
  const classes = useStyles();
  return (
    <div>
      <div className="card-wrapper">
        <Card className={classes.card}>
          <CardContent>
            <div className="question">
              <Typography variant="h5" gutterBottom>
                ----- Question statement------
              </Typography>
            </div>
            <div className="options">
              <Grid container spacing={1}>
                {["option 1", "option 2", "option 3"].map((option, index) => (
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      {option}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewQuestion;
