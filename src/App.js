import './App.css';
import TaskList from './features/tasks/TaskList';
import TaskForm from './features/tasks/TaskForm';

function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
