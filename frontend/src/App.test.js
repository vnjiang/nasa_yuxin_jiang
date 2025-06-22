import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// mock 子组件，让测试更简单（可选！）
jest.mock('./components/home', () => (props) => (
  <button onClick={() => props.onEnter()}>MockHomeButton</button>
));
jest.mock('./components/apod', () => () => <div>MockAPOD</div>);

describe('App integration test', () => {
  test('默认展示 Home，点击后切换到 Apod', () => {
    render(<App />);
    // 默认应该显示 Home（我们 mock 的按钮）
    expect(screen.getByText('MockHomeButton')).toBeInTheDocument();

    // 模拟点击，进入 APOD
    fireEvent.click(screen.getByText('MockHomeButton'));

    // 应该切换到 Apod 页面（mock 的 div）
    expect(screen.getByText('MockAPOD')).toBeInTheDocument();
  });
});
