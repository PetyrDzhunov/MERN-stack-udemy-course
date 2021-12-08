import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";

const Users = () => {
	const [users, setUsers] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest('http://localhost:5000/api/users');

				setUsers(responseData.users);
			} catch (err) {
			};
		};
		fetchUsers();
	}, [sendRequest])


	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <div className="center"><LoadingSpinner /></div>}
			{!isLoading && users && <UsersList items={users} />}
		</>
	);
};

export default Users;
