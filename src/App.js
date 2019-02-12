import React, { Component } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import TimelineStore from './business/TimelineStore';
import { createStore } from 'redux';

const timelineStore = new TimelineStore([]);

function timeline(state = [], action) {
  if (action.type === 'list') {
    return action.photos;
  }

  return state;
}

const store = createStore(timeline);

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header/>
          <Timeline login={this.props.params.login} store={store}/>
        </div>
    </div>
    );
  }
}

export default App;
