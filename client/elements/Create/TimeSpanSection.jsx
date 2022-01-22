import FileContext from "@contexts/File/FileContext";
import React, { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	
`

const Group = styled.div`
	display: flex;
	align-items:center;
	gap: 1rem;
	margin-top: 1rem;
`

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`

const SubTitle = styled(Title)`
	font-size: 0.875rem;
	font-weight: 800;
`

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
	}
`

const TimeSpanSection = () => {
	const { files, setFiles } = useContext(FileContext)
	const handleStartInput = (e) => {
		setFiles({
			...files,
			timeSpan: {
				...files.timeSpan,
				start:e.target.value
			}
		})
	}
	const handleEndInput = (e) => {
		setFiles({
			...files,
			timeSpan: {
				...files.timeSpan,
				end:e.target.value
			}
		})
	}
	return (
		<Wrapper>
			<Title>Time Span</Title>
			<Group>
				<Container>
					<SubTitle>Start</SubTitle>
					<InputContainer
						value={files.timeSpan.start}
						type="time"
						onChange = {handleStartInput}
						placeholder={`e.g “Design and Analysis of Algorithms”`}
					/>
				</Container>
				<Container>
					<SubTitle>End</SubTitle>
					<InputContainer
						value={files.timeSpan.end}
						type="time"
						onChange = {handleEndInput}
						placeholder={`e.g “Design and Analysis of Algorithms”`}
					/>
				</Container>
			</Group>
		</Wrapper>
	)
}

export default TimeSpanSection
