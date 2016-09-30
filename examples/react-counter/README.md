# SAM React Counter Example

A counter small example of the [SAM][sam] pattern using React for the view.

The counter has the following actions:

- The `Increment` button increments the counter by 1 every time.
- When the counter is below 10, an automatic action is trigger after 1 second
    that increments the counter by 1.
- Reaching 11 disables the `Increment` button and an action is triggered after
    5 seconds, which enables the button again and increments the counter.
- At 12 the counter view (React component) unsubscribes from the model.
- Afterwards the counter can still be incremented but the view does not receive
    any notifications.

> Open the console to see what actions are accepted or rejected. Especially try
> to increment the counter in between the 1 second of the automatic actions.

## Usage

```sh
npm install     # installs dependencies
npm start       # starts the webpack dev server on localhost:8080
npm run build   # bundles the app into /dist
```

[sam]: http://sam.js.org/
