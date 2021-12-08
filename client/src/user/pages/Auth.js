import React, { useState, useContext } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';



const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const [formState, inputHandler, setFormData] = useForm({
		email: {
			value: '',
			isValid: false
		},
		password: {
			value: '',
			isValid: false
		}
	}, false)

	const authSubmitHandler = async (e) => {
		e.preventDefault();
		if (isLoginMode) {


		} else {
			try {
				setIsLoading(true);
				const response = await fetch("http://localhost:5000/api/users/signup", {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					})
				});
				const data = await response.json();
				setIsLoading(false);
				auth.login();
			} catch (error) {
				setError(error.message || 'Something went wrong, please try again.');
				console.log(error);
			};
		};
	};

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData({
				...formState.inputs,
				name: undefined
			}, formState.inputs.email.isValid && formState.inputs.password.isValid)
		} else {
			setFormData({
				...formState.inputs,
				name: {
					value: '',
					isValid: false
				}
			}, false);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};


	return (
		<Card className="authentication">
			{isLoading && <LoadingSpinner asOverlay />}
			<h2>Login Required</h2>
			<hr />
			<form onSubmit={authSubmitHandler}>
				{!isLoginMode && <Input
					element="input"
					id="name"
					type="text"
					label="Your name"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a name."
					onInput={inputHandler}
					placeholder="Enter your name..."
				/>}
				<Input
					id="email"
					type="email"
					placeholder="Enter your email..."
					element="input"
					label="E-mail"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email!"
					onInput={inputHandler}
				/>

				<Input
					id="password"
					type="password"
					placeholder="Enter your password..."
					element="input"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(6)]}
					errorText="Please enter a valid password (min 6 characters)."
					onInput={inputHandler}
				/>

				<Button type="submit" disabled={!formState.isValid}>
					{isLoginMode ? 'LOGIN' : 'SIGNUP'}
				</Button>
			</form>

			<Button inverse onClick={switchModeHandler}>
				SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
			</Button>
		</Card>
	);
};

export default Auth;
