import React, { PureComponent } from "react";

import { Item, ItemComponent } from "./Item";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.SFC<ContainerProps> = ({ children }) => (
  <div
    style={{
      margin: "8px",
      border: "1px solid lightgrey",
      borderRadius: "2px"
    }}
  >
    {children}
  </div>
);

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.SFC<TitleProps> = ({ children }) => (
  <h3
    style={{
      padding: "8px"
    }}
  >
    {children}
  </h3>
);

interface ItemListProps {
  children: React.ReactNode;
}

const ItemList: React.SFC<ItemListProps> = ({ children }) => (
  <div
    style={{
      padding: "8px"
    }}
  >
    {children}
  </div>
);

interface GridProps {
  title: string;
  items: Item[];
}

export class Grid extends PureComponent<GridProps> {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        <ItemList>
          {this.props.items.map((item, index) => (
            <ItemComponent key={item.id} item={item} index={index} />
          ))}
        </ItemList>
      </Container>
    );
  }
}
