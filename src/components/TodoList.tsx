import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import { Todo } from '../types/Todo';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todosList = await getTodos();
      setTodos(todosList);
      setError('');
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    
    try {
      await createTodo({
        title: newTodoTitle,
        completed: false
      });
      setNewTodoTitle('');
      loadTodos();
    } catch (err) {
      setError('Error al crear la tarea');
      console.error(err);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    if (!todo.id) return;
    
    try {
      await updateTodo(todo.id, {
        completed: !todo.completed
      });
      loadTodos();
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error(err);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Nueva tarea"
            className="flex-1 p-2 border border-gray-300 rounded-l"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Añadir
          </button>
        </div>
      </form>
      
      <ul className="divide-y divide-gray-200">
        {todos.length === 0 ? (
          <li className="py-2">No hay tareas</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="py-2 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  className="mr-2"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => todo.id && handleDeleteTodo(todo.id)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList; 