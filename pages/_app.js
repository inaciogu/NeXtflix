import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from '../lib/theme'

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
