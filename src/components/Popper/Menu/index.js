import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]); //gán prop data là cả items ban đầu (=> data ban đầu có 1 phần tử)
    const current = history[history.length - 1];

    // console.log(history);
    // console.log(current);
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; //Kiem tra item có children ko
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onclick={() => {
                        if (isParent) {
                            console.log(item.children);
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    // console.log(renderItems());

    return (
        <div>
            <Tippy
                delay={[0, 700]}
                offset={[12, 8]}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('menu-popper')}>
                            {history.length > 1 && (
                                <Header
                                    title="Language"
                                    onBack={() => {
                                        setHistory((prev) => prev.slice(0, prev.length - 1));
                                    }}
                                />
                            )}
                            {renderItems()}
                        </PopperWrapper>
                    </div>
                )}
                //Rê chuột ra ngoài rồi quay lại --> về lại trang đầu tiên
                onHide={() => {
                    setHistory((prev) => prev.slice(0, 1));
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
