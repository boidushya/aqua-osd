import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AssignmentCard from "@components/Utils/AssignmentCard";
import Notices from "@components/Utils/Notices";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";
import NoAssignmentsDiagram from "@static/svg/NoAssignmentsDiagram";

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

// const AssignmentsContainer = styled.div`
// 	flex: 1 1 auto;
// 	display: flex;
// 	flex-wrap: wrap;
// 	align-items: center;
// 	justify-content: center;
// 	width: 100%;
// `;


const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 0 2rem;
	color: ${(props) => props.message ? "green" : "#d6d6d6"};
	padding-bottom: 2rem;
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

const LoaderStyles = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	& div {
		position: absolute;
		border: 4px solid #fff;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	& div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
`;

const LoadingContainer = styled.div`
	display:grid;
	place-items:center;
	height:100%;
`;

const Loader = () => {
	return (
		<LoadingContainer>
			<LoaderStyles>
				<div></div>
				<div></div>
			</LoaderStyles>
		</LoadingContainer>
	)
};

const AssignmentsNotices = ({history}) => {
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [teacher, setTeacher] = useState({});
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
	const { token,user } = useContext(UserContext);

	useEffect(() => {
		console.log(user,"Course");
		if(!token){
			history.push("/login");
		}
		Axios.get(`${nodeApiUrl}teacher/getTeacher`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((res) => {
			setLoading(false);
			setTeacher(res.data.response);
			setAssignments(res.data.response.assignments);
		}).catch((err) => {
			window.alert("Network error");
		});
	}, [nodeApiUrl, token]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					{/* <Wrapper>
						{ongoingAssignments.length > 0 && (
							<Heading>Upcoming Assignments</Heading>
						)}
						<AssignmentsContainer>
							<AssignmentCard
								assignments={ongoingAssignments}
								students={true}
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
							students={true}
						/>
					</AssignmentsContainer> */}
					<Wrapper>
						<Heading>Ongoing Assignments</Heading>
						<AssignmentsContainer>
							{
								ongoingAssignments.length > 0 ? (
									<AssignmentCard click={true} assignments={ongoingAssignments} />
								) : (
									<Heading message={true}>No ongoing assignments! </Heading>
								)
							}
						</AssignmentsContainer>
					</Wrapper>
					<Wrapper>
						<Heading>Completed Assignments</Heading>
						<AssignmentsContainer>
							{
								completedAssignments.length > 0 ? (
									<AssignmentCard assignments={completedAssignments}/>
								) : (
									<div style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										width: "100%",
										opacity:"0.5"
									}}>
										<NoAssignmentsDiagram/>
									</div>
									// <Heading message={true}>No deadlines reached ! </Heading>
								)
							}
						</AssignmentsContainer>
					</Wrapper>

					{/* <NoticesContainer>
						<Heading>Notices</Heading>
						<Flexbreak />
						{
							notices.length > 0 ? (
								<Notices notices={notices} />
							) : (
								<Heading message={true}>No notices have been uploaded yet! </Heading>
							)
						}
					</NoticesContainer> */}
				</>
			)}
		</>
	);
};

const TeacherDashboardContent = ({history}) => {
	return (
		<Container>
			<AssignmentsNotices history={history}/>
		</Container>
	);
};

export default TeacherDashboardContent;
