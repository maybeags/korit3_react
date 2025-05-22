import { useState } from "react";

export default function Counter() {
  const [ count, setCount ] = useState(0);

  return(
    <div>
      <p>Counter = {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        증가
      </button>
    </div>
  );
}