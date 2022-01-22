import React from "react";
import styled from "styled-components";
import InfoTable from "./InfoTable";
import Graphs from "../Graphs";

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
const AssignmentsNotices = () => {

	return (
		<>
			<InfoTable/>
			<Graphs/>
		</>
	);
};

const StudentDashboardContent = () => {
	return (
		<Container>
			<AssignmentsNotices />
		</Container>
	);
};

export default StudentDashboardContent;
