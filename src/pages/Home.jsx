import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, CheckSquare, Clock, StickyNote } from 'lucide-react'
import { Button, Card } from '../components/UI'

export default function Home() {
  return (
    <div className="grid gap-8">
      <section className="text-center">
        <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-800">
          Organize your day with clarity
        </motion.h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          A modern, minimal dashboard to plan tasks, log work hours, track progress, and keep notes — all in one place.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/dashboard"><Button>Open Dashboard</Button></Link>
          <Link to="/tasks"><Button className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800">Manage Tasks</Button></Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-blue-600" />
            <h3 className="font-semibold">Daily Task List</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">Add, edit, and prioritize tasks with smooth interactions and clean visuals.</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Clock className="text-blue-600" />
            <h3 className="font-semibold">Work Hours Log</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">Track your focused hours each day and keep a healthy rhythm.</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-600" />
            <h3 className="font-semibold">Weekly & Monthly Insights</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">Beautiful charts summarize your progress over time.</p>
        </Card>
      </section>

      <Card className="p-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Stay in flow</h3>
            <p className="mt-2 text-slate-600">Designed with soft shadows, rounded corners, and subtle gradients — professional yet friendly.</p>
            <div className="mt-4 flex gap-3">
              <Link to="/dashboard"><Button>Get Started</Button></Link>
              <Link to="/notes"><Button className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800">Notes</Button></Link>
            </div>
          </div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="h-56 bg-gradient-to-br from-blue-100 to-white rounded-xl border border-blue-100" />
        </div>
      </Card>
    </div>
  )
}
