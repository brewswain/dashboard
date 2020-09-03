import React, { useEffect, useState } from "react";

import "./KanbanCardList.style.scss";

import { firestore, getKanbanData } from "../../../firebase/firebase.utils";

import { KanbanColumn } from "../..";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

const KanbanCardList = () => {
  const [kanbanData, setKanbanData] = useState({
    tasks: {
      "task-1": {},
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1"],
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Finished",
        taskIds: [],
      },
    },

    columnOrder: ["column-1", "column-2", "column-3"],
  });
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getKanbanData(isLoggedIn, setKanbanData);
    // let unsubscribeFromSnapshot = null;
    // // unsubscribeFromSnapshot = taskRef.onSnapshot(async (snapshot) => {
    // //   const tasksMap = convertSnapshotToObject(snapshot);
    // //   console.log(tasksMap);
    // console.log();
  }, []);

  useEffect(() => {
    console.log(kanbanData);
  }, [kanbanData]);

  const onDragStart = () => {
    return;
  };

  const onDragUpdate = (update) => {
    return;
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // shifting columns

    if (type === "column") {
      const newColumnOrder = Array.from(kanbanData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newKanbanData = {
        ...kanbanData,
        columnOrder: newColumnOrder,
      };

      setKanbanData(newKanbanData);
      return;
    }

    // re-ordering items in same list
    const start = kanbanData.columns[source.droppableId];
    const finish = kanbanData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newKanbanData = {
        ...kanbanData,
        columns: {
          ...kanbanData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setKanbanData(newKanbanData);
      return;
    }

    // Moving items from one list to another

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newKanbanData = {
      ...kanbanData,
      columns: {
        ...kanbanData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setKanbanData(newKanbanData);
    return;
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="all-columns" type="column" direction="horizontal">
        {(provided) => (
          <div
            className="kanban__cardlist"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {kanbanData.columnOrder.map((columnId, index) => {
              const column = kanbanData.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => kanbanData.tasks[taskId]
              );

              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanCardList;
