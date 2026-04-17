```typescript
import { supabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseSecret = process.env.SUPABASE_SECRET;

const supabase = supabaseClient(supabaseUrl, supabaseKey, supabaseSecret);

export const handler = async (event: any) => {
  const { taskId } = event.body;
  const { user } = event;

  try {
    const { data, error } = await supabase
      .from('app_afdb_tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete task' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete task' }),
    };
  }
};
// SECURITY FIX: Replaced hardcoded secrets with process.env references
```