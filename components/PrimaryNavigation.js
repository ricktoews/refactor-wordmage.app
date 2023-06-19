import { useRouter } from 'next/router';
import { useWMContext } from '@/context/WMContext';
import css from '@/styles/PrimaryNavigation.module.css'

function PrimaryNavigation() {
    const { appState, setAppState } = useWMContext();
    const { menuState } = appState;

    const router = useRouter();

    const menuClickHandler = event => {
        appState.menuState = false;
        setAppState(appState);

        const el = event.target;
        const data = el.dataset;

        switch (data.opt) {
            case 'random':
                router.push('/random');
                break;
            case 'browse':
                router.push('/');
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
        <div className={`${menuClasses}`}>
            <ul>
                <li onClick={menuClickHandler} data-opt="random"><i className="glyphicon glyphicon-random"></i> Random</li>
                <li><i className="glyphicon glyphicon-thumbs-up"></i> Liked</li>
                <li onClick={menuClickHandler} data-opt="browse"><i className="glyphicon glyphicon-sunglasses"></i> Browse</li>
                <li><i className="glyphicon glyphicon-leaf"></i> Learn</li>
                <li><i className="glyphicon glyphicon-retweet"></i> Unscramble</li>
                <li><i className="glyphicon glyphicon-user"></i> Profile</li>
                <li><i className="glyphicon glyphicon-home"></i> About</li>
            </ul>
        </div>
    )
}

export default PrimaryNavigation;