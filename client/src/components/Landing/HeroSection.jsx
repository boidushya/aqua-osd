import React from "react";
import styled from "styled-components";
import Logo from "@static/svg/logo.svg";
import { domAnimation, LazyMotion, m } from "framer-motion";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: 100%;
	width: 100%;
	display: grid;
	place-items:center;
	h1{
		font-size: 2.5rem;
		font-weight: 900;
	}
	h4{
		font-weight: 200;
		font-size: 1rem;
	}
`

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	width: 100%;
`

const ItemContainer = styled.div`
	display: grid;
	gap: 0.5rem;
	letter-spacing:0.6px;
`

const ButtonContainer = styled.div`
	display: flex;
	gap: 2rem;
`

const Btn = styled(m.a)`
	display: flex;
	align-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	background: ${props => props.secondary ? `transparent` : `var(--app-theme-primary)`};
	color: ${props => props.secondary ? `var(--app-container-text-primary-hover)` : `var(--app-text)`};
	border: ${props => props.secondary ?`0.1rem solid var(--app-container-text-primary-hover)`:`none`};
	outline: none;
	height: 2.5rem;
	cursor: pointer;
	z-index:2;
	user-select:none;
	transition: border 0.2s ease;
	&:hover{
		border: ${props => props.secondary ? `0.1rem solid var(--app-text)` : "none"};
	}
`

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	width: 50%;
	gap: 2rem;
`

const HeroSection = () => {
	return (
		<Wrapper>
			<ContentContainer>
				<Container>
					<img src={Logo} height="120px" alt="Logo"/>
					<ItemContainer>
						<h1>AQUA</h1>
						<h4>AQUA is a service to connect students and teachers.
						Developed to improve and manage continuous evaluation
						of students by academic institutions, it integrates easily
						with schools and colleges</h4>
					</ItemContainer>
				</Container>
				<ButtonContainer>
					<LazyMotion features={domAnimation}>
						<Btn
							href="/login"
							whileHover={{
								scale:1.01,
								y:-7.5,
								x:0
							}}
						>Get Started</Btn>
						<Btn
							href="/signup"
							whileHover={{
								scale: 1.01,
								y: -7.5,
								x: 0
							}}
							secondary
						>Already Registered</Btn>
					</LazyMotion>
				</ButtonContainer>
			</ContentContainer>
		</Wrapper>
	)
}

export default HeroSection
