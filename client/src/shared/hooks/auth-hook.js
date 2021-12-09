import { useState, useCallback, useEffect } from 'react';
let logoutTimer;


export const useAuth = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpireDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		console.log(tokenExpireDate);
		console.log('logging in');
		setTokenExpirationDate(tokenExpireDate);
		localStorage.setItem('userData', JSON.stringify({ userId: uid, token, expiration: tokenExpireDate.toISOString() }));
	}, [])

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, [])

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		};
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('userData'));
		if (userData && userData.token && new Date(userData.expiration) > new Date()) {
			login(userData.userId, userData.token, new Date(userData.expiration))
		};
	}, [login]);

	return { token, login, logout, userId }

};