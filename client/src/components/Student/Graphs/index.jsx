import React, { useEffect } from "react";
import styled from "styled-components";
import { Bar, defaults } from 'react-chartjs-2';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import BatteryAlertIcon from '@material-ui/icons/BatteryAlert';
import BlockIcon from '@material-ui/icons/Block';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2,minmax(0,1fr));
	gap: 2rem;
`

const Container = styled.section`
	padding: 2rem;
	width: 100%;
`

const GraphContainer = styled.div`
	padding: 1rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
`

const Chart = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 0.5rem;
`

const CardContainer = styled.div`
	flex:1;
	display: flex;
	align-items:center;
	padding: 0.75rem 1.25rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	gap: 1rem;
	h3{
		font-weight: 900;
		font-size: 1.25rem;
	}
	p{
		font-weight: 500;
		font-size: 1rem;
		margin-bottom: 0;
	}
`

const CardsWrapper = styled.div`
	display: flex;
	align-items:center;
	gap: 1rem;
	margin: 1rem 0;
`

const Graph1 = () => {
	const data = {
		labels: ["January", "February", "March", "April", 'May', 'June', 'August', 'September'],
		datasets: [{
			label: "Present",
			data: [12,13,10],
			backgroundColor: "#0d6efd",
			borderColor: 'transparent',
			borderWidth: 2.5,
			barPercentage: 1,
		}, {
			label: "Absent",
			startAngle: 2,
			data: [2,1,3],
			backgroundColor: "#dc3545",
			borderColor: 'transparent',
			borderWidth: 2.5,
			barPercentage: 1,
		}]
	}

	const options = {}
	return (
		<Chart>
		<h3>Chart 1</h3>
		<Bar data={data} options={options} />
		</Chart>
	)
}

const Graph2 = () => {
	const data = {
		labels: ["January", "February", "March", "April", 'May', 'June', 'August', 'September'],
		datasets: [{
			label: "Lost",
			data: [20, 40, 20, 50, 25, 40, 25, 10],
			backgroundColor: "#0d6efd",
			borderColor: 'transparent',
			borderWidth: 2.5,
			barPercentage: 1,
		}, {
			label: "Success",
			data: [45, 25, 40, 20, 60, 20, 35, 25],
			startAngle: 2,
			backgroundColor: "#dc3545",
			borderColor: 'transparent',
			borderWidth: 2.5,
			barPercentage: 1,
		}]
	}

	const options = {}
	return (
		<Chart>
		<h3>Chart 2</h3>
		<Bar data={data} options={options} />
		</Chart>
	)
}

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	color: #d6d6d6;
	padding-bottom: 2rem;
`

const Cards = () => {
	const cardData = [{
		name:"name 1",
		desc:"description 1",
		icon: <AddPhotoAlternateIcon/>
	},{
		name:"name 2",
		desc:"description 2",
		icon: <BatteryAlertIcon/>
	},{
		name:"name 3",
		desc:"description 3",
		icon: <BlockIcon/>
	}]

	return (
		<CardsWrapper>
			{cardData.map(item=>(
				<CardContainer>
					<div>{item.icon}</div>
					<div>
						<h3>{item.name}</h3>
						<p>{item.desc}</p>
					</div>
				</CardContainer>
			))}
		</CardsWrapper>
	)
}

const Graphs = () => {
	useEffect(()=>{
		defaults.color = '#b5bccc'; // Font color
		defaults.font.size = 13;
		defaults.font.family = `"DM Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
	},[])
	return(
		<Container>
			{/* <Cards/> */}
			<Heading>Graphs</Heading>
			<Wrapper>
				<GraphContainer>
					<Graph1/>
				</GraphContainer>
				{/* <GraphContainer>
					<Graph2/>
				</GraphContainer> */}
			</Wrapper>
		</Container>
	)
}

export default Graphs
