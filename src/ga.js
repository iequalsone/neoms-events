import ReactGA from 'react-ga';

const debug = process.env.NODE_ENV === 'development';

const trackPageView = location => {
  console.log(location);
  ReactGA.set({
    page: location.pathname
  });
  ReactGA.pageview(location.pathname);
};

const initGa = history => {
  console.log("initGa function call!");
  ReactGA.initialize(process.env.REACT_APP_GA_IDENTIFIER, {
    debug
  });
  if (debug) {
    ReactGA.ga('set', 'sendHitTask', null);
  }
  trackPageView(history.location);
  history.listen(trackPageView);
};

export {
  initGa as default,
  trackPageView
};