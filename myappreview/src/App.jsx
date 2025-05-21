import Introduction1 from "./Introduction1"
import Introduction2 from "./Introduction2"
import Introduction3 from "./Introduction3"

function App() {

  return (
    <>
      <Introduction1 />
      <Introduction2 age='38' major='영어교육과' />
      <Introduction3 futureJob = 'Full Stack 개발자' certificate='정보처리기사, SQLD' />
    </>
    
  )
}

export default App
