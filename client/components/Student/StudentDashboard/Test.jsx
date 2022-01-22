import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
// import Notices from "../../../components/Notices";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";
import AssignmentCard from "../../../components/Utils/AssignmentCard";
import Classes from "./Classes";
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

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 2rem;
`

const AssignmentsContainer = styled.div`
	display: flex;
	gap: 2rem;
	flex-wrap: wrap;
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	color: #d6d6d6;
	padding-bottom: 2rem;
`;

const Flexbreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;

const AssignmentsNotices = () => {
	// eslint-disable-next-line
	const [student, setStudent] = useState({});
	const [assignments, setAssignments] = useState([]);

	let ongoingAssignments = [];
	let completedAssignments = [];

	if (assignments) {
		assignments.forEach((assignment) => {
			let date = new Date(assignment.deadline);
			if (date > Date.now()) {
				ongoingAssignments.push(assignment);
			} else {
				completedAssignments.push(assignment);
			}
		});
	}

	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);

	useEffect(() => {
		Axios.get(`${nodeApiUrl}student/getStudent`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((res) => {
			console.log(res.data.response.assignments);
			setStudent(res.data.response);
			setAssignments(res.data.response.assignments);
		});
	}, [nodeApiUrl, token]);

	return (
		<>
			<Classes/>
			<Wrapper>
				{ongoingAssignments.length > 0 && (
					<Heading>Upcoming Assignments</Heading>
				)}
				<AssignmentsContainer>
					<AssignmentCard
						assignments={ongoingAssignments}
					/>
				</AssignmentsContainer>
			</Wrapper>
			<AssignmentsContainer>
				{completedAssignments.length > 0 && (
					<Heading>Completed Assignments</Heading>
				)}
				<Flexbreak />
				<AssignmentCard
					assignments={completedAssignments}
				/>
			</AssignmentsContainer>
			<Graphs/>
		</>
	);
};

const Test = () => {
	return (
		<Container>
			<AssignmentsNotices />
		</Container>
	);
};

export default Test;