# REST API's

### Base URL - `https://ltrx.herokuapp.com`

ERROR FORMAT - 

```
{
  "code": "<ERROR_CODE>",
  "status": <ERROR_STATUS>,
  "errors": [
    {
      "message": "<ERROR_MESSAGE>"
    }
  ],
  "warnings": []
}
```
NOTE :- 
1. `ACCESS TOKEN is valid only for 5 minutes for testing & development`
2. If token expired, then API will return response like below
    ```
      {
        code: 'TOKEN_EXPIRED',
        status: 401
      }
    ```
`

REST API for  testing & developing fromtend without focussing primary on SERVER- 

## 1. User Registration

### Request

`POST /api/v1/auth/register`

    > POST /api/v1/auth/register HTTP/1.1
    > Host: ltrx.herokuapp.com
    > User-Agent: insomnia/2020.3.3
    > Content-Type: application/x-www-form-urlencoded
    > Accept: */*
    > Content-Length: 49

    | email=tetstuser@mailinator.com&password=tetstuser1234

### Response

    {
      "hashToken": "843f73bc6b94e6035e329e61f989577ec70c1382",
      "message": "An Email has been sent, Please verify your account"
    }

## 2. User Verification

### Request

`POST /api/v1/auth/verification`

    > POST /api/v1/auth/verification HTTP/1.1
    > Host: ltrx.herokuapp.com
    > User-Agent: insomnia/2020.3.3
    > Content-Type: application/x-www-form-urlencoded
    > Accept: */*
    > Content-Length: 61

    | otp=758340&hashToken=a49786ace7b9c34d522061038022ef2e592c14d4

### Response

    {
      "message": "Email succsessfully verified",
      "ok": true
    }

## 3. User Login

### Request

`POST /api/v1/auth/login`

    > POST /api/v1/auth/login HTTP/1.1
    > Host: ltrx.herokuapp.com
    > User-Agent: insomnia/2020.3.3
    > Content-Type: application/x-www-form-urlencoded
    > Accept: */*
    > Content-Length: 50

    | email=tetstuser@mailinator.com&password=hello123

### Response

    {
      "message": "You have successfully LoggedIn.",
      "refreshToken": "5f00efd379bc0a36a3e0ea19dd43e886327c50d2",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNWY1MjE4Zjc3ZTU0YWM0NzcxNDU1ZGVkIiwiZXhwIjoxNTk5MjIwNDI2LCJpYXQiOjE1OTkyMTY4MjZ9.x5t9oobmVxQ7gJ5O1IDTQgAvwRfogZIDZxhHuwhiWvo",
      "data": {
        "id": "5f5218f77e54ac4771455ded",
        "firstname": "",
        "lastname": "",
        "bio": "",
        "country": "",
        "email": "tetstuser@mailinator.com"
      }
    }


## 4. Refresh Token

### Request

`POST /api/v1/auth/refreshToken`

    > POST /api/v1/auth/refreshToken HTTP/1.1
    > Host: ltrx.herokuapp.com
    > User-Agent: insomnia/2020.3.3
    > Content-Type: application/x-www-form-urlencoded
    > Accept: */*
    > Content-Length: 239

    | refreshToken=53c1f947a03f819a9be030acca7652ce5cd22269&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNWY1MjM3OTUwNzc4ZjUxNGEwMTAxYTRmIiwiZXhwIjoxNTk5MjI3MzQyLCJpYXQiOjE1OTkyMjM3NDJ9.rfX87CrTbJF8YgQmGwwN8TFaTMKOhUonuUWlzaoQ5p0

### Response

    {
      "message": "Token has been generated",
      "refreshToken": "cf56a9d3f38380ee6779247b0930b12d72101a43",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNWY1MjM3OTUwNzc4ZjUxNGEwMTAxYTRmIiwiZXhwIjoxNTk5MjI3NDUwLCJpYXQiOjE1OTkyMjM4NTB9.U03D1qrQJo4qEUdP5Gr2sPMqOxYYprYMMzifi_TiCqY"
    }


## 5. User Profile

### Request

`GET /api/v1/auth/user`

    > GET /api/v1/auth/user HTTP/1.1
    > Host: ltrx.herokuapp.com
    > User-Agent: insomnia/2020.3.3
    > Content-Type: application/x-www-form-urlencoded
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNWY1MjE1NWFlMDM5MWIwMDE3ZDhkOTc3IiwiZXhwIjoxNTk5ODE5ODA4LCJpYXQiOjE1OTkyMTUwMDh9.IdvApTIzuFAWXjDPEgAi1yklj0z0dCwtPoP0_nj5wfI
    > Accept: */*
    > Content-Length: 1

### Response

    {
      "data": {
        "id": "5f52155ae0391b0017d8d977",
        "firstname": "",
        "lastname": "",
        "bio": "",
        "country": "",
        "email": "tetstuser@mailinator.com"
      }
    }

## 6. User Profile Update

### Request

`PUT /api/v1/auth/user`

    > PUT /api/v1/auth/user HTTP/1.1
    > Host: ltrx.herokuapp.com
    > User-Agent: insomnia/2020.3.3
    > Content-Type: application/x-www-form-urlencoded
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNWY1MjE1NWFlMDM5MWIwMDE3ZDhkOTc3IiwiZXhwIjoxNTk5ODE5ODA4LCJpYXQiOjE1OTkyMTUwMDh9.IdvApTIzuFAWXjDPEgAi1yklj0z0dCwtPoP0_nj5wfI
    > Accept: */*
    > Content-Length: 30

  | firstname=test&lastname=user

  NOTE : `User can update fields -[ firstname, lastname, country, bio, username, email ]`

### Response

    {
      "data": {
        "id": "5f52155ae0391b0017d8d977",
        "firstname": "test",
        "lastname": "test",
        "bio": "",
        "country": "",
        "email": "test@mailinator.com"
      },
      "message": "Profile has been updated"
    }
