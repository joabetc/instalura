import React, { Component } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import TimelineBO from './business/TimelineBO';

this.timelineBO = new TimelineBO([]);

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header/>
          <Timeline login={this.props.params.login} bo={this.timelineBO}/>
        </div>
    </div>
    );
  }
}

export default App;
