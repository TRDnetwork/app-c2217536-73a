```javascript
import { createServer } from 'http';
import { app } from './app';

const port = process.env.PORT || 3000;

createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```
Note: Since the app has an Express backend, we output `server.js` without `app.listen()` as per the Vercel serverless function requirements.