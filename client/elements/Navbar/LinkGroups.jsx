import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 1.5rem;
	.nav-selected{
		color: var(--app-text) !important;
	}
	.nav-links{
		text-decoration: none;
		color: var(--app-container-text-primary);
		transition: color 0.25s ease;
		&:hover{
			color: var(--app-container-text-primary-hover);
		}
	}
`

const LinkGroups = () => {
	return (
		<LinkContainer>
			<NavLink to="/student" exact className="nav-links" activeClassName="nav-selected">
				Dashboard
			</NavLink>
		</LinkContainer>
	)
}

export default LinkGroups
