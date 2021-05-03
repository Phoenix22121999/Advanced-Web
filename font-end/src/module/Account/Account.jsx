import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';

const Account = ({user}) => {
    return (
        <div className="account-container">
            
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
});

const mapDispatchToProps = {
	// onGetProfile,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Account);

// export default Account;
