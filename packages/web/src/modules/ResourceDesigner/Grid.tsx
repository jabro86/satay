import React, { PureComponent } from "react";
import styled from "styled-components";

import { Item, ItemComponent } from "./Item";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const ItemList = styled.div`
  padding: 8px;
`;

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
