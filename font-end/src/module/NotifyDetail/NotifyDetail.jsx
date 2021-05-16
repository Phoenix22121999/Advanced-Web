import moment from 'moment';
import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { onGetNotification } from '../../redux/notification/notification.actions';
import './NotifyDetail.scss'
const NotifyDetail = ({onGetNotification}) => {
    let { id } = useParams();
    const [notify, setNotify] = useState(null)
    useEffect(() => {
        const onGetNotificationCallback = (isSuccess,rs) => {
            // console.log(rs)
            if (isSuccess){
                setNotify(rs)
            }
        }
        onGetNotification(id,onGetNotificationCallback)
    }, [id,onGetNotification,setNotify])
    // console.log(notify)
    return (
        <div className="notifycation-detail-wrapper">
            {
                notify&&(
                   <>
                        <div className="notifycation-detail-title">
                            {notify.title}
                        </div>
                        <div className="notifycation-detail-subtitle">
                            {`${notify.faculty} - ${moment(notify.createdAt).format(
									"MMMM Do YYYY, h:mm:ss a"
								)}`}
                        </div>
                        <div className="notifycation-detail-content">
                            {notify.content}
                        </div>
                   </>
                )
            }
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
    onGetNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyDetail);
// export default NotifyDetail;
