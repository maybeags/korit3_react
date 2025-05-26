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

      {
        repodata.length === 0 ? (
          <p>검색 결과가 없습니다 ❗❗</p>
        ) : (
          <table>
            <tbody>
              {repodata.map(repo => (
                <tr key={repo.id}>
                  <td>{repo.full_name}</td>
                  <td>
                    <a href={repo.html_url}>{repo.html_url}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }


    </>
  )
}

export default App
