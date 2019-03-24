import React, { PureComponent } from "react";

import { Item, ItemComponent } from "./Item";

const Container: React.SFC = () => (
  <div
    style={{
      margin: "8px",
      border: "1px solid lightgrey",
      borderRadius: "2px"
    }}
  />
);

const Title: React.SFC = () => (
  <h3
    style={{
      padding: "8px"
    }}
  />
);

const ItemList: React.SFC = () => (
  <div
    style={{
      padding: "8px"
    }}
  />
);

interface Props {
  title: string;
  items: Item[];
}

export class Grid extends PureComponent<Props> {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        <ItemList>
          {this.props.items.map(item => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </ItemList>
      </Container>
    );
  }
}
