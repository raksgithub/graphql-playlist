import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = props => {
    const {
        show,
        size,
        centered = true,
        title = 'Default Title',
        isCloseButton = true,
        body = 'Do you want to delete it ?',
        deleteButtonDisplayText = 'Delete',
        closeButtonDisplayText = 'Close',
        handleDelete,
        handleClose
    } = props;
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered={centered}
        >
            <Modal.Header closeButton={isCloseButton}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    {closeButtonDisplayText}
                </Button>
                <Button
                    variant="danger"
                    onClick={handleDelete}
                >
                    {deleteButtonDisplayText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
