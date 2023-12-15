### TaskManager

## To Sign Up

# Request

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

# Response

```
{
    "status": true,
    "message": "registered succesfully"
}
```
