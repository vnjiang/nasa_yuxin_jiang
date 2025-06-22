
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../components/home'


jest.mock('../components/earth', () => () => <div data-testid="earth"></div>)
jest.mock('../components/typewriter', () => ({ onDone }) => {
  setTimeout(() => onDone && onDone(), 1)
  return <div data-testid="typewriter">Typewriter</div>
})
jest.mock('../components/musicplayer', () => () => <div data-testid="musicplayer"></div>)

describe('Home component', () => {
  it('shows "Click to start your journey" and does NOT show Earth initially', () => {
    render(<Home onEnter={jest.fn()} />)
    expect(screen.getByText(/click to start your journey/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument()
    expect(screen.queryByTestId('earth')).not.toBeInTheDocument()
  })

  it('shows Earth, typewriter animation and music after clicking "Enter"', async () => {
    render(<Home onEnter={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /enter/i }))
    expect(await screen.findByTestId('earth')).toBeInTheDocument()
    expect(screen.getByTestId('typewriter')).toBeInTheDocument()
    expect(screen.getByTestId('musicplayer')).toBeInTheDocument()
  })

  it('shows the key after typewriter finishes and clicking the key calls onEnter', async () => {
    const handleEnter = jest.fn()
    render(<Home onEnter={handleEnter} />)
    fireEvent.click(screen.getByRole('button', { name: /enter/i }))

    const key = await screen.findByAltText(/key/i)
    expect(key).toBeInTheDocument()

    fireEvent.click(key)
    expect(handleEnter).toHaveBeenCalled()
  })
})

