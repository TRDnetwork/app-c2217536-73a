```typescript
import { supabaseClient } from '@supabase/supabase-js';
import { sendEmail } from '../../lib/email';
import { resetPasswordEmailTemplate } from '../../emails/reset-password';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabaseSecret = 'your-supabase-secret';

const supabase = supabaseClient(supabaseUrl, supabaseKey, supabaseSecret);

export const handler = async (event: any) => {
  const { email } = event.body;

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-app-url.com/reset-password',
    });

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to reset password' }),
      };
    }

    // Send password reset email
    const resetLink = `https://your-app-url.com/reset-password?token=${data.token}`;
    const resetPasswordEmailHtml = resetPasswordEmailTemplate('Task List', email, resetLink);
    await sendEmail(email, 'Reset Your Password', resetPasswordEmailHtml);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Password reset email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to reset password' }),
    };
  }
};
```

### Email Setup

Finally, we need to set up the email service by creating an account on Resend and setting the `RESEND_API_KEY` environment variable.