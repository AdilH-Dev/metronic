import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSettings } from './providers/SettingsProvider';
import { AppRouting } from './routing';
import { PathnameProvider } from './providers';
import { Toast } from './components/toast/Toast';
const {
  BASE_URL
} = import.meta.env;
const App = () => {
  const {
    settings
  } = useSettings();
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);
  return <BrowserRouter basename={BASE_URL}>
      <PathnameProvider>
        <Toast/>
        <AppRouting />
      </PathnameProvider>
    </BrowserRouter>;
};
export { App };