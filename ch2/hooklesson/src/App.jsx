// import AuthContext from './components/AuthContext';
// import MyComponent from './components/MyComponent';
// import MyList from './components/MyList';
// import MyTable from './components/MyTable';
// import StudentsList from './components/StudentsList';
import StudentsList2 from './components/StudentsList2';
import './App.css';

function App() {
  const userName = '김일';

  return (
    <>
      <StudentsList2 />
      {/* <MyTable />
      <MyList />
      <AuthContext.Provider value={userName}>
        <MyComponent />
      </AuthContext.Provider> */}
    </>
  );
}

export default App
