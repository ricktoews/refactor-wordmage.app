import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import WordMageLib from '@/utils/words-interface';
import WordBlockList from '../components/listwords/WordBlockList';

function Home(props) {
  const [browseList, setBrowseList] = useState([]);
  const WM = WordMageLib();

  useEffect(() => {
    setBrowseList(WM.fullWordList(props.wordPool, props.custom));
  }, []);

  return (
    <div>
      <WordBlockList pool={browseList} />
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    wordPool: state.wordPool,
    custom: state.custom
  }
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default Home;