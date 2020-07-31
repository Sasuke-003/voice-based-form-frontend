
import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Link } from "react-router-dom";
import { req } from "../../url/url";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

class MyForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
      page: 0,
    };
  }

  incrementPage = () => {
    this.setState(
      (prevState, props) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.setLinkToState();
      }
    );
  };

  decrementPage = () => {
    if (this.state.page !== 0) {
      this.setState(
        (prevState, props) => ({
          page: prevState.page - 1,
        }),
        () => {
          this.setLinkToState();
        }
      );
    }
  };

  setLinkToState = async () => {
    try {
      const res = await req.form.list(this.state.page);
      let newList = [];
      for (let i = 0; i < res.length; i++) {
        newList.push("/forms/" + res[i]._id);
      }
      this.setState({
        links: newList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.setLinkToState();
  }

  render() {
    const { links } = this.state;

    return (
      <div>
        <IconButton
          aria-label="delete"
          onClick={this.decrementPage}
          disabled={this.state.page === 0 ? true : false}
        >
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>

        {this.state.page + 1}

        <IconButton aria-label="delete" onClick={this.incrementPage}>
          <NavigateNextIcon fontSize="large" />
        </IconButton>
        {links.length ? (
          links.map((link, index) => (
            <div key={index}>
              <div
                style={{
                  margin: "auto",
                  paddingBottom: "5px",
                  maxWidth: "770px",
                }}
              >
                <Card
                  style={{
                    transition: "box-shadow 280ms",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    marginTop: "2%",
                  }}
                >
                  <CardContent>
                    <Link to={link} variant="body2">
                      {link}
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <br />
            </div>
          ))
        ) : (
          <h4>NO LINKS AVAILABLE</h4>
        )}
      </div>
    );
  }
}

export default MyForms;

