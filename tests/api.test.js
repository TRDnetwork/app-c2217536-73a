```javascript
import { describe, it, expect } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';

const server = setupServer(
  rest.post('/api/add-task', (req, res, ctx) => {
    return res(ctx.json({ message: 'Task added successfully' }));
  }),
  rest.post('/api/delete-task', (req, res, ctx) => {
    return res(ctx.json({ message: 'Task deleted successfully' }));
  }),
  rest.post('/api/update-task', (req, res, ctx) => {
    return res(ctx.json({ message: 'Task updated successfully' }));
  })
);

describe('API', () => {
  it('adds new task', async () => {
    const response = await axios.post('/api/add-task', { taskText: 'New task' });
    expect(response.data.message).toBe('Task added successfully');
  });

  it('deletes task', async () => {
    const response = await axios.post('/api/delete-task', { taskId: 1 });
    expect(response.data.message).toBe('Task deleted successfully');
  });

  it('updates task', async () => {
    const response = await axios.post('/api/update-task', { taskId: 1, taskText: 'Updated task' });
    expect(response.data.message).toBe('Task updated successfully');
  });
});
```