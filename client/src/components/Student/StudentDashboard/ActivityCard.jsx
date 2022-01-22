import React from "react";
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar'

const ActivityCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.75rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	gap: 0.825rem;
`

const Card = styled.div`
	p{
		margin: 0;

	}
	h3{
		font-weight: 900;
		display: flex;
		align-items:center;
		justify-content: space-between;
		& > p{
			font-weight: 500;
			font-size: 0.75rem;
		}
	}
`

const ActivityCard = ({ items }) => {
	const xpVariant = [
		"info",
		"danger",
		"warning",
		"success",
	]
	return (
		<>
			<ActivityCardContainer>
				{items.map((item, index) => (
					<Card key={index}>
						<h3>{item.name}
							<p>Score {item.score}</p>
						</h3>
						<ProgressBar variant={xpVariant[index]} animated now={item.xp*100/5} />
					</Card>
				))}
			</ActivityCardContainer>
		</>
	)
}

export default ActivityCard
