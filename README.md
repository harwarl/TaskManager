# TaskManager

## Description

This is a REST API project built with Node.js and Express, using Yarn as the package manager.

## Features

- REST API
- Node.js server with Express
- Yarn for package management

## Getting Started

Follow these steps to get your GraphQL project up and running.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/harwarl/TaskManager.git

   ```

2. Change into the projects directory

   ```bash
   cd TaskManager

   ```

3. Install Dependencies with yarn

   ```bash
   yarn install

   ```

4. To start up the graphql server in development mode, run

   ```bash
   yarn dev
   ```

The server will start, and you can access the GraphQL playground at http://localhost:3000 to interact with the API.

## Sign Up

### Request

```
curl --location 'http://localhost:3000/api/v1/auth/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU3MTk4NSwiZXhwIjoxNzAyNTcyODg1fQ.T4tKzhk8BQBKxjU6ncByK8g6ylh4ndODWn2FBrNnOv8' \
--data-raw '{
    "lastname": "Adeolu",
    "username": "adeolu01",
    "email": "adeolu01@gmail.com",
    "password": "Adeolu@23454"
}'
```

### Response

```
{
    "status": true,
    "message": "registered succesfully"
}
```

## Sign In

### Request

```
curl --location 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU4NTI1MiwiZXhwIjoxNzAyNTg2MTUyfQ.gyrVwImZGpZPwQQ4MKzLafWlln6sZAghHn83AZOkAHw' \
--data-raw '{
    "email": "adeolu01@gmail.com",
    "password": "Adeolu@23454"
}'
```

### Response

```
{
    "status": true,
    "date": {
        "user_id": 1,
        "firstname": null,
        "lastname": "Adeolu",
        "username": "adeolu01",
        "email": "adeolu01@gmail.com",
        "password": "$2b$12$v4sncsk10gDpZsRTnO/cWuBSdFlZxl1lmxnd12ep/OymLuoxNyLAG",
        "createdat": "2023-12-14T20:20:47.305Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU4NTI1MiwiZXhwIjoxNzAyNTg2MTUyfQ.gyrVwImZGpZPwQQ4MKzLafWlln6sZAghHn83AZOkAHw"
}
```

## To Add Tasks

### Request

```
curl --location 'http://localhost:3000/api/v1/tasks/add' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU4NTI1MiwiZXhwIjoxNzAyNTg2MTUyfQ.gyrVwImZGpZPwQQ4MKzLafWlln6sZAghHn83AZOkAHw' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU4NTI1MiwiZXhwIjoxNzAyNTg2MTUyfQ.gyrVwImZGpZPwQQ4MKzLafWlln6sZAghHn83AZOkAHw' \
--data '{
    "title" : "This is a task",
    "description": "This is a description",
    "dueDate": "2023-11-23"
}'
```

### Response

```
{
    "status": true,
    "message": "Task Created"
}
```

## To Update Task

### Request

```
curl --location --request PUT 'http://localhost:3000/api/v1/tasks/:1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU2OTY4OSwiZXhwIjoxNzAyNTcwNTg5fQ.mgucj8PUR6gcEXDM3BqDVJfmKGuYnBaC1OowkgEyeOo' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU4NTI1MiwiZXhwIjoxNzAyNTg2MTUyfQ.gyrVwImZGpZPwQQ4MKzLafWlln6sZAghHn83AZOkAHw' \
--data '{
    "title": "this is it"
}'
```

### Response

```
{
    "status": true,
    "updated": true
}
```

## To Delete Task

### Request

```
curl --location --request DELETE 'http://localhost:3000/api/v1/tasks/:1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU3MTk4NSwiZXhwIjoxNzAyNTcyODg1fQ.T4tKzhk8BQBKxjU6ncByK8g6ylh4ndODWn2FBrNnOv8' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjU4NTI1MiwiZXhwIjoxNzAyNTg2MTUyfQ.gyrVwImZGpZPwQQ4MKzLafWlln6sZAghHn83AZOkAHw'
```

### Response

```
{
    "status": true,
    "deleted": true
}
```
