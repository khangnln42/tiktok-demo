import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('checkicon')} icon={faCheckCircle}></FontAwesomeIcon>}
                </p>

                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}
//Kiem tra kieu du lieu voi propTypes
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
