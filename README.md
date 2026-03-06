# Eventually Consistent Form

This is a small React app that simulates submitting a form to an unreliable API. The form collects an email and amount, and shows different UI states depending on how the API responds.

## State Transitions

When the user submits the form, the UI immediately moves to a **pending** state.
If the API responds successfully, it becomes **success**.
If a temporary failure occurs, the app goes into **retrying** and attempts the request again.
If all retries fail, it shows **failed**.

## Retry Logic

The mock API randomly returns success, temporary failure (503), or delayed success.
If a temporary failure happens, the request retries automatically with a small delay and a retry limit.

## Preventing Duplicates

The submit button is disabled while a request is pending, so users cannot send duplicate submissions.
