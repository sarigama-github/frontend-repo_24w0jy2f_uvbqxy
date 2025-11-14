import { useEffect, useState } from 'react'
import { Card, Button, Input } from '../components/UI'
import { api } from '../lib/api'

export default function WorkLog() {
  const [entries, setEntries] = useState([])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [hours, setHours] = useState('')
  const [project, setProject] = useState('General')
  const [notes, setNotes] = useState('')

  const load = async () => {
    try {
      const data = await api.get('/api/worklogs')
      setEntries(data)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    if (!hours) return
    try {
      await api.post('/api/worklogs', { date: new Date(date), hours: parseFloat(hours), project, notes })
      setHours('')
      setNotes('')
      load()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="font-semibold">Log Work Hours</h3>
        <div className="mt-4 grid sm:grid-cols-5 gap-3">
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Input type="number" step="0.25" placeholder="Hours" value={hours} onChange={e => setHours(e.target.value)} />
          <Input placeholder="Project" value={project} onChange={e => setProject(e.target.value)} />
          <Input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
          <Button onClick={add}>Add</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold">Recent Entries</h3>
        <ul className="mt-4 divide-y divide-slate-100">
          {entries.map((e) => (
            <li key={e.id} className="py-3 text-sm flex items-center justify-between">
              <span className="text-slate-700">{new Date(e.date).toLocaleDateString()} — {e.project} — {e.hours}h</span>
              {e.notes && <span className="text-xs text-slate-500">{e.notes}</span>}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
