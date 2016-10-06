# SAM TUI Counter Example

A small counter example of the [SAM][sam] pattern using a TUI for the view.

The counter has the following actions:

- Pressing the `Q` key, quits the program.
- Pressing the `S` key, unsubscribes the view from getting notified.
- `Increment` is triggered by any other key and increments the counter by 1.
- When the counter is below 10, an automatic action is triggered after 1 second
    that increments the counter by 1.
- Reaching 11 disables the `Increment` keys and an action is triggered after
    5 seconds, which enables the them again and increments the counter.
- At 12 the counter view unsubscribes from the model.
- Afterwards the counter can still be incremented but the view does not receive
    any notifications.

## Usage

```sh
npm install     # Installs dependencies

npm start       # Starts the app

npm test        # Runs the tests
```

The environment variable `DEBUG` can be set to use the debug mode, the values
are separated by commas and wildcards can be used. The following names are used:
`counter`, `state`, `model:accepted`, `model:rejected`.

**Examples (Unix):**

```sh
DEBUG=* npm start         # Enables all loggers
DEBUG=state npm start     # Enables just the state logger
DEBUG=model:* npm start   # Enables all model loggers

npm run debug             # Automatically runs with all loggers enabled
```

[sam]: http://sam.js.org/
