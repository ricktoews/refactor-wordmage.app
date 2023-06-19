import '@/styles/globals.scss'
import Layout from '@/components/Layout';
import { WMContextProvider } from '@/context/WMContext';

export default function App({ Component, pageProps }) {

  return <WMContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </WMContextProvider>
}
