import React, { Component } from "react";
import PropTypes from "prop-types";
import jwt from "jsonwebtoken";
import { withRouter } from "dva/router";
// import { addFlashMessage } from '../actions/flashMessages';
export default function (ComposedComponent) {
  class Authenticate extends Component {
    state = {
      username: null,
    };
    componentDidMount() {
      if (!localStorage.hasOwnProperty("jwtToken")) {
        this.props.history.push("/");
      }
      jwt.verify(
        localStorage.getItem("jwtToken"),
        "HALLOTHISISASECRETKEYFOREVERYBODY",
        (err, decoded) => {
          if (err) {
            console.log(err);
            this.props.history.push("/");
          }
          if (!err) {
            this.setState({ username: decoded.username });
            // console.log(decoded.exp, decoded.username);
          }
        }
      );
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.username !== prevState.username) {
        if (!localStorage.hasOwnProperty("jwtToken")) {
          this.props.history.push("/");
        }
        jwt.verify(
          localStorage.getItem("jwtToken"),
          "HALLOTHISISASECRETKEYFOREVERYBODY",
          function (err, decoded) {
            if (err) {
              console.log(err);
              this.props.history.push("/");
            }
            if (!err) {
              this.setState({ username: decoded.username });
              // console.log(decoded.exp, decoded.username); // bar
            }
          }.bind(this)
        );
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} username={this.state.username} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    // addFlashMessage: PropTypes.func.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  return withRouter(Authenticate);
  // , { addFlashMessage }
}
