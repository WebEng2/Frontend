import React from 'react';

import {
  f7ready,
  App,
  Panel,
  View,
  Page,
  Navbar,
  Block,
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // Login screen demo data
  // Framework7 Parameters
  const f7params = {
    name: 'Navigation_PWA', // App name
      theme: 'auto', // Automatic theme detection
      colors: {
        primary: '#057471',
      },

      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV ==='production' ? {
        path: '/service-worker.js',
      } : {},
  };

  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>

        {/* Left panel with cover effect*/}
        <Panel left cover dark>
          <View>
            <Page>
              <Navbar title="Navigation Panel"/>
              <Block>panel content goes here</Block>
            </Page>
          </View>
        </Panel>

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

    </App>
  )
}
export default MyApp;