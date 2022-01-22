import React, { useContext, useState } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";

const Heading = styled.h1`
	font-size: 1.5rem !important;
	font-weight: 900;
	padding: 2rem 0;
	color: #d6d6d6;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
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

	@media (max-width: 1224px) {
		padding: 0 1.5rem;
	}

	.dropzone{
		display: flex;
		align-items:center;
		justify-content: center;
		padding: 2rem;
		margin: 2rem;
		width: 40%;
		height: 50%;
		border-radius: 16px;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23787987FF' stroke-width='4' stroke-dasharray='6%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
		outline:none;
		cursor: pointer;
		@media (max-width: 1224px){
			height: 20%;
		}
	}
`

const ContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	overflow: auto;
	height: 100%;
`;

const DropzoneText = styled.p`
	margin-bottom: 0;
	padding: 0 2rem;
	color: #838DA0;
	font-size: 1.25rem;
	font-weight: 700;
`;

const SelectedText = styled.p`
	margin-bottom: 0;
	font-size: 1rem;
	font-weight: 700;
	color: silver;
`;

const UploadButton = styled.button`
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

const DropzoneLabel = styled.span`
	font-size: 1.25rem;
	font-weight: 700;
`;

const StyledPublishIcon = styled(PublishIcon)`
	margin: 0 0.5rem 0 0;
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

const TextInputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	margin: 0.5rem;
	@media (max-width: 1224px) {
		width: 100%;
	}
`;

const TextLabel = styled.label`
	padding: 0 1rem 0 0;
	font-size: 1.25rem;
	font-weight: 700;
	color: #d6d6d6;
	margin-bottom: 0;
`;

const TextWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 100%;
	height: 70%;
`;

const Upload = () => {
	const apiUrl = process.env.REACT_APP_FASTAPI_URL;
	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token,user} = useContext(UserContext);
	const [files, setFiles] = useState(null);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [deadline, setDeadline] = useState("");
	const [loading, setLoading] = useState(false);

	const getResults = () => {
		if (files) {
			const fData = new FormData();
			//!Todo Make dynamic
			fData.append("course_code","CS2102")
			fData.append("assignment_id",1);
			fData.append("file_obj", files[0]);
			fData.append("roll_no",user._id);
			console.log(files[0], "file");

			var config = {
				method: "post",
				url: `${apiUrl}/assignment/answer/upload`,
				data: fData,
			};

			setLoading(true);

			Axios(config)
				.then((res) => {
					Axios.post(
						`${nodeApiUrl}student/submitAssignment`,
						{
							title,
							description: desc,
							assignmentGiven: res.data.url,
							deadline,
						},
						{
							headers: {
								Authorization: "Bearer " + token,
							},
						}
					)
						.then((res) => {
							// console.log(res.data);
							setLoading(false);
							window.alert(res.data.message);
						})
						.catch((err) => {
							window.alert("Network error");
							setLoading(false);
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// console.log("No formdata");
		}
	};

	return (
		<Container>
			<Heading>Upload your assignments here</Heading>
			<ContentContainer>
				<TextWrapper>
					<TextInputContainer>
						<TextLabel>Title</TextLabel>
						<TextInput
							type="text"
							value={title}
							onChange={(e) => {
								e.preventDefault();
								setTitle(e.target.value);
							}}
						/>
					</TextInputContainer>
					<TextInputContainer>
						<TextLabel>Description</TextLabel>
						<TextInput
							type="text"
							value={desc}
							onChange={(e) => {
								e.preventDefault();
								setDesc(e.target.value);
							}}
						/>
					</TextInputContainer>
					<TextInputContainer>
						<TextLabel>Deadline</TextLabel>
						<TextInput
							type="date"
							value={deadline}
							onChange={(e) => {
								e.preventDefault();
								setDeadline(e.target.value);
							}}
						/>
					</TextInputContainer>
				</TextWrapper>
				<Dropzone
					onDrop={(files) => {
						console.log(files, "files");
						setFiles(files);
					}}
					maxSize={3072000}>
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
								<DropzoneLabel>
									{isDragActive ? "📂" : "📁"}
								</DropzoneLabel>
								<DropzoneText>
									{isDragActive
										? `Drop your files here`
										: `Drag & drop or click to select files`}
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
			</ContentContainer>
			<UploadButton onClick={() => getResults()}>
				<StyledPublishIcon />
				{loading ? "Uploading.." : "Upload"}
			</UploadButton>
		</Container>
	);
};

export default Upload;
