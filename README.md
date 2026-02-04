           Critical Thinking Question and Anwers
           -------------------------------------

1- Why handle errors for each individual API call?

 Handling errors for each API call ensures that failures in one request don’t break the entire application. It allows:

- Partial data to be displayed (e.g., products load even if some reviews fail).

- Contextual error information, making it clear which API failed.

- Better user experience, instead of showing a blank dashboard due to one failure.

2- How do custom error classes improve debugging?

  Custom error classes (e.g., NetworkError, DataError) allow you to:

- Categorize errors based on their cause.

- mplement targeted handling (retry network errors, fallback for data errors).

- Improve logging and debugging by clearly indicating the type of failure.

3- When is a retry mechanism more effective than immediate failure?

 A retry mechanism is useful when failures are temporary or intermittent, such as:

- Network connectivity issues.

- Transient server errors (HTTP 500).

- API rate limiting.
