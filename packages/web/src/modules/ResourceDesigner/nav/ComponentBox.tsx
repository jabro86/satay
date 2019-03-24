import { Card, Empty, Icon } from "antd";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const COMPONENTS: Component[] = [
  {
    id: `string`,
    content: `Text Field`,
    icon: "code"
  },
  {
    id: `number`,
    content: `Number Field`,
    icon: "bar-chart"
  }
];

export interface ComponentBoxProps {
  droppableId: string;
  title: string;
  initialExpanded: boolean;
}

export interface ComponentBoxState {
  expanded: boolean;
}

export class ComponentBox extends React.Component<
  ComponentBoxProps,
  ComponentBoxState
> {
  constructor(props: ComponentBoxProps) {
    super(props);
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
              <ComponentList components={COMPONENTS} />
            </Card>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export interface Component {
  id: string;
  content: string;
  icon: string;
}

interface ComponentListProps {
  components: Component[];
}

function ComponentList(props: ComponentListProps): JSX.Element | null {
  const { components } = props;

  return components.length > 0 ? (
    <>
      {components.map((component, index) => (
        <Draggable key={component.id} draggableId={component.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <Icon type={component.icon} style={{ marginRight: "5px" }} />
              {component.content}
            </div>
          )}
        </Draggable>
      ))}
    </>
  ) : (
    <Empty />
  );
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  userSelect: "none",
  padding: `5px 0px 5px 5px`,
  margin: `0 0 8px 0`,
  borderRadius: "2px",
  color: "#fff",
  background: isDragging ? "lightgreen" : "rgb(24, 144, 255)",
  // styles we need to apply on draggables
  ...draggableStyle
});
