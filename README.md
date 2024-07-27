# Task List 

The Task List application allows users to create, view, update, and manage tasks and their associated subtasks. Each task can have a status indicating its progress (Pending, In Progress, Completed). Users can set deadlines and add descriptions to tasks and subtasks for better organization. The application also supports filtering and searching for tasks, making it easier to keep track of ongoing projects and deadlines.

## Description

* You can create new tasks with subtasks
* You can edit existing subtasks and tasks
* You can add dealdine to each task and can filter by it too
* You can update status of task as well as for each task
* You can filter the tasks by status
* You can delete complete task or any single subtask

## Getting Started

### Ruby version
This project uses Ruby version 3.0.2. Ensure you have this version installed using a version manager like rbenv or rvm.

### Dependencies

* Rails: 7.0.2
* PostgreSQL: Database for storing tasks and subtasks.
* Node.js: Required for compiling JavaScript assets.
* Yarn: JavaScript package manager.

### Configuration

#### Clone the Repository:
```
git clone https://github.com/your-username/TaskList.git
cd TaskList
```

#### Install Required Gems:
```
bundle install
```

#### Setup Environment Variables:
Create a .env file in the root directory to store sensitive information like database credentials. Example:
```
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

```

### Database creation
To set up the database, run:
```
rails db:create
```

### Database initialization
To initialize the database schema and seed data, run:
```
rails db:migrate
rails db:seed
```

### How to run the test suite
This project uses RSpec for testing. To run the test suite:
```
bundle exec rspec
```
Ensure all tests pass before deploying.

### Deployment instructions
#### Render
This application can be deployed on Render. Ensure your database and environment variables are set up on the Render dashboard.

* Build and Deploy:

```
git push render master
```

* Migrate Database:
After deploying, run the migration command via the Render dashboard or SSH.

* Netlify (Frontend):
If using Netlify for the frontend, ensure CORS settings are properly configured in the backend.

* Additional Information

### CORS Configuration
Ensure CORS is correctly set up to allow requests from your frontend domain. Modify config/initializers/cors.rb to include your frontend's URL:

```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://your-frontend-domain.netlify.app'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
