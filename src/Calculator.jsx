import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleCalculate = (prev, curr, op) => {
    const prevNum = parseFloat(prev)
    const currNum = parseFloat(curr)

    switch (op) {
      case '+':
        return prevNum + currNum
      case '−':
        return prevNum - currNum
      case '×':
        return prevNum * currNum
      case '÷':
        return currNum !== 0 ? prevNum / currNum : NaN
      default:
        return currNum
    }
  }

  const handleNumber = (num) => {
    if (shouldResetDisplay) {
      setCurrentValue(String(num))
      setShouldResetDisplay(false)
    } else {
      setCurrentValue(currentValue === '0' ? String(num) : currentValue + num)
    }
  }

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setCurrentValue('0.')
      setShouldResetDisplay(false)
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.')
    }
  }

  const handleOperation = (op) => {
    if (operation && !shouldResetDisplay) {
      const result = handleCalculate(previousValue, currentValue, operation)
      setCurrentValue(String(result))
      setPreviousValue(result)
    } else {
      setPreviousValue(currentValue)
    }
    setOperation(op)
    setShouldResetDisplay(true)
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = handleCalculate(previousValue, currentValue, operation)
      setCurrentValue(String(result))
      setPreviousValue(null)
      setOperation(null)
      setShouldResetDisplay(true)
    }
  }

  const handleClear = () => {
    setCurrentValue('0')
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const buttons = [
    { label: 'AC', onClick: handleClear, className: 'clear' },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'operator' },
    { label: '×', onClick: () => handleOperation('×'), className: 'operator' },
    { label: '−', onClick: () => handleOperation('−'), className: 'operator' },
    { label: '7', onClick: () => handleNumber(7), className: 'number' },
    { label: '8', onClick: () => handleNumber(8), className: 'number' },
    { label: '9', onClick: () => handleNumber(9), className: 'number' },
    { label: '+', onClick: () => handleOperation('+'), className: 'operator' },
    { label: '4', onClick: () => handleNumber(4), className: 'number' },
    { label: '5', onClick: () => handleNumber(5), className: 'number' },
    { label: '6', onClick: () => handleNumber(6), className: 'number' },
    { label: '.', onClick: handleDecimal, className: 'number' },
    { label: '1', onClick: () => handleNumber(1), className: 'number' },
    { label: '2', onClick: () => handleNumber(2), className: 'number' },
    { label: '3', onClick: () => handleNumber(3), className: 'number' },
    { label: '=', onClick: handleEquals, className: 'equals' },
    { label: '0', onClick: () => handleNumber(0), className: 'number zero' },
  ]

  return (
    <div className="calculator">
      <div className="display">{currentValue}</div>
      <div className="buttons-grid">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`btn ${btn.className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calculator
