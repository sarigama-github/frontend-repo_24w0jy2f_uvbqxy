import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, BarChart3, CheckSquare, Clock, StickyNote, Home } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg tracking-tight text-slate-800">
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">FlowTrack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({isActive}) => `flex items-center gap-2 hover:text-blue-600 transition ${isActive ? 'text-blue-700' : 'text-slate-600'}`}><Home size={18}/> Home</NavLink>
            <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-2 hover:text-blue-600 transition ${isActive ? 'text-blue-700' : 'text-slate-600'}`}><BarChart3 size={18}/> Dashboard</NavLink>
            <NavLink to="/tasks" className={({isActive}) => `flex items-center gap-2 hover:text-blue-600 transition ${isActive ? 'text-blue-700' : 'text-slate-600'}`}><CheckSquare size={18}/> Tasks</NavLink>
            <NavLink to="/work" className={({isActive}) => `flex items-center gap-2 hover:text-blue-600 transition ${isActive ? 'text-blue-700' : 'text-slate-600'}`}><Clock size={18}/> Work Log</NavLink>
            <NavLink to="/notes" className={({isActive}) => `flex items-center gap-2 hover:text-blue-600 transition ${isActive ? 'text-blue-700' : 'text-slate-600'}`}><StickyNote size={18}/> Notes</NavLink>
          </nav>
          <button className="md:hidden p-2 rounded-lg border border-slate-200 bg-white/70"><Menu/></button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200/60 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} FlowTrack. Stay focused, stay in flow.
      </footer>
    </div>
  )
}
