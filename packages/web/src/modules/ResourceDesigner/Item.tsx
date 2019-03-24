import React, { PureComponent } from "react";

export interface Item {
  id: string;
  content: string;
}

interface Props {
  item: Item;
}

export class ItemComponent extends PureComponent<Props> {
  render() {
    return <div>{this.props.item.content}</div>;
  }
}
