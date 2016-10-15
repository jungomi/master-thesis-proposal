# Notes

## Implementation details / Design principles

> These are just thoughts that I wanted to write down.

### Next-action predicate (NAP)

> What kind of NAP?

- Single NAP for the model (gets big and is not very pleasant to maintain)
- List of NAPs (ideally only triggered when the affected values are modified)
- NAP passed as callback to `model.present`

--------------------------------------------------------------------------------

**It should be on *state*.**

- Called when it gets notified (in the listener function)
- Needs to be passed to the subscription

### Actions

> Should there be any conditional logic in actions? (e.g. `if val < 10`)

**No,** only invalid values that break the computation should be filtered the
rest should be in the model.

> Should actions call other actions?

**No,** multiple `present`s should be avoided. Actions can be composed and then
call `present` manually, or use a dispatcher.

> How should asynchronous calls be handled inside actions?

Return a promise and call `present` or further actions when it has been
successfully resolved.

### State

State is supposed to trigger actions. But when the state is called multiple
times, the actions are also triggered multiple times. This is a concern for
asynchronous code. *Asynchronous actions need to be monitored with some sort of
state information (e.g. `isFetching`).*

Sounds a little painful, the alternative that `present` returns a promise and
NAPs are called in the `.then` resp. `.catch`. This would violate the
unidirectional data flow, but seems so natural and simple to me (I started with
that idea and discarded it).

### Model

> What should be passed to `present`?

1. The next state (i.e. after all actions have been applied)
2. The actions, which get called by the model.
    1. This would mean that the state is always the new one. That could cause
      problems when a NAP automatically presents, because it assumed
      a specific state which might not be relevant any more.
    2. Alternatively the state can be bound (which would be similar to the first
      solution but allows passing the actions instead of a state).

**Example**

```javascript
// State that has been accepted and triggers the NAP
const acceptedState = { value: 1 };
// State that the NAP would present after 5 seconds, i.e. increment()
const napState = { value: 2 };
// Actual state when the 5 seconds finish
const actualState = { value: 5 };
// Next state if increment is called on actualState
const nextState = { value: 6 };
```

1. Passes `napState` to the model, which rejects it.
2. Passes `increment` to the model, which would call `increment(actualState)`
  and the model would accept `nextState`.

This essentially requires the decision whether the NAP is supposed to present
a specific state that has been identified as a logical next state (which could
not be valid any more) [**1)** or **2ii)**], or blindly invoke an action, which
may or may not be suited for the actual state at the point of invocation
[**2i)**]. I would tend to the former. **2ii)** requires an action composer, but
would also allow the user to decide whether the action should be called with the
state that has been passed to the NAP or the state that will be available when
the action would be presented.


### Middleware

Middleware seems quite easy to apply.

- At the beginning of `present`, the proposed data is just passed to the
    middleware.
- On `notify` the middleware can simply subscribe to the model and receive all
    states that have been accepted (for instance collecting a state history).
- Before any actions. This needs an action composer, then it's just as easy.
    Otherwise the user would have to call it manually (which defeats the purpose
    of a middleware).

### What I like

- Single state tree
- Views don't contain any state (just receive plain values)
- Actions are pure functions computing the next state from the previous one
- Proposing / presenting values to the model which filters them
- Next-action predicate that will be called as a logical subsequence
- Seems really easy to test

### What I do not like

- Terminology of model and state
  - For me *state* means application state (which would be the model). And what
      they call *state* is merely collecting / filtering / transforming the
      model to something the view needs or understands.
  - **I should start using the term store for the application state / model.**
- The location of the next-action predicate
  - I haven't fully understood where the next-action predicate should reside. It
      has been said that it should only trigger when the proposed value has been
      accepted. But an action should only be called from state or view.
      Intuitively when the model accepts a proposed value, the next-action
      predicate should get triggered.  But that would require that the model
      calls an action or it notifies the action by sending the new state, but
      that would violate the unidirectional data flow.  The only remaining
      possibility is that the state receives the updated value and then invokes
      the next-action predicate. For asynchronous calls it would then require to
      store additional informations in the model to know whether the action is
      currently in progress or not. That just seems like a hassle.
- A single next-action predicate
  - It does make sense if it is a state machine
  - Actions would need to be composed together

## Differences to [SAM samples][sam-samples]

### Actions

Their actions present the data to the model. This would call `present` multiple
times if the actions are chained. The workaround is to create actions for one
specific situation. This does not seem very modular. It could be decomposed into
functions that are called within the actions.

### Model

The model calls `render`, which lets the state compute their state
representations.

`present` receives an object that gets translated to the model properties, it
seems similar to Redux, which has been criticised for exactly that:

> [...] in Redux the reducer creates an unnecessary and unwanted coupling between the
> model mutations and the logic that translates intents into model property
> values. [source: [SAM actions][sam.js-actions]]

It simply removed the middle man. But my current approach does not work well for
all actions (e.g. reset the counter, would somehow needed to be included in the
store itself). I think a good solution (and middle ground) would be to change
the signature of `present` to `present(store [, options])` where `options` is an
object with additional information to the model. So to reset the counter it
would be invoked as follows: `present(initialStore, { reset: true })`. Actions
would also need to be adapted so they return both arguments.

### State

Views subscribe to the state and get notified when the state representation
changes. This is a good idea, as multiple views may use the same state
representation. I didn't think of this at first, because I started with the
React example, and it's very common to have a container around a component to
pass a certain state to a stateless component. To make it more generic and
probably play nicely with SAM, Higher Order Components (HOC) can be used (see:
[Higher-order components explained][hoc-explained]).

[hoc-explained]: https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html#higher-order-components-explained
[sam.js-actions]: http://sam.js.org/#actions
[sam-samples]: https://github.com/jdubray/sam-samples
