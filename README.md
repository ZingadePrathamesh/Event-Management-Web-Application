# Event Management using React and Spring Boot

## Prerequisites
Before you begin, make sure you have the following tools installed:

- Docker
- Java 17
- Node.js
- npm

## Steps

### 1. Clone and Setup the REST API

1.1. Clone the project:

```bash
git clone <repository-url>
cd <repository-folder>
```

1.2. Import the "event management rest service" in Eclipse:

- Choose File -> Import -> Existing Maven Project
- Select the "event management rest service" folder
- Finish the import process

### 2. Start the Docker Container for MySQL

2.1. Open a command prompt and run the following Docker command:

```bash
docker run --detach --env MYSQL_ROOT_PASSWORD=dummy --env MYSQL_USER=eventdb --env MYSQL_PASSWORD=dummy --env MYSQL_DATABASE=eventsqldb --name mysql_event --publish 3310:3306 mysql:8-oracle
```

### 3. Run the REST API

3.1. Run the project in Eclipse. The REST API will be exposed on port 8080.

3.2. Optionally, test the API using Talend API Tester Chrome extension.

### 4. Start the React Application

4.1. Navigate to the cloned project folder in the command prompt.

4.2. Run the following command:

```bash
npm start
```

This will start the React application.

### About the Project

This project is built using React, Spring Boot, MySQL, and Docker. The architecture includes a REST API that communicates with the frontend and the database. Base64 encoding is employed for authentication, and robust security measures are implemented on the REST API side. Spring Security is configured, and CSRF protection is disabled for POST and PUT methods.

The application allows CRUD operations for events and tasks. Note that the UI design may need improvement, so contributions to enhance it are welcome. Happy hacking!

Feel free to reach out for any issues or improvements. Enjoy using the Event Management application!