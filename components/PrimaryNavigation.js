import { ImLeaf } from "react-icons/im";
import { FaShuffle } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';
import { GiPerspectiveDiceSixFacesRandom, GiArchiveResearch } from 'react-icons/gi';

import { useSelector, useDispatch } from 'react-redux';
import { actSetMenuState, actMenuContainerClicked } from '@/store/actions';
import { useRouter } from 'next/router';
import css from '@/styles/PrimaryNavigation.module.css'

function PrimaryNavigation() {
    const menuState = useSelector(state => state.menuState);
    const dispatch = useDispatch();

    //    const { appState, setAppState } = useWMContext();
    //    const { menuState } = appState;

    const router = useRouter();

    const handleMenuContainerClick = event => {
        event.stopPropagation();
        //        dispatch(actMenuContainerClicked());
    }

    const menuClickHandler = event => {
        //appState.menuState = false;
        //setAppState(appState);
        dispatch(actSetMenuState(false));

        const el = event.target;
        const data = el.dataset;

        switch (data.opt) {
            case 'random':
                router.push('/random');
                break;
            case 'liked':
                router.push('/liked');
                break;
            case 'browse':
                router.push('/');
                break;
            case 'learn':
                router.push('/learn');
                break;
            case 'unscramble':
                router.push('/unscramble');
                break;
            case 'custom':
                router.push('/custom-words');
                break;
        }
    }

    let menuClasses = css['hamburger-nav'];
    if (menuState) {
        menuClasses += ` ${css['hamburger-nav-open']}`;
    } else {
        menuClasses += ` ${css['hamburger-nav-closed']}`;
    }

    return (
        <div className={`${menuClasses}`} onClick={handleMenuContainerClick}>
            <ul>
                <li className="flex items-center" onClick={menuClickHandler} data-opt="random"><GiPerspectiveDiceSixFacesRandom />&nbsp;Random</li>
                <li className="flex item-center" onClick={menuClickHandler} data-opt="liked"><BiLike />&nbsp;Liked</li>
                <li className="flex item-center" onClick={menuClickHandler} data-opt="browse"><GiArchiveResearch />&nbsp;Browse</li>
                <li className="flex item-center" onClick={menuClickHandler} data-opt="learn"><ImLeaf />&nbsp;Learn</li>
                <li className="flex item-center" onClick={menuClickHandler} data-opt="unscramble"><FaShuffle />&nbsp;Unscramble</li>
                <li className="flex item-center" onClick={menuClickHandler} data-opt="custom"><FaShuffle />&nbsp;Custom</li>
                <li><i className="glyphicon glyphicon-home"></i> About</li>
            </ul>
        </div>
    )
}

export default PrimaryNavigation;