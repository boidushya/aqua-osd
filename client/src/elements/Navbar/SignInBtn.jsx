import React from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useHistory } from "react-router-dom";

const Btn = styled(m.a)`
	display: flex;
	align-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
	outline: none;
	border: none;
	height: 2.5rem;
	cursor: pointer;
	z-index:2;
	user-select:none;
`

const AnimBtn = ({ children, onClick }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		onClick={onClick}
	>{children}</Btn>
)

const SignInBtn = () => {
	const history = useHistory()
	const handleClick = () => {
		history.push("/login")
	}
	return (
		<LazyMotion features={domAnimation}>
			<AnimBtn onClick={handleClick}>
				Sign In
			</AnimBtn>
		</LazyMotion>
	)
}

export default SignInBtn
