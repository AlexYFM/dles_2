import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';


const Popup = ({win = false, handleClose, ...props}) => {
	const numGuesses = useSelector(state => state.numGuesses)
	const answer = useSelector(state => state.word)

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
		  onHide={handleClose}
		  className='text-center'
        >
			<Modal.Body>
				{win ? <h1>{`You won in ${numGuesses}`} guesses!</h1> : (<div><h1>You lost.</h1><h1>The correct word was {`${answer}`}</h1></div>)}
			</Modal.Body>
			<Modal.Footer className='justify-center'>
				<Button onClick={handleClose} className='text-black'>Close</Button>
			</Modal.Footer>
        </Modal>
      );
}

export default Popup