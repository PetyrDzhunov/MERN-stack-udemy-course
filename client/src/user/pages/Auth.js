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
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
			try {
				const responseData = await sendRequest("http://localhost:5000/api/users/login",
					'POST',
					JSON.stringify({ email: formState.inputs.email.value, password: formState.inputs.password.value }),
					{ 'Content-type': 'application/json' }
				);
				auth.login(responseData.user.id);
			} catch (err) {
			};
		} else {
			try {
				const formData = new FormData();
				formData.append('email', formState.inputs.email.value);
				formData.append('name', formState.inputs.name.value);
				formData.append('password', formState.inputs.password.value);
				formData.append('image', formState.inputs.image.value);
				const responseData = await sendRequest("http://localhost:5000/api/users/signup", 'POST',
					formData,
				);
				auth.login(responseData.user.id);
			} catch (error) {
			};
		};
	};

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData({
				...formState.inputs,
				name: undefined,
				image: undefined
			}, formState.inputs.email.isValid && formState.inputs.password.isValid)
		} else {
			setFormData({
				...formState.inputs,
				name: {
					value: '',
					isValid: false
				},
				image: {
					value: null,
					isValid: false
				}
			}, false);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};


	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
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
					{!isLoading && <ImageUpload onInput={inputHandler} center id="image" />}
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
		</>
	);
};

export default Auth;
