import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";

export class TextPage extends PureComponent<RouteComponentProps<{}>> {
  render() {
    const {
      location: { state }
    } = this.props;
    return <h2>{state && state.message ? state.message : ""}</h2>;
  }
}
