import React, { useContext, useState } from "react";
import styled from "styled-components";
import TeacherDashboardContent from "../TeacherDashboardContent";
import Plagiarism from "../Plagiarism";
import Keywords from "../Keywords";
import Upload from "../Upload";
import Meet from "../Meet";
// import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from "@material-ui/icons/Notifications";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import { Switch, Route, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import UserContext from "../../../contexts/User/UserContext";
import Overview from "@components/Teacher/Overview";

const Wrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	height: 100vh;
	width: 100vw;
	background: white;
	font-size: 0.75rem !important;
	color: #A4B4CB;
	border-radius: 0.5rem;
	overflow:hidden;
	@media (max-width: 1224px){
		height: 100vh;
		width: 100vw;
		border-radius: 0;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background: var(--app-background);

	.title {
		flex:1;
		display: flex;
		align-items:center;
		justify-content:center;
		border-bottom: 1px solid #2e2e2e;
		border-right: 1px solid #2e2e2e;
		h4{
			font-weight: 900;
		}
		@media (max-width: 1224px){
			border-right: none;
		}
	}

	.navbar {
		flex: 4;
		display: flex;
		align-items:center;
		justify-content:space-between;
		border-bottom: 1px solid #2e2e2e;
	}

	.sidepanel {
		flex: 1;
		display: flex;
		align-items:center;
		justify-content:flex-start;
		flex-direction: column;
		flex-wrap: wrap;
		position:relative;
		background:var(--app-background);
		border-right: 1px solid #2e2e2e;
		transition: all 0.2s ease-in-out;
		.active{
			color: #4d8fd9;
			background: var(--app-modal-btn-primary);
		}
		@media (max-width: 1224px){
			position: absolute;
			flex-wrap:nowrap;
			left:0;
			background: #252736;
			height:100%;
			min-width:50%;
			box-shadow:  0px 20px 10px #b4b8c794;
		}
	}

	.content {
		flex:4;
		height: 100%;
	}

	.closed{
		// display:none;
		left:-500px;
		box-shadow:  none;
	}
`;

// const StyledInput = styled.input`
// 	position: relative;
// 	font-size:1rem;
// 	box-sizing: border-box;
// 	display: block;
// 	width: 100%;
// 	border: none;
// 	padding: 1rem;
// 	background: transparent;
// 	border-radius: 10px;
// 	&::placeholder{
// 		color: #c3c3c3;
// 	}
// 	&:hover{
// 		border: none;
// 		outline: none;
// 	}
// 	&:focus{
// 		border: none;
// 		outline: none;
// 	}
// `

// const SearchGroup = styled.div`
// 	display:flex;
// 	align-items:center;
// 	justify-content:center;
// 	width: 60%;
// 	margin-left: 1.5rem;
// 	@media only screen and (max-width: 1000px) {
// 		width: 40%;
// 	}
// `

// const StyledSearchIcon = styled(SearchIcon)`
// 	color:#c3c3c3;
// 	font-size: 1.5rem !important;
// `

const IconGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledNotifIcon = styled(NotificationsIcon)`
	color: #c3c3c3;
	font-size: 1.5rem !important;
	cursor: pointer;
	transition: color 0.2s ease;
	&:hover {
		color: gray;
	}
	&:focus {
		color: gray;
	}
`;

const StyledCalenderIcon = styled(CalendarTodayIcon)`
	color: #c3c3c3;
	font-size: 1.5rem !important;
	cursor: pointer;
	transition: color 0.2s ease;
	&:hover {
		color: gray;
	}
	&:focus {
		color: gray;
	}
`;

const StyledMovieCreationIcon = styled(MovieCreationIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledNotificationIcon = styled(NotificationsIcon)`
margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledBadge = styled(Badge)`
	margin: 0;
`;

const DropDown = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	color: #c3c3c3;
`;

const DropDownText = styled.h2`
	color: #c3c3c3;
	font-size: 1.25rem;
	font-weight: 900;
`;

const StyledExpandIcon = styled(ExpandMoreIcon)`
	font-size: 2rem !important;
	cursor: pointer;
`;

const RightSide = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: auto;
	padding: 0.5rem 0;
`;

const TopContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	overflow: hidden;
	height: 100%;
`;

const DropDownGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 0.75rem;
`;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	// eslint-disable-next-line
	<>
	<DropDown
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}>
		{children}
	</DropDown>
	</>
));

const SidePanelMember = styled(NavLink)`
	display: flex;
	align-items: center;
	width: 90%;
	background: transparent;
	border-radius: 5px;
	margin: 1rem;
	padding: 0.5rem;
	text-transform: capitalize;
	font-weight:bold;
	font-size: 1rem;
	color:#A4B4CB;
	transition: all 0.2s ease;
	&:hover{
		cursor:pointer;
		color: #0A68D3;
		background: #0d1729;
		text-decoration:none;
	}
	@media (max-width: 1224px){
		margin:1rem 2rem;
	}
`

const StyledKeyboardIcon = styled(KeyboardIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledSortByAlphaIcon = styled(SortByAlphaIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledQuestionAnswerIcon = styled(QuestionAnswerIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledDashboardIcon = styled(DashboardIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const StyledUploadIcon = styled(CloudUploadIcon)`
	margin: 0 1rem;
	@media (max-width: 1224px) {
		margin: 0 0.5rem;
	}
`;

const TeacherDashboard = (props) => {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
	// eslint-disable-next-line
	const { logout, user } = useContext(UserContext);
	const { name } = user;
	return (
		<Wrapper>
			<Container>
				<TopContainer>
					<div className="title">
						{isTabletOrMobile ? (
							<MenuIcon
								onClick={() =>
									setIsSidepanelOpen(!isSidepanelOpen)
								}
							/>
						) : (
							<h4>Teacher</h4>
						)}
					</div>
					<div className="navbar">
						<RightSide>
							<IconGroup>
								<Dropdown>
									<DropDownGroup>
										<Dropdown.Toggle
											as={CustomToggle}
											id="dropdown-custom-components">
											<StyledBadge variant="dot" color="secondary">
												<StyledNotifIcon />
											</StyledBadge>
										</Dropdown.Toggle>
									</DropDownGroup>
									<Dropdown.Menu variant="dark">
										<Dropdown.Item eventKey="1">
											Earned 6 points for attending all the classes
										</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item eventKey="2">
											Epic 2
										</Dropdown.Item>
										{/* use this to add hr between elements btw*/}
										<Dropdown.Divider />
										<Dropdown.Item>
											Epic 3
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</IconGroup>
							<Dropdown>
								<DropDownGroup>
									<DropDownText>{name}</DropDownText>
									<Dropdown.Toggle
										as={CustomToggle}
										id="dropdown-custom-components">
										<StyledExpandIcon />
									</Dropdown.Toggle>
								</DropDownGroup>
								<Dropdown.Menu variant="dark">
									<Dropdown.Item eventKey="1">
										Email
									</Dropdown.Item>
									<Dropdown.Item eventKey="2">
										Phone
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										eventKey="4"
										onClick={logout}>
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</RightSide>
					</div>
				</TopContainer>
				<BottomContainer>
					<div
						className={
							isTabletOrMobile
								? `sidepanel ${
										!isSidepanelOpen ? `closed` : ``
								  }`
								: `sidepanel`
						}>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/teacher/overview">
							<StyledQuestionAnswerIcon />
							Overview
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/teacher">
							<StyledDashboardIcon />
							dashboard
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/teacher/plagiarism">
							<StyledKeyboardIcon />
							plagiarism
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/teacher/keywords">
							<StyledSortByAlphaIcon />
							keywords
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/teacher/upload">
							<StyledUploadIcon />
							Upload
						</SidePanelMember>
						<SidePanelMember
							exact
							activeClassName="active"
							to="/teacher/meet">
							<StyledMovieCreationIcon />
							Meet
						</SidePanelMember>
					</div>
					<div className="content">
						<Switch>
							<Route path="/teacher/overview">
								<Overview />
							</Route>
							<Route path="/teacher/keywords">
								<Keywords />
							</Route>
							<Route path="/teacher/plagiarism/:link?">
								<Plagiarism />
							</Route>
							<Route path="/teacher/upload">
								<Upload />
							</Route>
							<Route path="/teacher/meet">
								<Meet />
							</Route>
							<Route path="/teacher/">
								<TeacherDashboardContent history={props.history}/>
							</Route>
						</Switch>
					</div>
				</BottomContainer>
			</Container>
		</Wrapper>
	);
};

export default TeacherDashboard;
