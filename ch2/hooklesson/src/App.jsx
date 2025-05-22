import AuthContext from './components/AuthContext';
import MyComponent from './components/MyComponent';
import MyList from './components/MyList';
import MyTable from './components/MyTable';
import StudentsList from './components/StudentsList';
import './App.css';

function App() {
  const userName = '김일';

  return (
    <>
      <StudentsList />
      <MyTable />
      <MyList />
      <AuthContext.Provider value={userName}>
        <MyComponent />
      </AuthContext.Provider>
    </>
  );
}

export default App
