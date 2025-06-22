import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


jest.mock('./components/home', () => (props) => (
  <button onClick={() => props.onEnter()}>MockHomeButton</button>
));
jest.mock('./components/apod', () => () => <div>MockAPOD</div>);

describe('App integration test', () => {
  test('Default show Home，switch to Apod after click', () => {
    render(<App />);
    expect(screen.getByText('MockHomeButton')).toBeInTheDocument();


    fireEvent.click(screen.getByText('MockHomeButton'));

    expect(screen.getByText('MockAPOD')).toBeInTheDocument();
  });
});
