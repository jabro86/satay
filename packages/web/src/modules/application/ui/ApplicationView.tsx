import { FindResourcesQuery_findResources } from "@faas/controller";
import buildOpenCrudProvider from "@faas/ra-data-prisma";
import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import UserIcon from "@material-ui/icons/Group";
import { HttpLink, InMemoryCache } from "apollo-boost";
import { DataProvider } from "ra-core/esm/types";
import React, { Component } from "react";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import authProvider from "./authProvider";
import { Dashboard } from "./Dashboard";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: deepPurple,
    secondary: {
      main: "#00695c"
    }
  }
});

interface State {
  dataProvider: DataProvider | null;
}

interface Props {
  uri: string;
  serviceName: string;
  resources: FindResourcesQuery_findResources[];
}

class ApplicationView extends Component<Props, State> {
  state = { dataProvider: null };

  componentDidMount = async () => {
    try {
      const dataProvider = await buildOpenCrudProvider({
        clientOptions: {
          link: new HttpLink({ uri: this.props.uri }),
          cache: new InMemoryCache()
        }
      });
      this.setState({ dataProvider });
    } catch (error) {
      console.warn(`No data provider found for uri ${this.props.uri}.`);
    }
  };

  render() {
    const { dataProvider } = this.state;
    const { serviceName, resources } = this.props;

    if (!dataProvider) {
      return <div>Loading</div>;
    }
    return (
      <Admin
        title={"My Admin Application"}
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        theme={theme}
      >
        {resources.map(({ id, name }) => (
          <Resource
            key={id}
            name={name}
            list={ListGuesser}
            edit={EditGuesser}
            icon={name === "User" ? UserIcon : undefined}
          />
        ))}
      </Admin>
    );
  }
}

export default ApplicationView;
