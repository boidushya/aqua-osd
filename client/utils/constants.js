import Axios from "axios";

let blankClassroom=[];

Axios.get("https://obsidian-backend.herokuapp.com/student/allStudents")
	.then((res) => {
		res.data.response.map((student) => (
			blankClassroom.push(
				{
					name: student.name,
					participantId: false,
					isHandRaised: false,
					isCalledOn: false
				}
			)
		))
	})

export { blankClassroom };