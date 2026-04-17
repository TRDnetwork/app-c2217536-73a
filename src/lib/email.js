```javascript
import axios from 'axios';

const resendApiKey = process.env.RESEND_API_KEY;
const resendApiUrl = 'https://api.resend.com';

const emailService = axios.create({
  baseURL: resendApiUrl,
  headers: {
    'Authorization': `Bearer ${resendApiKey}`,
    'Content-Type': 'application/json'
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    const response = await emailService.post('/send', {
      to,
      subject,
      html
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
```

### Email Templates

We will create email templates for the welcome email and password reset email.