import { useEffect, useState } from 'react'
import { Card, Button, Input, Textarea } from '../components/UI'
import { api } from '../lib/api'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const load = async () => {
    try {
      const data = await api.get('/api/notes')
      setNotes(data)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    if (!title || !content) return
    try {
      await api.post('/api/notes', { title, content, pinned: false })
      setTitle('')
      setContent('')
      load()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="font-semibold">Add Note</h3>
        <div className="mt-4 grid sm:grid-cols-5 gap-3">
          <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <div className="sm:col-span-3"><Textarea rows={1} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} /></div>
          <Button onClick={add}>Add</Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {notes.map(n => (
          <Card key={n.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{n.title}</h4>
                <p className="mt-1 text-sm text-slate-600 whitespace-pre-wrap">{n.content}</p>
              </div>
              {n.pinned && <span className="text-xs text-blue-600">Pinned</span>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
