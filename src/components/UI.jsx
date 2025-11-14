import { motion } from 'framer-motion'

export function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white/90 backdrop-blur rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/60 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}

export function Badge({ children, className = '' }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 ${className}`}>
      {children}
    </span>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition ${className}`}
    />
  )
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition ${className}`}
    />
  )
}
