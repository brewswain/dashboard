import React from "react";

import "./KanbanColumn.style.scss";

import { KanbanTask } from "../..";
import { Droppable, Draggable } from "react-beautiful-dnd";

const KanbanColumn = (props) => {
  const { column, tasks, index } = props;
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="kanban__column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="kanban__title" {...provided.dragHandleProps}>
            {column.title}
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`${
                  snapshot.isDraggingOver
                    ? "kanban--active"
                    : "kanban--inactive"
                } kanban__tasks`}
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <KanbanTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
