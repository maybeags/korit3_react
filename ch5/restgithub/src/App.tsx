import { useState } from 'react'
import './App.css'
import axios from 'axios';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ICellRendererParams } from 'ag-grid-community';



type Repository = {
  id: number;
  full_name: string; 
  html_url: string;
}

function App() {
  const [ keyword, setKeyword ] = useState('');
  const [ repodata, setRepodata ] = useState<Repository[]>([]);
  // 컬럼 정의
  const [columnDefs] = useState<ColDef[]>([
    {headerName: 'Github ID', field: 'owner.login', sortable: true, filter: true},
    // {field: 'name', sortable: true, filter: true},
    {headerName: '설명', field: 'description', sortable: true, filter: true},
    {headerName: 'Link', field: 'html_url', sortable: true, filter: true},
    {
      headerName: '버튼누르기',
      field: 'full_name',
      cellRenderer: (params: ICellRendererParams) => (
        <button
          onClick={() => alert(params.value)}
        >
          Click 💥
        </button>
      )
    }
  ]);
  
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
      <br />
      <br />

      <div className="ag-theme-material" style={{ height: 500, width: 850 }}>
        <AgGridReact 
          rowData={repodata} 
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>


    </>
  )
}

export default App
