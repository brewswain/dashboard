import React from "react";

import "./KanbanTask.style.scss";

import { Draggable } from "react-beautiful-dnd";

const KanbanTask = (props) => {
  const { task, index } = props;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${
            snapshot.isDragging ? "task--active" : "task--inactive"
          } task__container`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTask;
