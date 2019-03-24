import React, { PureComponent } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
`;

export interface Item {
  id: string;
  content: string;
}

interface Props {
  item: Item;
  index: number;
}

export class ItemComponent extends PureComponent<Props> {
  render() {
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.item.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
