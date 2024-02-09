import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const Popup = ({win = false, handleClose, ...props}) => {
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
				Test 2
			</Modal.Body>
			<Modal.Footer className='justify-center'>
				<Button onClick={handleClose} className='text-black'>Close</Button>
			</Modal.Footer>
        </Modal>
      );
}

export default Popup