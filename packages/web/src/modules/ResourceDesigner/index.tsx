import { Col, Empty, Row } from "antd";
import React from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";

import { ComponentBox } from "./component-box";
import { Grid } from "./Grid";
import { Item } from "./Item";

interface StateType {
  items: Item[];
}

interface Props {
  name: string;
}

const componentTypes: { [k: string]: string } = {
  "text-input": "text",
  "number-input": "number"
};

let idGenerator: number = 0;

export class ResourceDesigner extends React.Component<Props, StateType> {
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

    if (destination.droppableId === "form") {
      if (draggableId in componentTypes) {
        this.setState(state => ({
          items: [
            ...state.items,
            { id: String(idGenerator++), content: componentTypes[draggableId] }
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
            <Row>
              <Col span={24} style={{ marginBottom: "24px" }}>
                <ComponentBox
                  title="Basic Components"
                  droppableId="basic-component"
                  initialExpanded={true}
                />
              </Col>
              <Col span={24} style={{ marginBottom: "24px" }}>
                <ComponentBox
                  title="Advanced"
                  droppableId="advanced"
                  initialExpanded={false}
                />
              </Col>
              <Col span={24}>
                <ComponentBox
                  title="Layout"
                  droppableId="layout"
                  initialExpanded={false}
                />
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <Droppable droppableId="form">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    opacity: snapshot.isDraggingOver ? 0.2 : 1,
                    backgroundColor: snapshot.isDraggingOver ? "grey" : "white"
                  }}
                  {...provided.droppableProps}
                >
                  {this.state.items.length === 0 ? (
                    <Empty
                      style={{
                        padding: "10px",
                        border: "1px dashed #bfbfbf",
                        borderRadius: "4px",
                        margin: "0"
                      }}
                      description={<span>No Data</span>}
                    />
                  ) : (
                    <Grid title={this.props.name} items={this.state.items} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        </Row>
      </DragDropContext>
    );
  }
}
