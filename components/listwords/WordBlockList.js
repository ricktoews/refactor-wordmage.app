import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import WordBlock from "./WordBlock";

const LOADER_BEFORE = 10;
const LOADER_AFTER = 3;

function WordBlockList({ pool, startingNdx }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const sentinelRef = useRef();
    const scrollerRef = useRef();

    function loadItems(quant) {
        let counter = scrollerRef.current.startingNdx || 0;
        for (let i = 0; i < quant && counter < scrollerRef.current.pool.length; i++) {
            const wordItem = scrollerRef.current.pool[counter++];
            const item = document.createElement('div');
            const root = createRoot(item);
            item.classList.add('word-block-container');
            root.render(<WordBlock wordObj={wordItem} dispatch={dispatch} router={router} />);
            //            ReactDOM.render(<WordBlock wordObj={wordItem} />, item);
            scrollerRef.current.appendChild(item);
        }
        scrollerRef.current.startingNdx = counter;
    }

    function populateScroller(clearFirst = false) {
        if (clearFirst) {
            while (scrollerRef.current.firstChild) {
                scrollerRef.current.removeChild(scrollerRef.current.firstChild);
            }
        }
        loadItems(LOADER_BEFORE);
        scrollerRef.current.appendChild(sentinelRef.current);
        loadItems(LOADER_AFTER);
    }

    const observerCallback = (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
            populateScroller();
        }
    };

    useEffect(() => {
        scrollerRef.current.startingNdx = startingNdx;
        scrollerRef.current.pool = pool;
        populateScroller(true);
    }, [pool]);

    useEffect(() => {
        scrollerRef.current.startingNdx = startingNdx;
        scrollerRef.current.pool = pool;
        populateScroller(true);
    }, [startingNdx]);

    useEffect(() => {
        const intersectionalObserver = new IntersectionObserver(observerCallback);
        intersectionalObserver.observe(sentinelRef.current);

        return () => { intersectionalObserver.disconnect(); }
    }, [])

    return (
        <div ref={scrollerRef} className="word-block-list">
            <div ref={sentinelRef}></div>
        </div>
    )
}

export default WordBlockList;