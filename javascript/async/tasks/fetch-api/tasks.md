# Tasks

## Use `fetch()` to retrieve a list of users from `https://jsonplaceholder.typicode.com/users` and log the names to the console

## Fetch all posts by userId=1 from `https://jsonplaceholder.typicode.com/posts?userId=1` and display the titles in the DOM

## Send a `POST` request to `https://jsonplaceholder.typicode.com/posts` with a new post (title, body, userId). Show the response in console

## Update the post with `ID = 1` by sending a `PUT` request with a new title and body. Use the same endpoint

## Send a `PATCH` request to update just the title of post `ID = 1`

## Send a `DELETE` request to remove post with `ID = 1`. Log the status of the response

## Send a POST request to `https://jsonplaceholder.typicode.com/posts` with `Content-Type: application/json` in headers. Log the response

## Create a custom function `request(url, options)` that wraps fetch. Use it to `GET` users and `POST` a new post

## Make a fetch call to a broken URL and use `.catch()` or `try...catch` to show a user-friendly error message

## Use `AbortController` to cancel a long-running fetch request (you can delay the response using a mock server or setTimeout)
