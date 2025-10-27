import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './Redux/Store.jsx';
import App from './App.jsx';

// ✅ Import your SearchContext
import { SearchProvider } from "./Context/SearchContaxt.jsx"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      {/* Wrap App with SearchProvider */}
      <SearchProvider>
        <App />
      </SearchProvider>
    </Router>
  </Provider>
);
