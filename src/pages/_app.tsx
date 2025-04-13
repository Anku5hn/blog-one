import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';//app cache import
import { ThemeProvider, createTheme, PaletteColorOptions, } from '@mui/material/styles';//mui imports
import { Roboto } from 'next/font/google';//mui required font
import { store } from '../redux/store'//redux store
import { Provider } from 'react-redux'//redux provider
//font optimization
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
//types for material UI color pallete
declare module '@mui/material/styles' {
  interface CustomPalette {
    black: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
  }
}
//theme provider 
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    black: createColor("#000000"),//custom color
  },

});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Provider store={store}>
      <AppCacheProvider {...pageProps}>
        <ThemeProvider theme={theme}>
          <main className={roboto.variable}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </AppCacheProvider>
      </Provider>
    </>)
}