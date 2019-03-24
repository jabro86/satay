import { Card, Icon } from "antd";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { Item, ItemList } from "./ItemList";

export type ComponentType = "basic-component" | "advanced" | "layout";

const items: { [key: string]: Item[] } = {
  "basic-component": [
    {
      id: `text-input`,
      content: `Text Field`,
      icon: "code"
    },
    {
      id: `number-input`,
      content: `Number Field`,
      icon: "bar-chart"
    }
  ],
  advanced: [],
  layout: []
};

function getItems(type: ComponentType): Item[] {
  return items[type];
}

export interface PropsType {
  droppableId: ComponentType;
  title: string;
  initialExpanded: boolean;
}

export interface StateType {
  expanded: boolean;
}

export class ComponentBox extends React.Component<PropsType, StateType> {
  private items: Item[];

  constructor(props: PropsType) {
    super(props);
    this.items = getItems(props.droppableId);
    this.state = {
      expanded: props.initialExpanded
    };
  }

  handleToggleButtonClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    return (
      <Droppable droppableId={this.props.droppableId} isDropDisabled={true}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={{}}>
            <Card
              title={this.props.title}
              size="small"
              extra={
                <Icon
                  type={this.state.expanded ? "up" : "down"}
                  onClick={this.handleToggleButtonClick}
                />
              }
              bodyStyle={{
                display: this.state.expanded ? "inherit" : "none"
              }}
            >
              <ItemList items={this.items} />
            </Card>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
