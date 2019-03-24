import { Empty, Icon } from "antd";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

export interface Item {
  id: string;
  content: string;
  icon: string;
}

interface Props {
  items: Item[];
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: `5px 0px 5px 5px`,
  margin: `0 0 8px 0`,
  borderRadius: "2px",
  color: "#fff",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "rgb(24, 144, 255)",

  // styles we need to apply on draggables
  ...draggableStyle
});

export function ItemList(props: Props): JSX.Element | null {
  const { items } = props;

  return items.length > 0 ? (
    <>
      {items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
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
              <Icon type={item.icon} style={{ marginRight: "5px" }} />
              {item.content}
            </div>
          )}
        </Draggable>
      ))}
    </>
  ) : (
    <Empty />
  );
}
