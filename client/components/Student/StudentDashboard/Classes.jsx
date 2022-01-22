import React,{useState,useEffect} from "react";
import styled from "styled-components";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Axios from "axios";
import ActivityCard from "./ActivityCard";
import NoAssignmentsDiagram from "@static/svg/NoAssignmentsDiagram";

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: 2fr 1fr;
	width: 100%;
	padding: 2rem;
	gap: 1rem;
`

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	color: #d6d6d6;
	padding-bottom: 2rem;
`

const CardContainer = styled.a`
	flex:1;
	display: flex;
	align-items:center;
	justify-content:space-between;
	padding: 1.75rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	gap: 2rem;
	min-width: 33%;
	max-width: 50%;
	cursor: pointer;
	color: inherit;
	& > div{
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	h3{
		font-weight: 900;
		font-size: 1.5rem;
	}
	h2{
		display: flex;
		align-items:center;
		font-weight: 700;
		font-size: 1rem;
		svg{
			font-size: 1rem;
		}
		span{
			margin-left: 0.25rem;
		}
	}
	p{
		display: flex;
		align-items:center;
		font-weight: 500;
		font-size: 1rem;
		margin-bottom: 0;
		svg{
			font-size: 1.25rem;
		}
		span{
			margin-left: 0.25rem;
		}
	}
`

const CardWrapper = styled.div`
	flex: 1;
	gap: 2rem;
	display: flex;
	flex-wrap: wrap;
`

const ClassSection = styled.div`
`

const ActivitySection = styled.div`

`

const UploadButton = styled.button`
	display:flex;
	align-items:center;
	justify-content:center;
	margin: 1.5rem 0 0.5rem 0;
	padding: 0.75rem 1.25rem;
	border-radius: 0.75rem;
	background: #25252d;
	color: var(--app-text);
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
	border: none;
`;

const Cards = (props) => {
	const { item } = props;
	return (
		<>
			<CardContainer href={`https://meet.jit.si/${item._id}`} target="_blank">
				<div>
					<h3>{item._id}</h3>
				</div>
				<div>
					<h2>{item.credits}</h2>
					<h2><AccessTimeIcon/><span>{`${item.from}-${item.to}`}</span></h2>
					<UploadButton>
						Present
					</UploadButton>
				</div>
			</CardContainer>
		</>
	)
}


const Classes = () => {
	const [courses,setCourses] = useState([]);
	const [activity, setActivity] = useState([{
		"score":10,
		"xp":1,
		"name":"Attendance"
	},{
		"score":20,
		"xp":2,
		"name":"Marks"
	}])

	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;

	useEffect(() => {
		Axios.get(`${nodeApiUrl}course/getAllCourses`)
			.then((coursesResponse) => {
				console.log(coursesResponse,"course");
				Axios.get(`${nodeApiUrl}course/getDate`)
				.then((res) => {
					let upcomingClass = [];
					coursesResponse.data.response.map((course) => {
						var currentDate = new Date(res.data.response);
						if(currentDate.getHours() < course.from.substring(0,2)){
							upcomingClass.push(course);
						}
					})
					setCourses(upcomingClass);
				}).catch((err) => {
					console.log(err);
				})
			})
			.catch((err) => {
				//Todo instead add Toast
				console.log(err);
				// if (Array.isArray(err.response.data.error)) {
				// 	setErrors(err.response.data.error);
				// } else {
				// 	setErrors([{ msg: err.response.data.error }]);
				// }
			});
	},[])

	return (
		<Wrapper>
			<ClassSection>
				<Heading>
					Upcoming Classes
				</Heading>
				<CardWrapper>
					{courses.length!==0 ? courses.map((item,index)=>(
						<>
							<Cards item={item} />
						</>
					)) : (
					<div style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						opacity: "0.5"
					}}>
						<NoAssignmentsDiagram/>
					</div>)}
				</CardWrapper>
			</ClassSection>
			<ActivitySection>
				<Heading>
					Activity
				</Heading>
				<ActivityCard items={activity} />
			</ActivitySection>
		</Wrapper>
	)
}

export default Classes