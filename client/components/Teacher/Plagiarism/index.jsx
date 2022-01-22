import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DescriptionIcon from "@material-ui/icons/Description";
import ProgressBar from "react-bootstrap/ProgressBar";
import Axios from "axios";

import UserContext from "../../../contexts/User/UserContext";

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

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	text-transform: capitalize;
	width: 60%;
	height: 100%;
	margin: 2rem 0;
	@media (max-width: 1224px) {
		flex-direction: column;
	}
	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px dashed #65d862;
		padding: 2rem;
		margin: 2rem;
		width: 90%;
		height: 40%;
		border-radius: 20px;
		background: #f3faf3;
		outline: none;
		cursor: pointer;
		box-shadow: 9px 9px 23px #e3e7ec, -9px -9px 23px #e3e7ec;
		@media (max-width: 1224px) {
			height: 20%;
		}
	}
`;

const InputLabel = styled.h1`
	color: #d6d6d6;
	font-size: 1.5rem !important;
	font-weight: 700;
`;

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border: 2px solid var(--app-container-text-primary);
	background: var(--app-container-bg-primary);
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: var(--app-text);
	width: 60%;
`;

const SubmitBtn = styled.button`
	display:flex;
	align-items:center;
	margin: 0 0 2rem 0;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
	border: none;
`;

const StyledFileCopyIcon = styled(FileCopyIcon)`
	margin: 0 0.5rem 0 0;
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const AssignmentsContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 0 2rem;
	color: #ececec;
`;

const Card = styled.div`
	flex: 1 1 0;
	font-size: 1rem;
	font-weight: bold;
	min-width: 30vw;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	margin: 2rem;
	padding: 1.5rem 1rem;
	user-select: none;
	display: flex;
	flex-direction: column;
	cursor: pointer;
	@media (max-width: 1224px) {
		max-width: 80vw;
	}
`;

const Content = styled.div`
	color: lightgray;
`;

const Description = styled.div`
	display: flex;
	align-items: center;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	padding: 0 1rem;
`;

const DescriptionText = styled.a`
	cursor: pointer;
	text-decoration: underline;
	margin: 1rem 0;
	padding: 0 1rem;
	transition: all 0.2s ease;
	color: inherit !important;
`;

const AssignedBy = styled.div`
	display: flex;
	align-items: center;
	background: var(--app-container-bg-primary);
	padding: 0 1rem;
`;

const AssignedByText = styled.p`
	margin: 1rem 0;
	font-weight: normal;
	padding: 0 1rem;
	transition: all 0.2s ease;
	&:hover {
	}
`;

const StyledProgressBar = styled(ProgressBar)`
	width: 100%;
	margin: 0 1rem;
	background: var(--app-modal-btn-primary) !important;
`;

const ProgressBarContainer = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0;
	padding: 1rem 0;
`;

const Select = styled.select`
	padding: 0.75rem 1rem;
	border-radius: 10px;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	border: 2px solid var(--app-container-text-primary);
	background: var(--app-container-bg-primary);
	color: var(--app-text);
	width: 60%;
`;

const Option = styled.option`
	padding: 0.75rem 1rem;
	margin: 2rem;
	background: white;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
	outline: none;
	border: 0px;
`;

const AssignmentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	width: 100%;
`

const ProgressBarLabel = styled.span`
	margin-left: 1rem;
	display: block;
	color: ${(props) => (props.final > 0 ? `#31bb52` : `#f03f51`)};
`;

const MetaContainer = styled.div`
	display: flex;
	justify-content:space-between;
`

const Plagiarism = () => {
	const [threshold, setThreshold] = useState("");
	const [result, setResult] = useState([]);
	const [options, setOptions] = useState(null);
	const [selectedValue, setSelectedValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(false);

	const apiUrl = process.env.REACT_APP_FASTAPI_URL;
	const { token,user } = useContext(UserContext);
	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;

	const getResults = (e) => {
		e.preventDefault();
		setLoading(true);

		Axios.post(`${nodeApiUrl}teacher/assignmentDetail`, {
			assignmentId:selectedValue
		},{
			headers: {
				Authorization: "Bearer " + token,
			}
		})
		.then((res) => {
			setLoading(false);
			setResult(res.data.response.plagSummary);
		})
		.catch((err) => {
			window.alert("Network error");
			setLoading(false);
			console.log(err);
		});
	};


	useEffect(() => {
		//Getting assignments for particular teacher
		setFetching(true);
		Axios.get(`${nodeApiUrl}teacher/getTeacher`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				setFetching(false);
				setOptions(res.data.response.assignments);
				setSelectedValue(
					`${res.data.response.assignments[0].assignmentId}`
				);
			})
			.catch((err) => {
				window.alert("Network error");
				setFetching(false);
				console.log(err, "Err");
			});
	}, [nodeApiUrl, token]);

	return (
		<Container>
			{result.length > 0 ? (
				<AssignmentWrapper>
				<Heading>Plagiarism Checker</Heading>
				<AssignmentsContainer>
					{result.map((item, index) => {
						return item.results.map(({ name, sim_score }) => {
							console.log(name, "name");
							let final = (
								parseInt(threshold) - parseInt(sim_score)
							).toString();
							return (
								<Card key={index + name}>
									<Content>
										<ProgressBarLabel final={final}>
											{final > 0
												? `Test passed by ${final} %`
												: `Test failed by ${-final} %`}
										</ProgressBarLabel>
										<ProgressBarContainer>
											{parseFloat(threshold) <
											parseFloat(sim_score) ? (
												<>
													<StyledProgressBar
														animated
														now={parseFloat(
															sim_score
														).toString()}
														variant="danger"
														key={1}
													/>
												</>
											) : (
												<StyledProgressBar
													animated
													now={parseFloat(
														sim_score
													).toString()}
													variant="success"
												/>
											)}
										</ProgressBarContainer>
										<MetaContainer>
											<Description theme="primary">
												<DescriptionIcon />
												<DescriptionText theme="primary">
													{item.name}
												</DescriptionText>
											</Description>
											<AssignedBy>
												<DescriptionIcon />
												<AssignedByText>
													{name}
												</AssignedByText>
											</AssignedBy>
										</MetaContainer>
									</Content>
								</Card>
							);
						});
					})}
				</AssignmentsContainer>
				</AssignmentWrapper>
			) : (
				<InputContainer>
					<InputWrapper>
						<InputLabel>Enter Threshold percentage</InputLabel>
						<TextInput
							type="text"
							value={threshold}
							onChange={(e) => {
								e.preventDefault();
								setThreshold(e.target.value);
							}}
						/>
					</InputWrapper>

					<InputWrapper>
						<InputLabel>
							{fetching
								? "Fetching Assignments"
								: "Select Assignment"}
						</InputLabel>
						<Select
							onChange={(e) => {
								setSelectedValue(e.target.value);
							}}
							value={selectedValue}>
							{options
								? options.map((item) => (
										<Option
											key={JSON.stringify(item)}
											value={`${item.assignmentId}`}>
											{`${item.assignmentId}`}
										</Option>
								))
								: ""}
						</Select>
					</InputWrapper>
					<SubmitBtn
						onClick={(e) => {
							getResults(e);
						}}>
						<StyledFileCopyIcon />
						{loading ? "Processing" : "check"}
					</SubmitBtn>
				</InputContainer>
			)}
		</Container>
	);
};

export default Plagiarism;
