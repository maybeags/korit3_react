export default function MyComponent() {
  // 버튼을 눌렀을 때 호출되는 이벤트 작성
  const handleClick = () => alert(`버튼이 클릭되었습니다`)
  
  return(
    <>
      <button onClick={handleClick}>Click!</button>  
    </>
  );
}