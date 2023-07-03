import '@/styles/globals.scss'
import axios from 'axios';
import { Provider } from 'react-redux';
import Layout from '@/components/Layout';
import { store } from '@/store';
import { actLoadWordPool, actLoadCustom } from '@/store/actions';
import WORDMAGE_ENDPOINT from '@/config';

export default function App({ words, custom, Component, pageProps }) {
  store.dispatch(actLoadWordPool(words));
  store.dispatch(actLoadCustom(custom));

  return < Provider store={store} >
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider >
}

App.getInitialProps = async ({ ctx, Component }) => {
  if (ctx.req) {
    let words = [], custom = [];
    try {
      const response = await axios.get(`${WORDMAGE_ENDPOINT}`);
      words = response.data;
    } catch (error) {
      console.error('Error fetching word pool:', error);
    }

    try {
      const user_id = 4;
      const data = {
        user_id
      };
      const response = await axios.post(`${WORDMAGE_ENDPOINT}/loadcustom`, data);
      custom = response.data;
    } catch (error) {
      console.error('Error fetching custom data', error);
    }
    return { words, custom };
  }
  else {
    const state = store.getState();
    const { wordPool: words, custom } = state;
    return { words, custom };
  }
}
