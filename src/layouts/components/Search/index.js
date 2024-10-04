// import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import * as searchService from '~/services/searchService'; //khi export lẻ thì import dạng * as ...

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    console.log(searchResult);
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            // console.log(searchResult);
            return;
        }

        // setLoading(true);
        //////fetch
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //         // console.log(res);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });

        ///////Dùng axios trực tiếp
        //     axios
        //         .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        //             params: {
        //                 q: debounced,
        //                 type: 'less',
        //             },
        //         })
        //         .then((res) => {
        //             setSearchResult(res.data.data);
        //             setLoading(false);
        //             console.log(res.data.data);
        //         })
        //         .catch(() => {
        //             setLoading(false);
        //         });
        // }, [debounced]);

        ///////Dung axios (tách file request rieng) (promise)
        // request
        //     .get('users/search', {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })
        //     .then((res) => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //         console.log(res.data);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });

        //////Dung Async Await
        // const fetApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: debounced,
        //                 type: 'less',
        //             },
        //         })
        //         setSearchResult(res.data);
        //         setLoading(false);

        //     } catch (error) {
        //         setLoading(false);
        //     }
        // }
        // fetApi();
        ////Tách ra api search
        const fetApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounced, 'less');
            setSearchResult(result);

            setLoading(false);
        };
        fetApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setSearchResult([]);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSubmit = () => {};

    return (
        //Using a Wrapper <div> or <span> tag around the reference element solves
        //this by creating a new parentNode context
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('search-clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('search-loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={handleSubmit}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
