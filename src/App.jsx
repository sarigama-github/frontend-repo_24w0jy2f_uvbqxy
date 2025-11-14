import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import WorkLog from './pages/WorkLog'
import Notes from './pages/Notes'

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/work" element={<WorkLog/>} />
        <Route path="/notes" element={<Notes/>} />
      </Route>
    </Routes>
  )
}

export default App
