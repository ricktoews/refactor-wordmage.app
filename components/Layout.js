import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { actSetMenuState, actSetWordFormState } from '@/store/actions';
import PrimaryNavigation from './PrimaryNavigation';
import WordForm from './WordForm';
import TagList from './TagList';

export default function Layout({ children }) {
    const dispatch = useDispatch();
    const menuState = useSelector(state => state.menuState);
    const tagPopupState = useSelector(state => state.tagPopupState);
    const wordFormState = useSelector(state => state.wordFormState);

    //const { appState, toggleMenu } = useWMContext();
    const [hamburgerMenuState, setHamburgerMenuState] = useState(menuState);

    useEffect(() => {
        setHamburgerMenuState(menuState);
    }, [menuState]);

    const handleHamburgerClick = event => {
        //const newMenuState = toggleMenu();
        const newMenuState = !menuState;
        dispatch(actSetMenuState(newMenuState));
        setHamburgerMenuState(newMenuState);
    }

    const handlePlusIconClick = event => {
        const newWordFormState = !wordFormState;
        dispatch(actSetWordFormState(newWordFormState));
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Mobile-Friendly Layout</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.banner}>
                <div className={styles.hamburgerMenu} onClick={handleHamburgerClick}>
                    {/* Add your hamburger menu icon here */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="white" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                </div>
                <div className={styles.plusIcon} onClick={handlePlusIconClick}>
                    {/* Add your plus icon here */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="white" d="M12 6a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 1-1z" />
                    </svg>
                </div>
            </header>

            <PrimaryNavigation menuState={menuState} />

            <TagList tagPopupState={tagPopupState} />

            {wordFormState && <WordForm />}

            <main className={styles.content}>
                {children}
            </main>

            <footer className={styles.footer}>
                {/* Add your footer content if needed */}
            </footer>
        </div >
    )
}

