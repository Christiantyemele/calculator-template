import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from './Calculator'

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />)
  })

  const getDisplay = () => {
    const displays = screen.getAllByText(/\d|0|NaN/)
    return displays[0].textContent
  }

  const clickButton = (label) => {
    const buttons = screen.getAllByRole('button')
    const button = buttons.find(btn => btn.textContent === label)
    if (!button) throw new Error(`Button "${label}" not found`)
    fireEvent.click(button)
  }

  const clickSequence = (sequence) => {
    sequence.forEach(label => clickButton(label))
  }

  describe('Basic Arithmetic Operations', () => {
    it('should add two numbers', () => {
      clickSequence(['5', '+', '3', '='])
      expect(getDisplay()).toBe('8')
    })

    it('should subtract two numbers', () => {
      clickSequence(['9', '−', '4', '='])
      expect(getDisplay()).toBe('5')
    })

    it('should multiply two numbers', () => {
      clickSequence(['6', '×', '7', '='])
      expect(getDisplay()).toBe('42')
    })

    it('should divide two numbers', () => {
      clickSequence(['8', '÷', '2', '='])
      expect(getDisplay()).toBe('4')
    })
  })

  describe('Display Management', () => {
    it('should display initial value of 0', () => {
      const display = screen.getAllByText(/0/)[0]
      expect(display).toBeTruthy()
    })

    it('should replace display when entering first digit after operation', () => {
      clickSequence(['5', '+'])
      expect(getDisplay()).toBe('5')
      clickButton('3')
      expect(getDisplay()).toBe('3')
    })

    it('should append digits to current display', () => {
      clickSequence(['1', '2', '3'])
      expect(getDisplay()).toBe('123')
    })

    it('should handle leading zero correctly', () => {
      clickSequence(['0', '5'])
      expect(getDisplay()).toBe('5')
    })
  })

  describe('Decimal Point Support', () => {
    it('should add decimal point to number', () => {
      clickSequence(['5', '.'])
      expect(getDisplay()).toBe('5.')
    })

    it('should prevent duplicate decimal points', () => {
      clickSequence(['5', '.', '.', '3'])
      expect(getDisplay()).toBe('5.3')
    })

    it('should add decimal point to 0 after decimal click', () => {
      clickSequence(['.'])
      expect(getDisplay()).toBe('0.')
    })

    it('should calculate with decimal numbers', () => {
      clickSequence(['2', '.', '5', '+', '1', '.', '5', '='])
      expect(getDisplay()).toBe('4')
    })

    it('should handle multiple decimal operations', () => {
      clickSequence(['1', '0', '.', '5', '÷', '2', '.', '5', '='])
      expect(getDisplay()).toBe('4.2')
    })
  })

  describe('Clear Functionality', () => {
    it('should clear display and reset state', () => {
      clickSequence(['5', '+', '3'])
      expect(getDisplay()).toBe('3')
      clickButton('AC')
      expect(getDisplay()).toBe('0')
    })

    it('should reset all state after clear', () => {
      clickSequence(['5', '+', '3', 'AC', '2', '='])
      expect(getDisplay()).toBe('2')
    })

    it('should clear mid-operation', () => {
      clickSequence(['7', '×', 'AC'])
      expect(getDisplay()).toBe('0')
      clickSequence(['4', '='])
      expect(getDisplay()).toBe('4')
    })
  })

  describe('Consecutive Operator Prevention', () => {
    it('should replace operator if another is clicked immediately', () => {
      clickSequence(['5', '+', '−', '3', '='])
      expect(getDisplay()).toBe('2')
    })

    it('should handle multiple operator changes', () => {
      clickSequence(['1', '0', '+', '×', '÷', '2', '='])
      expect(getDisplay()).toBe('5')
    })

    it('should not chain operations without pressing =', () => {
      clickSequence(['5', '+', '3', '+', '2', '='])
      expect(getDisplay()).toBe('10')
    })
  })

  describe('Operation Chaining', () => {
    it('should evaluate intermediate operations', () => {
      clickSequence(['5', '+', '3', '+', '2', '='])
      expect(getDisplay()).toBe('10')
    })

    it('should chain multiple operations', () => {
      clickSequence(['1', '0', '+', '5', '−', '3', '×', '2', '='])
      expect(getDisplay()).toBe('24')
    })

    it('should handle long operation chains', () => {
      clickSequence(['2', '+', '2', '=', '+', '3', '='])
      expect(getDisplay()).toBe('7')
    })

    it('should chain after equals', () => {
      clickSequence(['5', '+', '5', '=', '×', '2', '='])
      expect(getDisplay()).toBe('20')
    })
  })

  describe('Division by Zero', () => {
    it('should return NaN for division by zero', () => {
      clickSequence(['5', '÷', '0', '='])
      expect(getDisplay()).toBe('NaN')
    })

    it('should handle NaN in subsequent operations', () => {
      clickSequence(['5', '÷', '0', '=', '+', '2', '='])
      expect(getDisplay()).toBe('NaN')
    })
  })

  describe('Complex Scenarios', () => {
    it('should handle decimal operations with equals', () => {
      clickSequence(['7', '.', '5', '+', '2', '.', '5', '='])
      expect(getDisplay()).toBe('10')
    })

    it('should calculate large numbers', () => {
      clickSequence(['9', '9', '9', '×', '9', '='])
      expect(getDisplay()).toBe('8991')
    })

    it('should handle zero in operations', () => {
      clickSequence(['0', '+', '5', '='])
      expect(getDisplay()).toBe('5')
    })

    it('should handle subtraction resulting in negative', () => {
      clickSequence(['3', '−', '5', '='])
      expect(getDisplay()).toBe('-2')
    })

    it('should handle multiple consecutive decimal clicks', () => {
      clickSequence(['5', '.', '.', '.', '3', '='])
      expect(getDisplay()).toBe('5.3')
    })

    it('should perform correct calculation after AC', () => {
      clickSequence(['5', '+', '3', '='])
      expect(getDisplay()).toBe('8')
      clickButton('AC')
      clickSequence(['2', '×', '4', '='])
      expect(getDisplay()).toBe('8')
    })
  })
})
