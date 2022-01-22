import React,{useEffect, useState} from "react"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import AssignmentCard from "./AssignmentCard";
import ModalBodyStudent from "./ModalBodyStudent";
import { useContext } from "react";
import UserContext from "@contexts/User/UserContext";

const ModalTeacher = ({openModal,toggleModal,info,assignmentsSubmitted}) => {
    const {user} = useContext(UserContext);
    console.log(user,"user");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        toggleModal();
        setShow(false);
    }
    console.log("open");
    
    useEffect(() => {
        if(openModal) {
            setShow(true);
        }
    },[openModal])

    console.log(assignmentsSubmitted,"modalll");
    
    return (

        <Modal show={show} onHide={handleClose} scrollable>
            {
                user.type === "teacher"?  (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title md="auto">Assignments by students</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AssignmentCard assignments={assignmentsSubmitted} students={true} modal={true}/>
                            </Modal.Body>
                        </>
                ) : (
						<>
							<Modal.Header closeButton>
								<Modal.Title md="auto">Upload Assignment</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<ModalBodyStudent {...info}/>
							</Modal.Body>
						</>
                )
            }
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default ModalTeacher;