# Setup Environment Variables
To set up the environment variables, follow these steps:

1. Create a `.env` file in the root of the project
2. Add the following environment variables:
```makefile
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_SECRET=
RESEND_API_KEY=
```
3. Replace the values with your actual Supabase and Resend API credentials

# Setup Database
To set up the database, follow these steps:

1. Create a new database on Supabase
2. Run the `db/schema.sql` file to create the tables
3. Run the `db/seed.sql` file to seed the data (if applicable)

Note: The database setup is only required if you plan to use the Supabase backend. If you're using the frontend-only version, you can skip this step.