```javascript
import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/dom';
import App from './app';

describe('App', () => {
  it('renders task list', () => {
    const { getByText } = render(<App />);
    expect(getByText('Task List')).toBeInTheDocument();
  });

  it('adds new task', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const taskInput = getByPlaceholderText('Enter new task');
    const addTaskButton = getByText('Add Task');
    fireEvent.change(taskInput, { target: { value: 'New task' } });
    fireEvent.click(addTaskButton);
    expect(getByText('New task')).toBeInTheDocument();
  });

  it('deletes task', () => {
    const { getByText, getAllByRole } = render(<App />);
    const taskList = getAllByRole('listitem');
    const deleteButton = taskList[0].querySelector('button');
    fireEvent.click(deleteButton);
    expect(taskList.length).toBe(0);
  });

  it('marks task as complete', () => {
    const { getByText, getAllByRole } = render(<App />);
    const taskList = getAllByRole('listitem');
    const completeButton = taskList[0].querySelector('button');
    fireEvent.click(completeButton);
    expect(taskList[0].classList.contains('complete')).toBe(true);
  });
});
```