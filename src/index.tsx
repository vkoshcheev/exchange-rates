import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { Provider } from 'react-redux';
import { store } from './redux/store';

polyfillCountryFlagEmojis();

const queryClient = new QueryClient();

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  // (!) in react 18, StrictMode causes all useEffect-s to trigger twice on freshly rendered components
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);