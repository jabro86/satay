import * as React from "react";

interface Props {
  logout: () => Promise<void>;
  onFinish: () => void;
}

export default class CallLogout extends React.PureComponent<Props> {
  componentDidMount = async () => {
    await this.props.logout();
    this.props.onFinish();
  };

  render() {
    return null;
  }
}
