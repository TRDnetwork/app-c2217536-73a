```javascript
let channels = [];

export function setupRealtime(supabase, onChange) {
    channels.push(supabase.channel('app_afdb_tasks').on('postgres_changes', (payload) => {
        onChange(payload);
    }));
    channels.forEach((channel) => channel.subscribe());
}

export function teardownRealtime() {
    channels.forEach((channel) => channel.unsubscribe());
    channels = [];
}
```