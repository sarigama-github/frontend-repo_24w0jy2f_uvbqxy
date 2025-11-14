import { useEffect, useState } from 'react'
import { Card } from '../components/UI'
import { api } from '../lib/api'

function Bar({ label, value, max, color = 'bg-blue-500' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: pct + '%' }} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [weekly, setWeekly] = useState(null)
  const [monthly, setMonthly] = useState(null)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const [w, m, a] = await Promise.all([
          api.get('/api/analytics/weekly'),
          api.get('/api/analytics/monthly'),
          api.get('/api/activities'),
        ])
        setWeekly(w)
        setMonthly(m)
        setActivities(a)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const maxHours = weekly ? Math.max(...weekly.hours) : 0
  const maxTasks = weekly ? Math.max(...weekly.tasks_completed) : 0

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold">Weekly Hours</h3>
          <div className="mt-4 space-y-3">
            {weekly && weekly.days.map((d, i) => (
              <Bar key={d} label={d} value={weekly.hours[i]} max={maxHours} />
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Weekly Completed Tasks</h3>
          <div className="mt-4 space-y-3">
            {weekly && weekly.days.map((d, i) => (
              <Bar key={d} label={d} value={weekly.tasks_completed[i]} max={maxTasks} color="bg-blue-400" />)
            )}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Monthly Overview</h3>
          <div className="mt-4 space-y-3">
            {monthly && monthly.weeks.map((w) => (
              <Bar key={w.label} label={w.label} value={w.hours} max={Math.max(...monthly.weeks.map(x => x.hours))} color="bg-blue-600" />
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold">Recent Activity</h3>
        <ul className="mt-4 divide-y divide-slate-100">
          {activities.map((a) => (
            <li key={a.id} className="py-3 text-sm flex items-center justify-between">
              <span className="text-slate-700">{a.message}</span>
              <span className="text-xs text-slate-500">{new Date(a.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
