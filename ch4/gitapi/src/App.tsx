import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Repositories from './components/Repositories';
import './App.css'

function App() {

  const queryClient = new QueryClient();
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Repositories />
      </QueryClientProvider>
    </>
  )
}

export default App
