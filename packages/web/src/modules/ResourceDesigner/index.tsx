import { Col, Row } from "antd";
import React from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";

import { Content } from "./content";
import { Item } from "./content/Item";
import { ComponentBox } from "./nav/ComponentBox";

let ID_GENERATOR = 0;

const CONTENT_DROP_ID = "content";
const NAV_DROP_ID = "nav";

interface State {
  items: Item[];
}

interface Props {
  name: string;
}

export class ResourceDesigner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: []
    };
  }

  onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === CONTENT_DROP_ID) {
      if (source.droppableId === NAV_DROP_ID) {
        this.setState(state => ({
          items: [
            ...state.items,
            { id: String(ID_GENERATOR++), content: draggableId }
          ]
        }));
      }
    }
  };
  onDragUpdate = (initial: DragUpdate, provided: ResponderProvided) => {};
  onDragStart = (initial: DragStart, provided: ResponderProvided) => {};

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Row type="flex" justify="center" gutter={16}>
          <Col span={8}>
            <ComponentBox
              title="Basic Components"
              droppableId={NAV_DROP_ID}
              initialExpanded={true}
            />
          </Col>
          <Col span={16}>
            <Content
              items={this.state.items}
              resourceName={this.props.name}
              droppableId={CONTENT_DROP_ID}
            />
          </Col>
        </Row>
      </DragDropContext>
    );
  }
}
