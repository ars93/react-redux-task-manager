// src/features/tasks/TaskList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from './taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <ul>
      {items.map((task) => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
