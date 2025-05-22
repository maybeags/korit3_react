import { useState, useEffect } from "react";

export default function Counter2() {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    console.log('useEffect가 호출되었습니다.')
    return () => {
      console.log('clean up 함수가 호출되었습니다.');
    }
  }, [count]);

  return(
    <div>
      <p>Counter = {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        증가
      </button>
    </div>
  );
}
