import React,{useState} from 'react'
import styled from "styled-components";
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ModalTeacher from './ModalTeacher.jsx';
import Cards from "./Cards"

const Content = styled.div`
	color: lightgray;
`

const Description = styled.div`
	display:flex;
	align-items:center;
	border-radius: ${props => !props.noBorderRadius?`10px 10px 0 0`:`none`};
	overflow: hidden;
	${(props) => {
		if (props.theme === "primary") {
			return `
				color: #F4AA1F !important;
				background: #FFF3E8 !important;
			`;
		}
		else {
			return `
				color: #65D862;
				background: #EEFFED;
			`;
		}
	}}
	padding: 0 1rem;
`

const AssignedBy = styled.div`
	display:flex;
	align-items:center;
	border-radius: 0 0 10px 10px;
	color: #249BD4;
	background: #DEF7FF;
	padding: 0 1rem;
`

const AssignedByText = styled.p`
	margin: 1rem 0;
	font-weight: normal;
	padding:0 1rem;
	transition: all 0.2s ease;
`

const DescriptionText = styled.a`
	cursor: pointer;
	text-decoration: ${props=>!props.notUnderlined?`underline`:`none`};
	margin: 1rem 0;
	padding:0 1rem;
	transition: all 0.2s ease;
	color:inherit !important;
	&:hover{
		${(props) => {
		if (props.theme === "primary") {
			return `
				color: #DF9B1C !important;;
			`;
		}
		else {
			return `
				color: #51AF4F !important;
			`;
		}
	}}
	}
`

const AssignmentCard = ({assignments,students,modal}) => {
	const [showModal, setShowModal] = useState(false);
	const [showItem, setShowItem] = useState(false);
	const [assignmentsSubmitted,setAssignmentsSubmitted] = useState([]);

    const toggleModal = () => {
        setShowModal(false);
    }

    const onClickHandler = (item) => {
		console.log(item,"clicked");
        //Ensuring that card in modal isnt clickable
		setAssignmentsSubmitted(item.assignmentsSubmitted);
        if(!modal){
            setShowModal(true);
			setShowItem(item);
        }
    }

	console.log(modal,"modal");

	return (
		<>
			{assignments.map((item, index) => {
				return (
					<>
					<Cards
						students={students}
						modal={modal}
						key={index}
						item={item}
						onClick ={()=>{
							onClickHandler(item)
						}}
					/>
					</>
				)})}

            {showModal ? <ModalTeacher assignmentsSubmitted={assignmentsSubmitted} toggleModal={toggleModal} openModal={showModal} info={showItem} /> : null}
		</>
	)
}


export default AssignmentCard;