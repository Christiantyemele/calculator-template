import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Calculator from './Calculator'

describe('Calculator', () => {
  let user

  beforeEach(async () => {
    user = userEvent.setup()
    render(<Calculator />)
  })

  const getDisplay = () => document.querySelector('.display')

  it('renders calculator with display and buttons', () => {
    const display = getDisplay()
    const buttons = screen.getAllByRole('button')

    expect(display).toBeInTheDocument()
    expect(display.textContent).toBe('0')
    expect(buttons.length).toBe(17)
  })

  it('displays numbers when number buttons are clicked', async () => {
    const button5 = screen.getByRole('button', { name: '5' })
    const button3 = screen.getByRole('button', { name: '3' })

    await user.click(button5)
    expect(getDisplay().textContent).toBe('5')

    await user.click(button3)
    expect(getDisplay().textContent).toBe('53')
  })

  it('clears display when AC button is clicked', async () => {
    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: 'AC' }))
    expect(getDisplay().textContent).toBe('0')
  })

  it('performs addition correctly', async () => {
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('8')
  })

  it('performs subtraction correctly', async () => {
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '−' }))
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('5')
  })

  it('performs multiplication correctly', async () => {
    await user.click(screen.getByRole('button', { name: '6' }))
    await user.click(screen.getByRole('button', { name: '×' }))
    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('42')
  })

  it('performs division correctly', async () => {
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('4')
  })

  it('handles division by zero', async () => {
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('NaN')
  })

  it('supports decimal points', async () => {
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '5' }))
    expect(getDisplay().textContent).toBe('3.5')
  })

  it('prevents multiple consecutive decimal points', async () => {
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    expect(getDisplay().textContent).toBe('2.')
  })

  it('resets display after operation when new number is entered', async () => {
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    expect(getDisplay().textContent).toBe('3')
  })

  it('chains operations together correctly', async () => {
    // 5 + 3 = 8, then 8 - 2 = 6
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '−' }))
    expect(getDisplay().textContent).toBe('8') // Result of 5 + 3
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('6')
  })

  it('prevents multiple consecutive operators', async () => {
    // 5 + × 3 should interpret as 5 × 3 = 15
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '×' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('15')
  })

  it('handles decimal arithmetic', async () => {
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(getDisplay().textContent).toBe('4')
  })

  it('starts new number after equals', async () => {
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    expect(getDisplay().textContent).toBe('2')
  })

  it('replaces leading 0 when number is entered', async () => {
    await user.click(screen.getByRole('button', { name: '5' }))
    expect(getDisplay().textContent).toBe('5')
  })

  it('buttons are rendered dynamically from array', () => {
    const { container } = render(<Calculator />)
    const buttons = container.querySelectorAll('.btn')

    expect(buttons.length).toBe(17)

    const clearButton = container.querySelector('.btn.clear')
    const operatorButtons = container.querySelectorAll('.btn.operator')
    const equalsButton = container.querySelector('.btn.equals')

    expect(clearButton).toBeInTheDocument()
    expect(operatorButtons.length).toBe(4)
    expect(equalsButton).toBeInTheDocument()
  })
})
