import React from 'react'

// this component will manage each letter box in the main game
// the parent component should use useSelector to get the state and choose the bgColor and letter 
const Letterbox = ({
	letter = ' ', bgColor='gray-400', classNames="", ...props // props will manage whatever other customizations I want
}) => {

	return (
		//probably also want to change text color based on something else
		<div className={`bg-${bgColor} border shadow-sm w-16 h-1/6 rounded-lg py-4 mx-1 text-blue-500 text-center min-w-8 ${classNames}`}
		{...props}>
			{letter}
		</div>
	)
}

export default Letterbox