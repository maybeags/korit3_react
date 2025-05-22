import { useEffect } from "react"

function useTitle(title) {
  useEffect( () => {
    console.log('title이 바뀌었습니다');
    document.title = title;
  }, [title]); 
}

export default useTitle;