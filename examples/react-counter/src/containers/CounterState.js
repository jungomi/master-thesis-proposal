/* eslint-disable no-console */
import React, { PropTypes } from 'react';
import Counter from '../components/Counter';
import { counterValue } from '../state/counter';
import { increment, startIncrement } from '../actions/counter';
import { counterNap } from '../naps/counter';

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
