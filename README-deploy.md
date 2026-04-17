# Deploying the Task List App

## Prerequisites

* Docker installed on your system
* Docker Compose installed on your system
* A Supabase instance set up with the necessary environment variables
* A Resend API key set up with the necessary environment variables

## Deploy with Docker

1. Build the Docker image: `docker build -t task-list-app .`
2. Run the Docker container: `docker run -p 3000:3000 task-list-app`
3. Access the app at `http://localhost:3000`

## Deploy with Compose

1. Create a `docker-compose.yml` file with the necessary configuration
2. Run `docker-compose up` to start the containers
3. Access the app at `http://localhost:3000`

## Deploy to Railway

1. Create a new Railway project
2. Link your GitHub repository to Railway
3. Configure the environment variables in Railway
4. Deploy the app to Railway

## Deploy to Render

1. Create a new Render project
2. Link your GitHub repository to Render
3. Configure the environment variables in Render
4. Deploy the app to Render

## Environment Variables

* `SUPABASE_URL`: The URL of your Supabase instance
* `SUPABASE_KEY`: The key for your Supabase instance
* `SUPABASE_SECRET`: The secret for your Supabase instance
* `RESEND_API_KEY`: The key for your Resend API instance

## Migrations

To run migrations, use the following command: `npx prisma migrate dev`

Note: Make sure to replace the `example.com` in the `nginx.conf` file with your actual domain name.