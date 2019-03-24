import { Empty } from "antd";
import React, { PureComponent } from "react";
import { Droppable } from "react-beautiful-dnd";

import { Grid } from "./Grid";
import { Item } from "./Item";

interface Props {
  resourceName: string;
  items: Item[];
  droppableId: string;
}

export class Content extends PureComponent<Props> {
  render() {
    const { items, resourceName, droppableId } = this.props;

    return (
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={{
            //   opacity: snapshot.isDraggingOver ? 0.2 : 1,
            //   backgroundColor: snapshot.isDraggingOver ? "grey" : "white"
            // }}
            {...provided.droppableProps}
          >
            {items.length === 0 ? (
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
              <Grid title={resourceName} items={items} />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
