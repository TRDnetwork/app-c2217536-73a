```typescript
import { supabaseClient } from '@supabase/supabase-js';
import { sendEmail } from '../../lib/email';
import { welcomeEmailTemplate } from '../../emails/welcome';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabaseSecret = 'your-supabase-secret';

const supabase = supabaseClient(supabaseUrl, supabaseKey, supabaseSecret);

export const handler = async (event: any) => {
  const { taskText } = event.body;
  const { user } = event;

  try {
    const { data, error } = await supabase
      .from('app_afdb_tasks')
      .insert([{ task_text: taskText, user_id: user.id }]);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to add task' }),
      };
    }

    // Send welcome email
    const welcomeEmailHtml = welcomeEmailTemplate('Task List', user.username);
    await sendEmail(user.email, 'Welcome to Task List', welcomeEmailHtml);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Task added successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to add task' }),
    };
  }
};
```