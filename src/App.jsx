import Calculator from './Calculator'
import './App.css'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-white text-4xl sm:text-5xl font-bold">Calculator</h1>
      <Calculator />
    </div>
  )
}

export default App
