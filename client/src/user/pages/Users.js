import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const sendRequest = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('http://localhost:5000/api/users');
				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.message);
				};

				setUsers(responseData.users);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setError(err.message);
			};
		};
		sendRequest();
	}, [])

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
			{isLoading && <div className="center"><LoadingSpinner /></div>}
			{!isLoading && users && <UsersList items={users} />}
		</>
	);
};

export default Users;
