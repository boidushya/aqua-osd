import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Plyr from "plyr-react";
import "@styles/plyr.css";
import Funnies from 'funnies';
import LoadingIcon from "@static/svg/LoadingIcon";
import { CSSTransitionGroup } from 'react-transition-group'
import Axios from "axios";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
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

const Heading = styled.h1`
	font-size: 1.5rem !important;
	font-weight: 900;
	color: #ececec;
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 1rem;
`;

const InputLabel = styled.h1`
	color: #d6d6d6;
	font-size: 1rem !important;
	font-weight: 700;
`;

const TextInput = styled.input`
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	border: 2px solid var(--app-container-text-primary);
	background: var(--app-container-bg-primary);
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: var(--app-text);
	width: 15rem;
`;

const Loading = styled.div`
	font-size: 0.75rem;
	display:grid;
	place-items:center;
	height: 100%;
	& > div > span {
		max-width: 4rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`

const ContentWrapper = styled.div`
	display: grid;
	grid-template-columns: 3fr 2fr;
	gap: 2rem;
`

const Section = styled.section`
	display: flex;
	flex-direction: column;
	width:100%;
	height: 100%;
	justify-content: space-between;
	padding-bottom: 1rem;
`

const TranscriptSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: clamp(2rem, 1.5vw, 3rem);
	width:100%;
`

const VideoSection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	.plyr{
		margin: 1rem 0;
		max-height: 24rem;
	}
`

const TranscriptContent = styled.p`
	font-size: 1rem;
	color: #d4e2f7;
	max-height: 50vh;
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
`

const UploadButton = styled.button`
	display:flex;
	align-items:center;
	margin: 1.5rem 0 2rem 0;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
	border: none;
`;

const Video = React.memo(({ url }) => {
	const settings = {
		type: "video",
		sources: [{
			src: url
		}]
	}
	const options = {
		controls: [
			'play',
			'progress',
			'current-time',
			'duration',
			'mute',
			'volume',
			'fullscreen'
		],
	}
	return (
		<Plyr
			source={settings}
			options={options}
		/>
	)
})


const Meet = () => {

	const response = [
		{
			"filename": "dump/temp.txt"
		},
		{
			"from": 0.88,
			"to": 1.15,
			"transcript": "as you order items from Amazon a section on the screens are just other items that might be of interest to you similarly a hundred million choices of Netflix influences among nations for future viewing all this is possible because of availability of data collection systems and improvements in a combination and then I'll go to the net out of fuel we used to deal with the challenges of designing such robust implementation systems one is drive your own team of engineers or data scientists all Heineken in machine learning to custom designed a commendation engines to me don't ",
			"speaker": 0,
			"confidence": 0.52,
			"final": false
		},
		{
			"from": 30.78,
			"to": 31.29,
			"transcript": "however this approach is not feasible for smaller companies and startups as it is quite expensive and might not be suitable in the initial stages back of this problem would be to do that it had been a puzzle do not have a machine learning background easily developed and deployed over nation engine in that application apart now let's see there tomorrow Falardeau looks flustered after involved in this study diabetes and would love to eat there as a partnership ",
			"speaker": 0,
			"confidence": 0.45,
			"final": false
		},
		{
			"from": 57.75,
			"to": 58.1,
			"transcript": "next we'll have to split their data center group training and validation datasets we'll have to load the data streams into the bit I know about ",
			"speaker": 2,
			"confidence": 0.6,
			"final": false
		},
		{
			"from": 76.04,
			"to": 76.5,
			"transcript": "next will play in the market ",
			"speaker": 2,
			"confidence": 0.57,
			"final": false
		},
		{
			"from": 80.69,
			"to": 80.77,
			"transcript": "then we would calculate the prediction scores or rankings for you is that I compass ",
			"speaker": 2,
			"confidence": 0.58,
			"final": false
		},
		{
			"from": 85.75,
			"to": 85.91,
			"transcript": "we can evaluate the market's performance using the inbuilt evaluate those such as mean average precision the decision of the court ",
			"speaker": 2,
			"confidence": 0.58,
			"final": false
		},
		{
			"from": 95.24,
			"to": 95.51,
			"transcript": "once we are satisfied with the motor performance we can save the market as a big looks like ",
			"speaker": 2,
			"confidence": 0.59,
			"final": false
		},
		{
			"from": 101.37,
			"to": 101.92,
			"transcript": "lastly we can also save the predictions which which at in form of a bond ester downstream in any format such as CSV escrow I just want ",
			"speaker": 2,
			"confidence": 0.56,
			"final": false
		}
	]

	let funnies = new Funnies();
	const [loadingMessage, setLoadingMessage] = useState(funnies.message());
	const [url, setUrl] = useState("https://www.dropbox.com/s/jerz74q64ww9hev/lmaokuchbhi%20on%202021-11-05%2020-28.mp4?raw=1#");
	const [transcriptionIsLoading, setTranscriptionIsLoading] = useState(false);
	const [transcriptionData,setTranscriptionData] = useState("");

	// useEffect(() => {
	// 	let changeMessage = ""
	// 	if(transcriptionIsLoading){
	// 		changeMessage = setInterval(() => {
	// 			setLoadingMessage(funnies.message())
	// 		},0);
	// 	}

	// 	// setTimeout(() => {
	// 	// 	setTranscriptionIsLoading(false)
	// 	// }, 200000);

	// 	return ()=> {
	// 		clearInterval(changeMessage);
	// 	}
	// }, [])


	const getTranscription = () => {
		// Axios.post("https://obsidian-server-prod.herokuapp.com/assignment/keyword/transcribe_url",{
		// 	dropbox_url:url
		// }).then((res) => {
		// 	setTranscriptionData(res.data);
		// })

		for(let i=1;i<response.data.length;i++){}

	}

	return (
		<Container>
			<Heading>Meet Info </Heading>
			<Section>
				{url&&(<ContentWrapper>
					<VideoSection>
						<InputLabel>Video</InputLabel>
						<Video url={url} />
					</VideoSection>
					<TranscriptSection>
						<InputLabel>Transcript</InputLabel>
						{transcriptionIsLoading ? (
							<Loading>
								<div>
									<LoadingIcon/>
									<span>{loadingMessage}</span>
								</div>
							</Loading>
						) :(
							<>
							{
								response && response.map((trans,i) => {
									console.log(trans,"transs")
									return (
										<>
											<TranscriptContent>
												{i !== 0 ? `${trans.from}-${trans.to} ${trans.transcript}` : ""}
											</TranscriptContent>
										</>
									)
								})
							}
							</>
						)}
					</TranscriptSection>
				</ContentWrapper>)}
				<InputWrapper>
					<InputLabel>Enter Dropbox URL</InputLabel>
					<TextInput
						type="text"
						value={url}
						onChange={(e) => {
							e.preventDefault();
							setUrl(e.target.value);
						}}
					/>
					<UploadButton onClick={() => getTranscription() }> Submit </UploadButton>
				</InputWrapper>
			</Section>

		</Container>
	)
}

export default Meet

