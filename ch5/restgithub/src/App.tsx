import { useState } from 'react'
import './App.css'
import axios from 'axios';

type Repository = {
  id: number;
  full_name: string; 
  html_url: string;
}

function App() {
  const [ keyword, setKeyword ] = useState('');
  const [ repodata, setRepodata ] = useState<Repository[]>([]);
  
  const handleClick = () => {
    axios.get<{ items: Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => setRepodata(response.data.items))
    .catch(error => console.log(error));
  }

  return (
    <>
      <input type="text" value={keyword} onChange={event => setKeyword(event.target.value)}/>
      <br />
      <br />
      <button onClick={handleClick}>검색</button>

  


    </>
  )
}

export default App
