import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/77ca33af5749ec80705ea8510210d011.jpeg?lk3s=a5d48078&nonce=61406&refresh_token=05e036a9ae8b58f228233422abb61461&x-expires=1724382000&x-signature=RxBzH8Nu3NDkt0WNVLAk2L8waEI%3D&shp=a5d48078&shcp=81f88b70"
                alt=""
            />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>Nguyễn Văn A</span>
                    <FontAwesomeIcon className={cx('checkicon')} icon={faCheckCircle}></FontAwesomeIcon>
                </p>

                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
