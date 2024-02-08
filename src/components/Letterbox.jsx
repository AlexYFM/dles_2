import React, { useState } from 'react'

// this component will manage each letter box in the main game
// the parent component should use useSelector to get the state and choose the bgColor and letter 
const Letterbox = ({
	letter = '', classNames="", bgColor='bg-white', properties = {}, ...props // props will manage whatever other customizations I want
}) => {

	return (
		//probably also want to change text color based on something else
		<div className={`${bgColor} border w-16 rounded-lg py-4 m-2 text-blue-500 text-center min-w-8 ${classNames} align-middle min-h-8 shadow-md`}
		 {...props}>
			{letter}
		</div>
	)
}

export default Letterbox