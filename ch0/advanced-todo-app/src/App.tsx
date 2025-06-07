import './App.css'
import { useState, useEffect } from 'react';
import type { Todo } from './types/Todo';
import TodoForm from "./components/TodoForm"
import {TodoList} from "./components/TodoList"
// 밑에 얘는 이제 필요 없겠네요.
// import { v4 as uuid } from 'uuid';
import { addTodoApi, deleteTodoApi, getAllTodos, toggleTodoApi } from './services/todoService';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([]);   // 수정이 이렇게 일어닙니다. localStorage를 참조하지 않기 때문에요. DB에서 가져옵니다.
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodosFromServer = async (): Promise<void> => {
      try {
        setIsLoading(true); // 로딩 시작
        const serverTodos = await getAllTodos(); // API 호출
        setTodos(serverTodos);
      } catch (error) {
        console.log("서버로부터 데이터를 가져오는 데 실패했습니다: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodosFromServer();
  }, []);

  const handleAddTodo = async (text: string): Promise<void> => {
    try {
      const newTodoFromServer = await addTodoApi(text);
      setTodos(prevTodos => [...prevTodos, newTodoFromServer]);
    } catch (error) {
      console.log('할 일 추가에 실패했습니다. : ', error);
    }
  };  // addTodo로 작성한 부분 수정해야겠죠.

  const handleDeleteTodo = async (id: number): Promise<void> => {
    try {
      // 1. 서버에 삭제 요청 보내기
      await deleteTodoApi(id);
      
      // 2. 성공적으로 삭제되면, 프론트엔드 상태에서도 해당 id를 가진 할 일을 제거
      // ★★★ 'prevTdodos'의 오타를 'prevTodos'로 수정했습니다.
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  
    } catch (error) {
      // 오류를 console.log 대신 console.error로 찍으면 더 명확하게 구분할 수 있습니다.
      console.error("할 일 삭제에 실패했습니다:", error);
    }
  };

  const handleToggleComplete = async (id: number): Promise<void> => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if(!todoToToggle) return;

    try {
      const updatedTodoFromServer = await toggleTodoApi(id, todoToToggle.completed);
      setTodos(prevTodos => 
        prevTodos.map(todo =>
          todo.id === id ? updatedTodoFromServer : todo
        )
      );
    } catch (error) {
      console.log('할 일 완료 상태 변경에 실패했습니다. : ', error);
    }
  };

  console.log("현재 Todos 상태:", todos);


  return (
    <div>
      <h1>To Do 리스트</h1>
      <TodoForm onAddTodo={handleAddTodo}/>
      <TodoList todos={todos} onToggleComplete={handleToggleComplete} onDeleteTodo={handleDeleteTodo}/>
    </div>
  )
}

export default App
