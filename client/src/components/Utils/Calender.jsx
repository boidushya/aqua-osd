import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from "styled-components";

const  CalenderContainer = styled.div`
	position:absolute;
	z-index:2;
`

const Calender = () => {
	const [value, onChange] = useState(new Date());

	return (
		<CalenderContainer>
			<Calendar
				onChange={onChange}
				value={value}
			/>
		</CalenderContainer>
	);
}

export default Calender;