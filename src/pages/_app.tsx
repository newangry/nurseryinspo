import type { AppProps } from 'next/app'
import '@/styles/globals.css';
// import 'https://fonts.googleapis.com/css?family=Caveat';
import { Notifications } from '@mantine/notifications';
import { MantineProvider, ColorSchemeProvider, MantineThemeOverride } from '@mantine/core';
import { initialState, HomeInitialState } from '@/state/index.state';
import { useCreateReducer } from '@/hooks/useCreateReducer';
import Layout from '@/components/Layouts/Index';
import HomeContext from '@/state/index.context';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)
  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });

  const {
    state: {
      colorScheme,
    },
    dispatch
  } = contextValue;

  useEffect(() => {
    setIsClient(true);
  }, [])

  const myTheme: MantineThemeOverride = {
    colorScheme: colorScheme,
    spacing: {
      chatInputPadding: '40px'
    }
  };

  return (
    isClient&&<HomeContext.Provider
      value={{
        ...contextValue,
      }}
    >
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={() => { }}>
        <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>
    </HomeContext.Provider>
  )
}
