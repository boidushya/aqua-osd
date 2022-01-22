import HeroSection from '@components/Landing/HeroSection'
import Wrapper from '@components/Default/Wrapper'
import Navbar from "@components/Default/Navbar"
import React from 'react'
import styled from 'styled-components'

const MarginDiv = styled.div`
	height: 100vh;
	&:after{
		content: "";
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 275'%3E%3Cpath fill='url(%23gradient-fill)' fill-opacity='1' d='M0,32L120,80C240,128,480,224,720,240C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z'%3E%3C/path%3E%3Cdefs%3E%3ClinearGradient id='gradient-fill' x1='0' y1='0' x2='800' y2='0' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230466c8' /%3E%3Cstop offset='0.125' stop-color='%230463c3' /%3E%3Cstop offset='0.25' stop-color='%230461be' /%3E%3Cstop offset='0.375' stop-color='%23035eb8' /%3E%3Cstop offset='0.5' stop-color='%23035bb3' /%3E%3Cstop offset='0.625' stop-color='%230358ae' /%3E%3Cstop offset='0.75' stop-color='%230356a9' /%3E%3Cstop offset='1' stop-color='%230353a4' /%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
		background-repeat: no-repeat no-repeat;
		background-position: center center;
		background-size: cover;
		height:20rem;
		width: 100%;
		position: absolute;
		bottom: 0;
	}
`

const Landing = () => {
	return (
		<div>
			<Navbar landing/>
			<MarginDiv>
				<HeroSection/>
			</MarginDiv>
		</div>
	)
}

export default Landing
