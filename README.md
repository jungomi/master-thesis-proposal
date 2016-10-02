# State-Action-Model (SAM) pattern

## Overview

The [SAM pattern][sam.js] is a reactive functional pattern that clearly
separates the model from the view. It is based on the [Temporal Logic of Actions
(TLA+)][tla], which is a robust formal specification to model, describe, analyse
and verify systems. Some key goals of SAM are:

- Unidirectional data flow
- Composition
- Explicit mutation
- Decoupling from API calls

![SAM Pattern][sam-figure]

### Model

The model contains the application state (store) and is responsible to make it
persistent. Any change to the store must be proposed / presented to the model,
which then decides to accept or reject them. When the store changes, everyone
who needs to learn about the new store, gets notified.

### State

The state translates the model's store into a desired representation. Despite
its name, it does not hold any state, but is a pure function that receives the
model / store as an input and returns suitable representation (e.g. composed
values). In addition to transform the data, the state also processes the
next action predicate.

### Next Action Predicate (NAP)

The next action predicate is a function that represents an automatic action that
needs to be invoked under a given condition (e.g. turning off the engine of
a car after it has reached its destination).

### Action

An action is a function that receives some data and creates the data (proposal)
that is presented to the model. An action may enforce the completeness and
structure of the data, but it should not make any assumption about the validity
of the data (the model is supposed to do that).

### View / State Representation

The state representation may be in any form (e.g. HTML, JSON, plain text, etc.)
using the technology the user prefers. These should simply display the data they
receive. A good example for this are functional stateless React components.  It
is also important to understand that the view itself is not a response to
a previous view. It simply renders the data without knowing how the data has
been produced. For instance when a part of the view is clicked, it may trigger
an action which may or may not change the state representation, but the view
does not expect or wait for a response to that action.

## Comparison to other patterns / architectures

### MVC / MV*

Model-View-Controller is a pattern that separates the presentation layer from
the business logic.

- **Model**: Holds and manages data
- **View**: Displays the data
- **Controller**: Handles interactions and other actions

The MVC pattern is a frequently discussed and [misunderstood
pattern][mvc-rediscover]. There are many different interpretations that wire the
components differently. The original implementation in Smalltalk uses the
following relation:

![MVC Smalltalk][mvc-original]

But many MVC frameworks for the web put the controller in charge, making it
responsible for choosing the correct view and interacting with the model.

Besides the different interpretations there are also variations that are grouped
under the MV* family (e.g. Model-View-Presenter (MVP) or Model-View-ViewModel
(MVVM)). - [Some MV* variations][mv-archs]

### Flux

[Flux][flux-overview] is an application architecture that Facebook created to
build scalable client-side web applications. They moved away from the MVC
pattern because it was really complicated and difficult to maintain for their
large codebase. Facebook has been criticised for misunderstanding MVC or using
it wrong and that the Flux diagram is essentially what MVC is supposed to look
like just with different labels.

![Flux Architecture][flux-figure]

- **Dispatcher**: Singleton that manages all data flow by sending issued actions
    to the stores via the registered callbacks.
- **Stores**: Contain application's state and logic.
- **Views**: Display the data and re-render when the data changes. Can also
    invoke actions (user interactions).
- **Actions**: Simple objects that trigger a dispatch with the included payload.

### Elm - Model-Update-View

Elm is a functional programming language inspired by Haskell that compiles to
JavaScript. It is meant for creating web apps and even has its own virtual DOM
implementation and therefore competes with React.

Elm enforces the [Model-Update-View architecture][elm-arch] (also referred to as
the Elm architecture), but the architecture can be used to structure any
front-end project.

- **Model**: The state of the application
- **Update**: Actions that update the model with the signature `(action, state)
    => state` which returns a new state since everything is immutable.
- **View**: HTML Display of the state

### Redux

[Redux][redux] is inspired by Flux, but avoids its complexity by applying some
concepts of the Elm architecture.

![Redux Flow][redux-figure]

***Note***: There is no dispatcher in Redux, only the `store.dispatch(action)`
function, that triggers the action, which is the only way to change the state.

- **Store**: Single source of truth (single object tree), which is read only.
    A new state is created every time.
- **Actions**: Plain objects describing the intent to change the state. Only way
    to get data into the store.
- **Reducers**: Pure functions that take the previous state and an action, and
    return the next state.

## Plan

- Theoretical background
  - TLA+
  - Paxos Protocol
- Comparison to existing patterns / architectures
  - MVC or MV* in general
  - Flux / Redux
  - Elm (Model-Update-View)
- Evaluation of SAM
  - Strengths and weaknesses / Pros and cons
  - Practicality
  - Possible improvements
- Concrete examples
  - Library
    - Keep it small
    - Make it pleasant to use
    - Maybe provide bindings for popular view libraries (similar to react-redux)
  - Reimplement existing applications
    - Front-end and back-end
    - Compare the approaches
  - Isomorphic JavaScript

## References

- [Elm Architecture][elm-arch]
- [Flux Overview][flux-overview]
- [Model Checking TLA+ Specifications][model-checking-tla]
- [MV* variatons][mv-archs]
- [Paxos Made Simple, *Leslie Lamport*][paxos-paper]
- [Rediscovering MVC][mvc-rediscover]
- [Redux][redux]
- [SAM Pattern][sam.js]
- [TLA+][tla]

### Picture origins

- [Flux data flow diagram][flux-overview]
- [Original MVC diagram][mv-archs]
- [Redux flow diagram][redux-figure-ref]
- [SAM pattern diagram][sam.js]

[elm-arch]: https://guide.elm-lang.org/architecture/
[flux-figure]: https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png
[flux-overview]: https://facebook.github.io/flux/docs/overview.html
[model-checking-tla]: http://link.springer.com/chapter/10.1007/3-540-48153-2_6
[mv-archs]: http://aspiringcraftsman.com/2007/08/25/interactive-application-architecture/
[mvc-original]: http://aspiringcraftsman.com/wp-content/uploads/2010/02/MVC1.png
[mvc-rediscover]: https://github.com/ciscoheat/mithril-hx/wiki/Rediscovering-MVC
[paxos-paper]: http://research.microsoft.com/en-us/um/people/lamport/pubs/paxos-simple.pdf
[redux]: http://redux.js.org/
[redux-figure]: https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966
[redux-figure-ref]: https://github.com/reactjs/redux/issues/653#issuecomment-216844781
[sam-figure]: http://sam.js.org/assets/figures/fig6.jpg
[sam.js]: http://sam.js.org/
[tla]: http://research.microsoft.com/en-us/um/people/lamport/tla/tla.html
