import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../client/components/App';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return `
    <html>
      <head>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};