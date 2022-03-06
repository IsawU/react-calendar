import React from 'react';
import styles from './App.module.css';
import Calendar from './Calendar';

type AppProps = {};

type AppState = {
  today: Date;
  month: Date;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date(),
    };
  }

  render() {
    const monthDown: React.MouseEventHandler<HTMLButtonElement> = () => {
      const date = new Date(this.state.month);
      date.setDate(0);
      this.setState({month: date});
    }

    const monthUp: React.MouseEventHandler<HTMLButtonElement> = () => {
      const date = new Date(this.state.month);
      date.setDate(32);
      this.setState({month: date});
    }

    const monthToday: React.MouseEventHandler<HTMLButtonElement> = () => {
      const date = new Date(this.state.today);
      this.setState({month: date});
    }

    return (
      <div className={styles.contentStrip}>
        <div className={styles.controls}>
          <button onClick={monthDown}>&lt;</button>
          <div className={styles.month}>
            {this.state.month.toLocaleDateString(navigator.language, { month: 'long' })}
          </div>
          <button onClick={monthUp}>&gt;</button>
          <button onClick={monthToday}>Today</button>
        </div>
        <Calendar today={this.state.today} month={this.state.month}/>
      </div>
    )
  }
}
