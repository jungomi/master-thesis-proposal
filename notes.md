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

### State

State is supposed to trigger actions. But when the state is called multiple
times, the actions are also triggered multiple times. This is a concern for
asynchronous code. *Asynchronous actions need to be monitored with some sort of
state information (e.g. `isFetching`).*

Sounds a little painful, the alternative that `present` returns a promise and
NAPs are called in the `.then` resp. `.catch`. This would violate the
unidirectional data flow, but seems so natural and simple to me (I started with
that idea and discarded it).

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
