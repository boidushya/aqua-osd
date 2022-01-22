import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion"
import FileContext from "@contexts/File/FileContext";

const Wrapper = styled.div`
	.dropzone{
		display: flex;
		align-items:center;
		justify-content: center;
		flex-direction:column;
		gap: 1.5rem;
		padding: 2rem;
		margin-top: 1rem;
		width: 100%;
		height: 10rem;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23787987FF' stroke-width='4' stroke-dasharray='6%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
		border-radius: 16px;
		outline:none;
		@media (max-width: 1224px){}
	}
`

const DropzoneText = styled.p`
	margin-bottom: 0;
	padding: 0 2rem;
	color: var(--app-container-text-primary);
	font-size: 1rem;
	font-weight: 700;
	text-align:center;
`

const DropzoneButton = styled(m.a)`
	display: flex;
	align-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 1.25rem;
	border-radius: 1000rem;
	background: ${props=>props.modal?`var(--app-modal-btn-primary)`:`var(--app-container-bg-primary)`};
	color: var(--app-text);
	outline: none;
	border: none;
	cursor: pointer;
	z-index:2;
	text-decoration: none;
	user-select:none;
	&:hover{
		color : inherit;
	}
`

const Dropzone = (props) => {
	const initialDragText = "Drag and drop files here. PDF only. Max 10mb."
	const { files, setFiles } = useContext(FileContext)
	const [dragText, setDragText] = useState(initialDragText)
	const {getRootProps, getInputProps, open, acceptedFiles,isDragActive,fileRejections} = useDropzone({
		noClick: true,
		noKeyboard: true,
		maxFiles:1,
		accept: `application/pdf`
	});
	useEffect(() => {
		if(acceptedFiles.length){
			setFiles({
				...files,
				file: acceptedFiles[0]
			});
		}
		console.log(acceptedFiles)
	//eslint-disable-next-line
	}, [acceptedFiles])
	useEffect(() => {
		isDragActive?setDragText(`Drop your files here`):setDragText(initialDragText)
	//eslint-disable-next-line
	}, [isDragActive])
	useEffect(() => {
		if(fileRejections.length){
			setDragText(fileRejections[0].errors[0].message)
			setTimeout(() => {
				setDragText(initialDragText);
			}, 3000);
		}
		console.log("Rejected: ");
		console.log(fileRejections)
	//eslint-disable-next-line
	}, [fileRejections])
	return (
		<div {...getRootProps({className: 'dropzone'})}>
			<input {...getInputProps()} />
			<DropzoneText>
				{dragText}
			</DropzoneText>
			<DropzoneButton
				modal={props.modal}
				onClick={open}
				whileHover={{
					y: -5,
					x: 0,
					scale:1.02
				}}
				whileTap={{
					scale:0.99
				}}
			>
				Choose File
			</DropzoneButton>
		</div>
	)

}

const CustomDropzone = ({modal}) => {
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper>
				<Dropzone modal={modal} maxSize={10000000}/>
			</Wrapper>
		</LazyMotion>
	)
}

export default CustomDropzone
