import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import BackButton from "@material-ui/icons/ArrowBackIos";
import PaperIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/AssignmentInd";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: auto;
	padding: 2rem;
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
	/* flex-direction: column; */
	text-transform: capitalize;
	width: 100%;
	height: 100%;
	margin: 2rem 0;
	@media (max-width: 1224px) {
		flex-direction: column;
	}
`;

const InputLabel = styled.h1`
	color: #d6d6d6;
	font-size: 1.5rem !important;
	font-weight: 700;
`;

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	margin: 1rem 2rem 1rem 0;
	border-radius: 10px;
	border: 2px solid var(--app-container-text-primary);
	background: var(--app-container-bg-primary);
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: var(--app-text);
`;

const SubmitBtn = styled.button`
	display:flex;
	align-items:center;
	padding: 0.75rem 1.25rem;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	border: none;
    border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
	outline:none;
`

const CloseButton = styled.button`
	display: flex;
	align-items: center;
	justify-content:center;
	padding: 0.75rem;
	border-radius: 1000rem;
	/* line-height:1rem; */
	background: transparent;
	border: none;
	text-transform: uppercase;
	font-size:1.5rem;
	font-weight: 700;
	color: #e74845;
	position: relative;
	outline: none;
	justify-self:flex-end;
	width:25px;
	height:25px;
`;

const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content:center;
	padding: 0.75rem;
	border-radius: 1000rem;
	line-height:1.1rem;
	background: transparent;
	border: none;
	text-transform: uppercase;
	font-size: 1.5rem;
	font-weight: 700;
	color: #28e979;
	position: relative;
	outline: none;
	margin-left:auto;
	width:25px;
	height:25px;
`;

const StyledFileCopyIcon = styled(FileCopyIcon)`
	margin: 0 0.5rem 0 0;
`;

const BackButtonIcon = styled(BackButton)`
	margin: 0 1rem;
	color: var(--app-text);
	cursor: pointer;
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
`;

const InputGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

const AssignmentsContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	flex-direction: column;
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 0 2rem;
	color: var(--app-text);
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
const CardTitleContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0 1rem;
	margin-left: auto;
	margin-bottom: 0.5rem;
`;

const CardTitle = styled.div`
	font-weight: normal;
	padding: 0 1vw;
	transition: all 0.2s ease;
`;

const Keyword = styled.span`
	margin-left: 1vw;
`;

const Group = styled.div`
	display: flex;
	margin-left: 1vw;
	align-items: center;
	justify-content: center;
`;

const KeywordsContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem 1rem;
	overflow: hidden;
	${(props) => {
		if (props.theme !== "primary") {
			return `
				color: #ff5343;
			`;
		} else {
			return `
				color: #70e76c;
			`;
		}
	}}
`;

const Flexbreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;
const Content = styled.div`
	color: lightgray;
`;

const Select = styled.select`
	padding: 0.75rem 1rem;
	margin: 2rem;
	border-radius: 10px;
	border: 2px solid var(--app-container-text-primary);
	background: var(--app-container-bg-primary);
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: var(--app-text);
	width: 100%;
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

const StyledInputGroup = styled(InputGroup)`
	flex: 1;
    width: 100%;
`

const ContentContainer = styled.div`
	display: flex;
	align-items:center;
	flex-wrap: wrap;
`

const Keywords = () => {
	const [result, setResult] = useState([]);
	const [options, setOptions] = useState(null);
	const [selectedValue, setSelectedValue] = useState("");
	const [fields, setFields] = useState([{ value: null }]);
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(false);
	const {user} = useContext(UserContext);

	const handleChange = (i, event) => {
		const values = [...fields];
		values[i].value = event.target.value;
		setFields(values);
	};

	const handleAdd = () => {
		const values = [...fields];
		values.push({ value: null });
		setFields(values);
	};

	const handleRemove = (i) => {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	};

	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);
	
	const getResults = (e) => {
		const apiUrl = process.env.REACT_APP_FASTAPI_URL;

		setLoading(true);
		const kwords = fields.map((item) => item.value);
		const splittedSelectedValue = selectedValue.split(" ");
		console.log(user.course,selectedValue);

		Axios.post(`${nodeApiUrl}teacher/assignmentDetail`, {
			assignmentId:selectedValue
		},{
			headers: {
				Authorization: "Bearer " + token,
			}
		})
			.then((res) => {
				setLoading(false);
				setResult(res.data.response.keywordsSummary);
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
				window.alert("Error fetching assignments");
				setFetching(false);
				console.log(err, "Err");
			});
	}, [nodeApiUrl, token]);

	return (
		<Container>
			{result.length > 0 ? (
				<AssignmentsContainer>
					<Group>
						<BackButtonIcon onClick={() => setResult([])} />
						<Heading>Keywords Checker</Heading>
					</Group>
					<ContentContainer>
						{result.map((item, index) => (
							<Card key={index}>
								<Content>
									{(()=>{console.log(item)})()}
									{Object.values(item).filter(elem=>elem==="true")?.length!==0&&(
										<KeywordsContainer
											noBorderRadius
											theme="primary">
											<PaperIcon />
											<Group>
												Present :
												{Object.values(item).map(
													(value, i) =>
														value === "true" && (
															<Keyword>
																{Object.keys(item)[i]}{" "}
															</Keyword>
														)
												)}
											</Group>
										</KeywordsContainer>
									)}
									{Object.values(item).filter(elem => elem === "false")?.length !== 0 &&(
										<KeywordsContainer theme="warning">
											<PaperIcon />
											<Group>
												Absent :
												{Object.values(item).map(
													(value, i) =>
														value === "false" && (
															<Keyword>
																{Object.keys(item)[i]}
															</Keyword>
														)
												)}
											</Group>
										</KeywordsContainer>
									)}
								</Content>
								<CardTitleContainer>
									<PersonIcon />
									<CardTitle>{item.name}</CardTitle>
								</CardTitleContainer>
							</Card>
						))}
					</ContentContainer>
				</AssignmentsContainer>
			) : (
				<InputContainer>
					{/* <InputWrapper>
						<StyledInputGroup>
							<InputLabel>Enter Keywords</InputLabel>
							<AddButton onClick={() => handleAdd()}>
								<AddCircleOutlineIcon/>
							</AddButton>
						</StyledInputGroup>
						{fields.map((field, idx) => {
							return (
								<StyledInputGroup key={`${field}-${idx}`}>
									<TextInput
										type="text"
										value={field.value}
										onChange={(e) => handleChange(idx, e)}
									/>
									<CloseButton
									onClick={() => handleRemove(idx)}>
										<HighlightOffIcon/>
									</CloseButton>
								</StyledInputGroup>
							);
						})}
					</InputWrapper> */}

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
						{loading ? "Retrieving" : "Check"}
					</SubmitBtn>
				</InputContainer>
			)}
		</Container>
	);
};

export default Keywords;
