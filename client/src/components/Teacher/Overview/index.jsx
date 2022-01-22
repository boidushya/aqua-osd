import React, { useState } from 'react'
import styled from "styled-components";
import Axios from "axios";
import InfoTable from '@components/Student/StudentDashboardContent/InfoTable';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: inherit;
	}

	&::-webkit-scrollbar {
		width: 6px;
		background-color: inherit;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		// background-color: #9295a0;
		background-color: #c3c3c3;
	}
`;

const Overview = () => {
	return (
		<Container>
			<InfoTable />
		</Container> 
	)
}

export default Overview
