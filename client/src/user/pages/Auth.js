import React, { useState, useContext } from 'react'
import { useForm } from '../../shared/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './Auth.css';
import Card from '../../shared/components/UIElements/Card'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
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

	const authSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
		auth.login();
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

export default Auth
