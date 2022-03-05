import React from 'react';
import styles from './App.module.css';
import Calendar from './Calendar';

type AppProps = {};

type AppState = {
  date: Date;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    const change: React.MouseEventHandler<HTMLButtonElement> = () => {
      const date = new Date(this.state.date);
      date.setDate(date.getDate()-28);
      this.setState({date: date});
      console.log(`changed date ${date}`);
    }

    return (
      <div className={styles.contentStrip}>
        <button onClick={change}>change</button>
        <Calendar today={this.state.date} month={this.state.date}/>
      </div>
    )
  }
}
