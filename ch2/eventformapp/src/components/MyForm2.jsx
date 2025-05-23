import { useState } from "react";

export default function MyForm2() {
  const [ text, setText ] = useState('');

  const handleSubmit = (event) => {
    alert(`${text} 라고 입력하셨습니다!`);
    event.preventDefault();
  }

  // input창에 타이핑하는 내용이 갱신되면(즉, text 상태가 바뀌면 -> 그러면 setText를 쓸겁니다. -> setText()의 argument가 input창에 쓰는 내용이 되겠네요)
  // const handleChange = (event) => {
  //   setText(event.target.value);
  // }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={event => setText(event.target.value)} value={text} />
      <br />
      <br />
      <input type="submit" value="클릭하세요" />
    </form>
  );
}