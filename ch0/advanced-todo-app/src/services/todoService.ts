import axios from "axios";
import type { Todo } from "../types/Todo";

const API_BASE_URL = 'http://localhost:8080/api'    // 백엔드 API 주소 : 근데 지난번 수업과 좀 다르죠. 개선 가능합니다.

interface HateoasTodo {
  text: string;
  completed: boolean;
  _links: {
    self: {
      href: string;
    };
  };
}

// Spring Data REST의 HATOAS 응답 구조를 위한 타입( postman에서 보던 JSON 생각하시면 됩니다)
interface SpringDataRestResponse {
  _embedded?: {
    todos: HateoasTodo[];
  };
};

// GET 요청을 통해 모든 할 일 목록을 서버로부터 가져올 수 있도록할겁니다.
export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<SpringDataRestResponse>(`${API_BASE_URL}/todos`);
    
    const todosFromApi = response.data._embedded?.todos || [];

    // ---▼ 여기가 핵심 수정 로직입니다 ▼---

    // 받아온 HATEOAS 형식의 배열을 우리가 사용하기 좋은 Todo[] 형태로 변환(map)합니다.
    const formattedTodos: Todo[] = todosFromApi.map(hateoasTodo => {
      // 1. self 링크 URL에서 마지막 ID 값을 추출합니다.
      const selfHref = hateoasTodo._links.self.href;
      const idAsString = selfHref.substring(selfHref.lastIndexOf('/') + 1);
      const id = parseInt(idAsString, 10);

      // 2. { id, text, completed } 형태의 새로운 객체를 만들어 반환합니다.
      return {
        id: id,
        text: hateoasTodo.text,
        completed: hateoasTodo.completed
      };
    });

    // 3. 최종적으로 가공된 배열을 반환합니다.
    return formattedTodos;

    // ---▲ 여기가 핵심 수정 로직입니다 ▲---

  } catch (error) {
    console.error("서버에서 todo list를 가져오는 중 오류가 발생했습니다:", error);
    return [];
  }
};

export const addTodoApi = async (text: string): Promise<Todo> => {
  try {
    // 백엔드가 보내주는 HATEOAS 응답 형식을 위한 타입을 정의합니다.
    interface HateoasResponse {
      text: string;
      completed: boolean;
      _links: {
        self: {
          href: string;
        };
      };
    }

    // 서버에 데이터를 생성해달라고 요청합니다.
    const response = await axios.post<HateoasResponse>(`${API_BASE_URL}/todos`, { text, completed: false });

    // ---▼ 여기가 핵심 로직입니다 ▼---

    // 1. _links.self.href 값(예: "http://.../todos/54")을 가져옵니다.
    const selfHref = response.data._links.self.href;

    // 2. URL의 마지막 '/' 뒤에 있는 숫자(ID)를 문자열로 추출합니다.
    const idAsString = selfHref.substring(selfHref.lastIndexOf('/') + 1);

    // 3. 추출한 문자열 ID를 실제 숫자로 변환합니다.
    const newId = parseInt(idAsString, 10);

    // 4. 프론트엔드에서 사용하기 좋은 최종 Todo 객체를 조립합니다.
    const newTodo: Todo = {
      id: newId,
      text: response.data.text,
      completed: response.data.completed,
    };

    // 5. 조립된 객체를 반환합니다.
    return newTodo;

    // ---▲ 여기가 핵심 로직입니다 ▲---

  } catch (error) {
    console.error("할 일 추가 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export const deleteTodoApi = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  } catch (error) {
    console.log(`${id} 번 할 일 삭제 중 오류가 발생했습니다. : `, error);
    throw error;
  }
};

export const toggleTodoApi = async (id: number, completed: boolean): Promise<Todo> => {
  try {
    // PATCH 응답 본문에는 모든 필드가 포함되지 않을 수 있으므로, 타입을 any로 받습니다.
    const response = await axios.patch<any>(`${API_BASE_URL}/todos/${id}`, { completed: !completed });

    // ---▼ 여기가 핵심 로직입니다 ▼---

    // 이미 알고 있는 id와, 응답으로 받은 text, completed 값을 조합하여
    // { id, text, completed } 형태의 완벽한 Todo 객체를 만듭니다.
    const updatedTodo: Todo = {
      id: id, // ★★★ URL에서 ID를 파싱할 필요 없이, 이미 알고 있는 id를 사용합니다!
      text: response.data.text,
      completed: response.data.completed,
    };

    // 가공된 객체를 반환합니다.
    return updatedTodo;

    // ---▲ 여기가 핵심 로직입니다 ▲---
    
  } catch (error) {
    console.error(`${id}번 할 일 상태 변경 중 오류가 발생했습니다:`, error);
    throw error;
  }
};