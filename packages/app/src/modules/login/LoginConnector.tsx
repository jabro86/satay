import { LoginController } from "@satay/controller";
import { SecureStore } from "expo";
import * as React from "react";

import { SID_KEY } from "../shared/constants";
import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent {
  saveSessionId = (sessionId: string) => {
    SecureStore.setItemAsync(SID_KEY, sessionId);
  };

  render() {
    return (
      <LoginController onSessionId={this.saveSessionId}>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
