import { JSONSchema6 } from "json-schema";
import React, { Component } from "react";
import Form from "react-jsonschema-form-bs4";

interface PropsType {
  schema: JSONSchema6;
}

class FormEngine extends Component<PropsType> {
  render() {
    const { schema } = this.props;

    return (
      <Form
        schema={schema}
        onChange={() => {}}
        onSubmit={() => {}}
        onError={() => {}}
      >
        <div className="row">
          <div className="col-sm-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
          <div className="col-sm-9 text-right">
            <button className="btn btn-secondary" type="button">
              Show Data
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

export { FormEngine};
