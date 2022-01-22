import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion"
import CreditsSection from "./CreditsSection";
import TimeSpanSection from "./TimeSpanSection";
import DateSection from "./DateSection";
import Axios from "axios";
import FileContext from "@contexts/File/FileContext";
import { useHistory } from "react-router-dom";
import UserContext from "@contexts/User/UserContext";

const Btn = styled(m.a)`
	width: 75%;
	display: grid;
	place-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
	outline: none;
	border: none;
	cursor: pointer;
	user-select:none;
	transition: background 0.2s ease;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	}
`

const Group = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	gap: 2rem;
`

const Wrapper = styled.div`
	display:flex;
	flex-direction: column;
	align-items:center;
	gap:1rem;
`

const AnimBtn = ({ children, onClick,disabled }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		onClick={onClick}
		disabled={disabled}
	>{children}</Btn>
)

const RightSection = () => {
	const history = useHistory();
	const [buttonText, setButtonText] = useState("Create Course")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { files } = useContext(FileContext)
	const {saveUpdatedUser} = useContext(UserContext);
	const {user,token} = useContext(UserContext);

	useEffect(() => {
		if(user.course){
			history.push("/teacher");
		}
	},[])

	const handleClick = () => {
		setIsSubmitting(true)
		if (files.file) {
			const fData = new FormData();
			fData.append("course_code", files.courseCode);
			fData.append("file_obj", files.file);

			var config = {
				method: "post",
				url: `${process.env.REACT_APP_FASTAPI_URL}/CreateCourse`,
				data: fData,
			};
			setButtonText("Submitting...")
			Axios(config)
				.then((res) => {
					Axios.post(
						`${process.env.REACT_APP_NODE_API_URL}teacher/initiateCourse`,{
							_id:files.courseCode,
							name:files.courseName,
							handout:res.data.url,
							credits: files.credits,
							from:files.timeSpan.start,
							to:files.timeSpan.end
						},
						{
							headers: {
								Authorization: "Bearer " + token,
							},
						}
					)
						.then((res) => {
							localStorage.setItem("user", JSON.stringify(res.data.response));
							saveUpdatedUser({
								user:res.data.response
							})
							history.push("/teacher");
							// console.log(res.data);
							setIsSubmitting(false);
							window.alert(res.data.message);
						})
						.catch((err) => {
							window.alert("Network error");
							setIsSubmitting(false);
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(()=>{
					setButtonText("Create Course")
					setTimeout(() => {
						setIsSubmitting(false)
					}, 1000);
				})
		} else {
			console.log("No formdata");
		}
	};

	return (
		<Wrapper>
			<Group>
				<CreditsSection/>
				<DateSection/>
				<TimeSpanSection/>
			</Group>
			<LazyMotion features={domAnimation}>
				<AnimBtn onClick={handleClick} disabled={(isSubmitting)?true:false}>{buttonText}</AnimBtn>
			</LazyMotion>
		</Wrapper>
	)
}

export default RightSection
