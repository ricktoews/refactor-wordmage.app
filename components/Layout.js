import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BiSolidUpArrow } from 'react-icons/bi';
import { HiMenu } from 'react-icons/hi';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { actSetMenuState, actSetWordFormState, actLayoutClicked } from '@/store/actions';
import PrimaryNavigation from './PrimaryNavigation';
import WordForm from './WordForm';
import TagList from './TagList';
import SearchFilter from './SearchFilter';

const TOOLS_OPEN = 'open';
const TOOLS_CLOSED = 'closed';
function ToggleTools({ toolsState, toolsStateToggle }) {
    let style = { height: '30px', width: '30px', cursor: 'pointer', transition: 'transform 0.5s ease-in-out', transform: 'rotate(0)' };
    if (toolsState === TOOLS_OPEN) {
        style.transform = 'rotate(180deg)';
    }
    return <BiSolidUpArrow style={style} onClick={toolsStateToggle} />
}

const TOOLS_OPEN_MAIN_TOP = { transition: 'top 0.5s ease-in-out', top: '84px' };
const TOOLS_CLOSED_MAIN_TOP = { transition: 'top 0.5s ease-in-out', top: '42px' };
const TOOLS_OPEN_STYLE = { transition: 'top, 0.5s ease-in-out', top: '42px', height: '42px', zIndex: 9 };
const TOOLS_CLOSED_STYLE = { transition: 'top, 0.5s ease-in-out', top: '0px', height: '42px', zIndex: 9 };
export default function Layout({ children }) {
    const dispatch = useDispatch();
    const menuState = useSelector(state => state.menuState);
    const tagPopupState = useSelector(state => state.tagPopupState);
    const wordFormState = useSelector(state => state.wordFormState);
    const [toolsState, setToolsState] = useState('closed');
    const [toolsStyle, setToolsStyle] = useState(TOOLS_CLOSED_STYLE)
    const [mainTop, setMainTop] = useState(TOOLS_CLOSED_MAIN_TOP);

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
        event.stopPropagation();
    }

    const handlePlusIconClick = event => {
        const newWordFormState = !wordFormState;
        dispatch(actSetWordFormState(newWordFormState));
    }

    const handleLayoutClick = event => {
        dispatch(actLayoutClicked());
    }

    const handleArrowToggle = event => {
        if (toolsState === TOOLS_OPEN) {
            setToolsState(TOOLS_CLOSED);
            setToolsStyle(TOOLS_CLOSED_STYLE);
            setMainTop(TOOLS_CLOSED_MAIN_TOP);
        }
        else {
            setToolsState(TOOLS_OPEN);
            setToolsStyle(TOOLS_OPEN_STYLE);
            setMainTop(TOOLS_OPEN_MAIN_TOP);
        }
    }

    return (
        <div className={styles.container} onClick={handleLayoutClick}>
            <Head>
                <title>Mobile-Friendly Layout</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.banner}>
                <div style={{ height: '30px', width: '30px' }}>
                    <HiMenu className={styles.hamburgerMenu} style={{ height: '100%', width: '100%' }} onClick={handleHamburgerClick} />
                </div>

                <div style={{ height: '30px', width: '30px' }}>
                    <ToggleTools toolsState={toolsState} toolsStateToggle={handleArrowToggle} />
                </div>
            </header>

            <PrimaryNavigation menuState={menuState} />

            <TagList tagPopupState={tagPopupState} />

            {wordFormState && <WordForm />}

            <div className="fixed w-full bg-white text-black" style={toolsStyle}>
                <SearchFilter />
            </div>

            <main style={mainTop} data-desc="WordListBlock" className={styles.content}>
                {children}
            </main>

            <footer className={styles.footer}>
                {/* Add your footer content if needed */}
            </footer>
        </div >
    )
}

