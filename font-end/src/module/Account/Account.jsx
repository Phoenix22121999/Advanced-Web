import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
// import { Button, Form, Input } from "antd";
import "./Account.scss";
import AdminAccount from "./components/AdminAccount/AdminAccount";
import UserAccount from "./components/UserAccount/UserAccount";
// import { onUpdatePassword } from "../../redux/user/user.actions";
const Account = ({ user }) => {

	
	return (
		<div className="account-container">
			<div className="account-user-form">
				{
					!user.name?<AdminAccount/>:<UserAccount/>
				}
			</div>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
});

// const mapDispatchToProps = {
// };

export default connect(mapStateToProps, null)(Account);

// export default Account;
