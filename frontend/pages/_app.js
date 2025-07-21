import '../styles/globals.css';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "../context/AuthContext";
import { NotificationProvider } from "../context/NotificationContext";
import { ErrorBoundary } from 'react-error-boundary';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NotificationProvider>
          <CssBaseline />
          {/* ✅ Umami Analytics Script * (commented out for now) */}
          {/*<Script
            async
            defer
            data-website-id="2f1331ac-2d82-4bac-af73-6eff5315c274"
            src="https://smtracker.shafie.org:444/script.js"
            strategy="afterInteractive"
          />*/}
          <ErrorBoundary fallback={<p>⚠️ Something went wrong. Please refresh.</p>}>
            <Component {...pageProps} />
          </ErrorBoundary>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ marginTop: "55px" }}
          />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
