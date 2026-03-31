import { useState } from 'react'

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
    { label: 'AC', onClick: handleClear, variant: 'clear' },
    { label: '÷', onClick: () => handleOperation('÷'), variant: 'operator' },
    { label: '×', onClick: () => handleOperation('×'), variant: 'operator' },
    { label: '−', onClick: () => handleOperation('−'), variant: 'operator' },
    { label: '7', onClick: () => handleNumber(7), variant: 'number' },
    { label: '8', onClick: () => handleNumber(8), variant: 'number' },
    { label: '9', onClick: () => handleNumber(9), variant: 'number' },
    { label: '+', onClick: () => handleOperation('+'), variant: 'operator' },
    { label: '4', onClick: () => handleNumber(4), variant: 'number' },
    { label: '5', onClick: () => handleNumber(5), variant: 'number' },
    { label: '6', onClick: () => handleNumber(6), variant: 'number' },
    { label: '.', onClick: handleDecimal, variant: 'number' },
    { label: '1', onClick: () => handleNumber(1), variant: 'number' },
    { label: '2', onClick: () => handleNumber(2), variant: 'number' },
    { label: '3', onClick: () => handleNumber(3), variant: 'number' },
    { label: '=', onClick: handleEquals, variant: 'equals' },
    { label: '0', onClick: () => handleNumber(0), variant: 'number', span: 2 },
  ]

  const getButtonClasses = (variant) => {
    const baseClasses = 'font-semibold text-lg sm:text-xl rounded-lg transition-all duration-200 active:scale-95 hover:shadow-lg'

    switch (variant) {
      case 'operator':
        return `${baseClasses} bg-teal hover:bg-teal/90 text-white shadow-md`
      case 'clear':
        return `${baseClasses} bg-red-500 hover:bg-red-600 text-white shadow-md`
      case 'equals':
        return `${baseClasses} bg-green-500 hover:bg-green-600 text-white shadow-md`
      case 'number':
      default:
        return `${baseClasses} bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20`
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl border border-white/20 bg-white/5">
        {/* Display */}
        <div className="bg-navy/50 backdrop-blur-sm border border-teal/30 rounded-xl p-4 sm:p-6 mb-6 text-right">
          <div className="text-teal text-3xl sm:text-5xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
            {currentValue}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`${getButtonClasses(btn.variant)} ${
                btn.span ? `col-span-${btn.span}` : ''
              } p-4 sm:p-5`}
              style={btn.span ? { gridColumn: `span ${btn.span}` } : {}}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calculator
