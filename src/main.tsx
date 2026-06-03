import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { SettingsProvider } from './context/SettingsContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
