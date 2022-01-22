import React from "react";
import styled from "styled-components";
import FileProvider from "@contexts/File/FileProvider";
import UploadSection from "@elements/Create/UploadSection";
import CodeSection from "@elements/Create/CodeSection";
import NameSection from "@elements/Create/NameSection";
import RightSection from "@elements/Create/RightSection";
import Changes from "@elements/Create/Changes";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: 75vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Title = styled.div`
	font-size: 1.8rem;
	font-weight: 900;
	align-self:flex-start;
`

const MainSection = styled.div`
	margin: 3rem 2rem 0;
	width: 60vw;
	height: 100%;
	display: grid;
	grid-template-columns: 2fr 1fr ;
	gap: 4rem;
`

const LeftContainer = styled.div`
	display: flex;
	flex-direction:column;
	height: 100%;
	gap: 1.5rem;
`

const UploadContainer = styled.div`
	width: 100%;
`

const Group = styled.div`
	height: 100%;
	display: flex;
	gap: 2.75rem;
	flex-direction: column;
`

const HeroSection = () => {
	return (
		<FileProvider>
			<Wrapper>
				<Title>Create a Course</Title>
				<MainSection>
					<LeftContainer>
						<Group>
							<UploadContainer>
								<UploadSection/>
							</UploadContainer>
							<CodeSection/>
							<NameSection/>
						</Group>
						<Changes/>
					</LeftContainer>
					<RightSection/>
				</MainSection>
			</Wrapper>
		</FileProvider>
	)
}

export default HeroSection
