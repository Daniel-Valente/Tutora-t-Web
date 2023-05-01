import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import App from './App';
import { store } from './store/index';
import './styles/styles.css';

import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);
const queryClient = new QueryClient();

root.render(
  <ThemeContextProvider>
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>  
        <React.Suspense fallback={ <span>Loading...</span> }>
          <QueryClientProvider client={ queryClient }>
            <ReactQueryDevtools />
               <App />
          </QueryClientProvider>
        </React.Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
  </ThemeContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
