```javascript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { setupRealtime, teardownRealtime } from './realtime.js';

const supabaseUrl = window.__SUPABASE_URL__;
const supabaseAnonKey = window.__SUPABASE_ANON_KEY__;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

let currentUser = null;

async function init() {
    try {
        const session = await supabase.auth.getSession();
        if (session.data.session) {
            currentUser = session.data.session.user;
            setupRealtime(supabase, renderTasks);
            renderTasks();
        } else {
            renderAuthGate();
        }
    } catch (error) {
        console.error(error);
        renderAuthGate();
    } finally {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.app').style.display = 'block';
    }
}

function renderAuthGate() {
    const authGate = document.createElement('div');
    authGate.innerHTML = `
        <input type="email" id="email-input" placeholder="Enter your email">
        <input type="password" id="password-input" placeholder="Enter your password">
        <button id="sign-up-btn">Sign Up</button>
        <button id="sign-in-btn">Sign In</button>
    `;
    document.querySelector('.app').appendChild(authGate);

    document.querySelector('#sign-up-btn').addEventListener('click', async () => {
        try {
            const email = document.querySelector('#email-input').value;
            const password = document.querySelector('#password-input').value;
            const { user, session } = await supabase.auth.signUp({
                email,
                password,
            });
            currentUser = user;
            setupRealtime(supabase, renderTasks);
            renderTasks();
        } catch (error) {
            console.error(error);
        }
    });

    document.querySelector('#sign-in-btn').addEventListener('click', async () => {
        try {
            const email = document.querySelector('#email-input').value;
            const password = document.querySelector('#password-input').value;
            const { user, session } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            currentUser = user;
            setupRealtime(supabase, renderTasks);
            renderTasks();
        } catch (error) {
            console.error(error);
        }
    });
}

function renderTasks() {
    supabase
        .from('app_afdb_tasks')
        .select('*')
        .eq('user_id', currentUser.id)
        .then(({ data, error }) => {
            if (error) {
                console.error(error);
                return;
            }
            const taskList = document.querySelector('#task-list');
            taskList.innerHTML = '';
            data.forEach((task) => {
                const taskElement = document.createElement('li');
                taskElement.classList.add('task');
                taskElement.innerHTML = `
                    <span class="task-text">${task.task_text}</span>
                    <div class="task-actions">
                        <button class="delete-btn">Delete</button>
                        <button class="complete-btn">Complete</button>
                    </div>
                `;
                taskList.appendChild(taskElement);

                taskElement.querySelector('.delete-btn').addEventListener('click', async () => {
                    try {
                        await supabase.from('app_afdb_tasks').delete().eq('id', task.id);
                        renderTasks();
                    } catch (error) {
                        console.error(error);
                    }
                });

                taskElement.querySelector('.complete-btn').addEventListener('click', async () => {
                    try {
                        await supabase.from('app_afdb_tasks').update({ id: task.id, is_complete: true });
                        renderTasks();
                    } catch (error) {
                        console.error(error);
                    }
                });
            });
        });
}

document.querySelector('#add-task-btn').addEventListener('click', async () => {
    try {
        const taskText = document.querySelector('#task-input').value;
        await supabase.from('app_afdb_tasks').insert({ task_text: taskText, user_id: currentUser.id });
        renderTasks();
    } catch (error) {
        console.error(error);
    }
});

document.querySelector('#sign-out-btn').addEventListener('click', async () => {
    try {
        await supabase.auth.signOut();
        currentUser = null;
        teardownRealtime();
        renderAuthGate();
    } catch (error) {
        console.error(error);
    }
});

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        currentUser = session.user;
        setupRealtime(supabase, renderTasks);
        renderTasks();
    } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        teardownRealtime();
        renderAuthGate();
    }
});

init();
```