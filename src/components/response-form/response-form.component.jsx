import React, { Component } from "react";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputField from '../input-field/inputfield.component'
import { withStyles } from "@material-ui/core/styles";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withRouter } from 'react-router-dom';

import { req } from '../../url/url'

import ResponseFormCard from '../response-form-card/response-form-card.component'

const useStyles = {
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
};

class ResponseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qData: [],
      popperStatus: false,
    };
  }

 componentDidMount = async () => {

    const { match: { params } } = this.props;

    const res = await req.form.detail({ FormTemplateID:params.id});

    this.setState({
        qData: res
    },()=> {
        console.log(this.state.qData)
    });

 }

  render() {
    const { qData, popperStatus } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div
          style={{ margin: "auto", paddingBottom: "20px", maxWidth: "770px" }}
        >
          <Card className={classes.root}>
            <CardContent>
              <div>
                <InputField
                  className={classes.formTitle}
                  placeholder="Untitled form"
                />

                <InputField
                  className={classes.formDesc}
                  placeholder="Form description"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/*qData.map((data) => (
            <ResponseFormCard />
        ))*/}
        <MyFloatingButton onClick={this.handleOpen} done   />

        <Dialog
            open={popperStatus}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Items"}</DialogTitle>

            <DialogContent>
                Are you sure you want to submit this form ? 
            </DialogContent>
            
            <DialogActions>

            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>

            <Button onClick={this.submitForm} color="primary" autoFocus >
                Submit
            </Button>

            </DialogActions>

        </Dialog>

      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(ResponseForm));
