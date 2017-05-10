import React from 'react';
import ReactDOM from 'react-dom';
import MicromaniaStores from './components/micromania_stores';

const App = () => (
  <div>
    <MicromaniaStores />
  </div>
);

// After Meteor loads in browser, render my app to the dom
Meteor.startup(() => {
  // React render call
  ReactDOM.render(<App />, document.querySelector('.container'));
});
