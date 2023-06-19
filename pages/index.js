import WordMageLib from '@/utils/words-interface';
import WordBlockList from '../components/listwords/WordBlockList';
import { useWMContext } from '@/context/WMContext';

export default function Home() {
  const { getWordPool } = useWMContext();
  const pool = getWordPool();
  const WM = WordMageLib();
  const browseList = WM.fullWordList(pool);

  return (
    <div>
      <WordBlockList pool={browseList} />
    </div>
  )
}

