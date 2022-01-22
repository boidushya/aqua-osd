import React, { useState,useContext } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import Axios from "axios";
import UserContext from "../../contexts/User/UserContext"

const Container = styled.div`
	display:flex;
	align-items:center;
	justify-content:center;
	flex-direction:column;
	padding: 1.5rem;
	.dropzone{
		display: flex;
		align-items:center;
		justify-content: center;
		border: 2px dashed #65D862;
		padding: 2rem;
		margin: 1rem 0;
		width: 100%;
		height: 40%;
		border-radius: 20px;
		background: #f3faf3;
		outline:none;
		cursor: pointer;
		box-shadow:  2px 2px 12px #e3e7ec;
		@media (max-width: 1224px){
			padding:1rem 2rem;
		}
	}
`

const StyledAssignmentRoundedIcon = styled(AssignmentRoundedIcon)`
	margin: 0 1rem 0 0;
	color:#41454a;
`

const Title = styled.h1`
	font-size: 2rem !important;
	font-weight: 700 !important;
	color: #41454a;
	padding:2rem 0 0 ;
	text-decoration: underline;
`

const Description = styled.h3`
	font-size: 1rem !important;
	padding: 1rem 0 1rem;
	color: gray;

`

const Deadline = styled.p`
	margin-bottom: 0 !important;
	margin-left:auto !important;
	color: #41454a;
`

const SubmitButton = styled.button`
	border-radius: 8px;
	padding: 0.75rem 2rem;
	font-weight: 500;
	transition: all 0.3s ease-in-out;
	margin: 2rem 0;
	user-select: none;
	background: #EEF7FF;
	border:none;
	color:#0284FE;
	border-radius: 1000rem;
	height: 3rem;
	width:50%;
	&:hover{
		background:#DCEEFF;
	}
	@media (max-width: 1224px){
		margin:2rem 1rem 1rem;
		width: 50vw;
		padding: 0.75rem 1.25rem;
	}
`

const DropzoneText = styled.p`
	margin-bottom: 0;
	padding: 0 2rem;
	color: gray;
	font-size:1.25rem;
	font-weight: 700;
	@media (max-width:1224px){
		font-size: 1rem;
	}
`

const DropzoneLabel = styled.span`
	font-size:1.25rem;
	font-weight: 700;
`

const Link = styled.a`
	align-self:flex-start;
`

const FlexContainer = styled.div`
	display:flex;
	width:100%;
	padding: 0;
`

const SelectedText = styled.p`
	margin: 1rem 0 0;
	font-size: 1rem;
	font-weight: 700;
	color: silver;
`


const ModalBodyStudent = (props) => {
	console.log(props,"assignment");
	const date = new Date(props.deadline);
	const [files, setFiles] = useState(null);
	const {user} = useContext(UserContext);

	//Upload functionality
	const apiUrl = process.env.REACT_APP_FASTAPI_URL;
	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const jwtToken = localStorage.getItem("token");

	const getResults = () => {
		console.log("in")
		if (files) {
			const fData = new FormData();
			fData.append("doc",files[0]);
			fData.append("subject",props.assignmentId);
			fData.append("tag","Renaissance")

			var config = {
				method:"post",
				url:`${apiUrl}/assignment/upload/answer`,
				data:fData
			}

			Axios(config).then((res) => {
				console.log(res.data.url,"ok");
					Axios.post(`${nodeApiUrl}student/submitAssignment`,{
					assignment:res.data.url,
					assignmentId:props._id,
				},{
					headers: {
						"Authorization": "Bearer "+jwtToken
					}
				}).then((res) => {
					console.log(res.data);
					window.alert(res.data.message);
				}).catch((err) => {
					console.log(err);
				})
			}).catch((err) => {
				console.log(err);
			})
		}

		else {
			console.log("eww wtf no formdata tf 🤢🤮🤮")
		}
	};


	return (
		<Container>
			<>
				<FlexContainer>
					<Link href={props.assignmentGiven}>Download Assignment</Link>
					<Deadline>Submit by: {date.getHours()}:{date.getMinutes()} on {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Deadline>
				</FlexContainer>
				<Title>
					<StyledAssignmentRoundedIcon/>
					{props.title}
				</Title>
				<Description>{props.description}</Description>
				<Dropzone
					onDrop={(files) => {
						setFiles(files);
					}}
					maxSize={30720000}>
					{({
						getRootProps,
						getInputProps,
						isDragActive,
						isDragAccept,
						isDragReject,
					}) => {
						const additionalClass = isDragAccept
							? "accept"
							: isDragReject
								? "reject"
								: "";

						return (
							<div
								{...getRootProps({
									className: `dropzone ${additionalClass}`,
								})}>
								<input {...getInputProps()} />
								<DropzoneLabel>{isDragActive ? "📂" : "📁"}</DropzoneLabel>
								<DropzoneText>
									{
										(isDragActive)
											? `Drop your files here`
											: `Drag & drop or click to select files`
									}
								</DropzoneText>
							</div>
						);
					}}
				</Dropzone>
				{files && (
					<SelectedText>
						Selected File : {files[files.length - 1].name}
					</SelectedText>
				)}
				<SubmitButton onClick ={() => getResults()}>Submit</SubmitButton>
			</>
		</Container>
	)
}

export default ModalBodyStudent
