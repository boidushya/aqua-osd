import React from "react";
import styled from "styled-components";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventIcon from '@material-ui/icons/Event';
import { useContext } from "react";
import UserContext from "@contexts/User/UserContext";

const CardContainer = styled.div`
	flex:1;
	display: flex;
	align-items:center;
	justify-content:space-between;
	padding: 1.75rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	gap: 1rem;
	max-width: ${(props) => {
		if(props.students){
			return "100%"
		}
		else{
			return "30%"
		}
	}};
	min-width: 30%;
	cursor: pointer;
	& > div{
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	h3{
		font-weight: 900;
		font-size: 1.5rem;
	}
	h2{
		font-weight: 700;
		font-size: 1rem;
	}
	p{
		display: flex;
		align-items:center;
		font-weight: 500;
		font-size: 1rem;
		margin-bottom: 0;
		svg{
			font-size: 1.25rem;
		}
		span{
			margin-left: 0.25rem;
		}
	}
`

const DateContainer = styled.div`
	display: flex;
	align-items:center;
	svg{
		font-size: 1rem;
	}
	span{
		margin-left: 0.25rem;
	}
`

const Card = (props) => {
	const { item } = props;

	const {user} = useContext(UserContext);

	return (
		<>
			<CardContainer {...props}>
				<div>
					{user.type === "teacher" && props.students ? (
						<a href={item.assignment}>Assignment Submitted</a> 
					):(
						<>
							<h2>{item.title}</h2>
							<h2>{item.description}</h2>
						</>
					)}
				</div>
				<div>
					<p><AssignmentIndIcon /><span>{item?.givenBy?.name}</span></p>
					<DateContainer><EventIcon/><span>{user.type === "teacher" && props.students ? item?.dateSubmitted?.substring(0, 10) : item?.deadline?.substring(0, 10)}</span></DateContainer>
				</div>
			</CardContainer>
		</>
	)
}

export default Card
