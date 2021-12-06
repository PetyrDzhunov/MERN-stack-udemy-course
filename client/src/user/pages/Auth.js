import React from 'react'
import { useForm } from '../../shared/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import './Auth.css';
import Card from '../../shared/components/UIElements/Card'


const Auth = () => {
	const [formState, inputHandler] = useForm({
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
	};


	return (
		<Card className="authentication">
			<h2>Login Required</h2>
			<hr />
			<form onSubmit={authSubmitHandler}>
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

				<Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
			</form>
		</Card>
	)
}

export default Auth
