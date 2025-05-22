import { useState } from "react";
import useTitle from "../js/useTitle";

export default function Counter() {
  const [ count, setCount ] = useState(0);
  useTitle(`${count} 번 클릭`)      //이건 순수 JS함수라고 했습니다. 그래서 작성 방법 상에서의 차이가 있습니다.

  return(
    <div>
      <p>Counter = {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        증가
      </button>
    </div>
  );
}