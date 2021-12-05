import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {

	const USERS = [
		{ id: "u1", name: "Peter Dzhunov", image: 'https://i.pravatar.cc/300', places: 3 },
		{ id: "u2", name: "Ekaterina Lambeva", image: 'https://i.pravatar.cc/300', places: 2 },
		{ id: "u3", name: "Stelian Dimitrov", image: 'https://i.pravatar.cc/300', places: 5 }
	];

	return (
		<UsersList items={USERS} />
	);
};

export default Users;
