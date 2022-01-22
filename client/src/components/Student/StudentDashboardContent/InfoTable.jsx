import React,{useContext,useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import Axios from "axios";
import UserContext from '@contexts/User/UserContext';

export default function InfoTable() {
	
	const { token,user } = useContext(UserContext);
	const [rows,setRows] = useState([]);

	const columns = [
		{
			id: 'name',
			label: 'Name',
			minWidth: 170
		},
		{
			id: 'time',
			label: 'Date Submitted',
			minWidth: 100
		},
		{
			id: 'assignment',
			label: 'Assignment',
			minWidth: 170,
		},
		{
			id:"marks",
			label:"Marks",
			minWidth:170
		}
	];

	function createData(name,time,assignment,marks) {
		return {
			name,
			time,
			assignment: <a href={assignment}><span style={{color:"red"}}>Assignment</span></a>,
			marks
		};
	}

	const apiUrl = process.env.REACT_APP_FASTAPI_URL;
	
	console.log(user,"user");

	useEffect(() => {
		Axios.post(`${apiUrl}/assignment/keyword`, {
			course_code:user.course,
			assignment_id:"1",
			keywords: ["how", "are", "you"]
		}).then((res) => {
			for(let i=0;i<res.data.length;i++){
				for(let j=0;j<user.assignments.length;j++){
					for(let k=0;k<user?.assignments[j]?.assignmentsSubmitted?.length;k++){
						if(user.assignments[j].assignmentId === "1"){
							console.log(res.data[i].name,user.assignments[j].assignmentsSubmitted[k].givenBy);
							if(res.data[i].name === user.assignments[j].assignmentsSubmitted[k].givenBy.toString()){
								setRows([...rows,createData(res.data[i].name,user.assignments[j].assignmentsSubmitted[k].dateSubmitted,
								user.assignments[j].assignmentsSubmitted[k].assignment,res.data[i].present)]);
							}	
						}
					}
				}
			}
		})	
	},[])

	const theme = createMuiTheme({
		typography:{
			"fontFamily": `"DM Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
			"fontSize":20,
		},
		palette: {
			type: 'dark',
			background: {
				default: '#08050d',
				paper: '#08050d',
			},
			divider: '#979DAC',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Paper style={{width: "100%",paddingRight:"1rem"}}>
			<TableContainer style={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
					{columns.map((column) => (
						<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						>
						<b>{column.label}</b>
						</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.length !== 0 ? rows.map((row) => {
						return (
						<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
							{columns.map((column) => {
							const value = row[column.id];
							return (
								<TableCell key={column.id} align={column.align}>
								{column.format && typeof value === 'number'
									? column.format(value)
									: value}
								</TableCell>
							);
							})}
						</TableRow>
						);
					}) : <> </>}
				</TableBody>
				</Table>
			</TableContainer>
			</Paper>
		</ThemeProvider>
	);
}
