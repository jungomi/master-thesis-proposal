/* eslint-disable no-console */
import React, { PropTypes } from 'react';
import Counter from '../components/Counter';
import { counterValue } from '../state/counter';
import {
  disableButton,
  enableButton,
  increment,
  startIncrement,
  stopIncrement
} from '../actions/counter';

// Proposes incremented values up to 10 (by calling the same nap function)
const counterNap = (state, present) => {
  if (state.counting) {
    if (state.value < 10) {
      setTimeout(() => {
        present(increment(state));
      }, 1000);
    } else {
      present(stopIncrement(state));
    }
  } else {
    if (state.value === 11) {
      if (state.buttonDisabled) {
        setTimeout(() => {
          present(increment(enableButton(state)));
        }, 5000);
      } else {
        present(disableButton(state));
      }
    }
  }
};

class CounterState extends React.Component {
  constructor(props) {
    super(props);
    this.handleNotify = this.handleNotify.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = this.props.model.subscribe(this.handleNotify);
  }

  handleNotify(state, present) {
    console.log('[State] Notified :', state);
    // Setting the state makes React re-render the component
    // It can also be used to determine whether the changes have any effect on
    // the current component (avoids unnecessary re-renders)
    this.setState({ state });
    counterNap(state, present);
    if (typeof this.unsubscribe === 'function' && state.value === 12) {
      console.log('[State] Unsubscribed');
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
  }

  render() {
    const { model } = this.props;
    return (
      <Counter
        value={counterValue(model.state)}
        handleClick={() => {
          model.present(increment(startIncrement(model.state)));
        }}
        buttonDisabled={model.state.buttonDisabled}
      />
    );
  }
}


CounterState.propTypes = {
  model: PropTypes.object.isRequired
};

export default CounterState;
