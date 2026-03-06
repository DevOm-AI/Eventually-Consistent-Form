# Eventually Consistent Form

This project is a small React application that simulates submitting a form to an unreliable API. The form collects an **email** and an **amount**, and the UI updates immediately after submission to reflect the current request state.

## State Transitions

When the user submits the form, the UI immediately moves to a **pending** state.
Depending on the API response, the state may change to **success**, **retrying**, or **failed**.
If the API response is delayed, the UI still remains in the pending state until the request completes.

## Retry Logic

The mock API randomly returns one of three responses: success (200), temporary failure (503), or delayed success.
If a temporary failure occurs, the application automatically retries the request after a short delay, with a limited number of retry attempts.

## Preventing Duplicate Submissions

Duplicate submissions are prevented by disabling the submit button while a request is in progress. This ensures the same request cannot be triggered multiple times while the current submission is still being processed.

## Running the Project

1. Install dependencies
   npm install

2. Start the development server
   npm run dev
