import React from 'react';
// import PropTypes from 'prop-types';

import Section from '../Section/Section';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Notification from '../Notification/Notification';

import styles from './CounterFeedback.module.css';

class CounterFeedback extends React.Component {
  static defaultProps = {
    initialGood: 0,
    initialNeutral: 0,
    initialBad: 0,
  };

  static propTypes = {
    //
  };

  state = {
    good: this.props.initialGood,
    neutral: this.props.initialNeutral,
    bad: this.props.initialBad,
  };

  setLeaveFeedback = event => {
    const labelButton = event.target.textContent;

    this.setState(prevState => ({ [labelButton]: prevState[labelButton] + 1 }));
  };

  countTotalFeedback = () => {
    const totalFeedback = Object.values(this.state).reduce(
      (acc, value) => acc + value,
      0,
    );
    return totalFeedback;
  };

  countPositiveFeedbackPercentage = () => {
    const percentageFeedback =
      this.countTotalFeedback() === 0
        ? 0
        : Math.round((this.state.good / this.countTotalFeedback()) * 100);
    return percentageFeedback;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const result = Object.values(this.state).every(value => value === 0);
    return (
      <div className={styles.counter}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.setLeaveFeedback}
          ></FeedbackOptions>
        </Section>

        <Section title="Statistics">
          {result ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          )}
        </Section>
      </div>
    );
  }
}

export default CounterFeedback;
