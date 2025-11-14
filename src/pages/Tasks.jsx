import { useEffect, useState } from 'react'
import { Card, Button, Input, Badge } from '../components/UI'
import { api } from '../lib/api'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState('medium')

  const load = async () => {
    try {
      const data = await api.get('/api/tasks')
      setTasks(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { load() }, [])

  const addTask = async () => {
    if (!title) return
    try {
      await api.post('/api/tasks', { title, description: desc, priority })
      setTitle('')
      setDesc('')
      setPriority('medium')
      load()
    } catch (e) { console.error(e) }
  }

  const toggleDone = async (t) => {
    try {
      if (!t.id || t.id.startsWith('demo')) {
        // demo row; just update UI
        setTasks(prev => prev.map(x => x.id === t.id ? { ...x, status: x.status === 'done' ? 'pending' : 'done' } : x))
        return
      }
      await api.put(`/api/tasks/${t.id}`, { status: t.status === 'done' ? 'pending' : 'done' })
      load()
    } catch (e) { console.error(e) }
  }

  const remove = async (t) => {
    try {
      if (!t.id || t.id.startsWith('demo')) {
        setTasks(prev => prev.filter(x => x.id !== t.id))
        return
      }
      await api.del(`/api/tasks/${t.id}`)
      load()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="font-semibold">Add Task</h3>
        <div className="mt-4 grid sm:grid-cols-4 gap-3">
          <Input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
          <Input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
          <select value={priority} onChange={e => setPriority(e.target.value)} className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button onClick={addTask}>Add</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold">Daily Tasks</h3>
        <ul className="mt-4 divide-y divide-slate-100">
          {tasks.map(t => (
            <li key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={t.status === 'done'} onChange={() => toggleDone(t)} className="h-4 w-4 rounded border-gray-300" />
                <div>
                  <p className={`text-sm ${t.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</p>
                  {t.description && <p className="text-xs text-slate-500">{t.description}</p>}
                </div>
                <Badge>{t.priority}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button className="bg-gradient-to-br from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700" onClick={() => remove(t)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
