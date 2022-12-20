import * as React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AddTask = ({title, content, onTitleChange, onContentChange, onFileChange, onSubmitTask}) => {

    return(
        <Card style={{background: "lightgray"}}>
            <Card.Header style={{background: "white"}}>Nouvelle Requête</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Titre"
                            value={title}
                            onChange={onTitleChange}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Contenu"
                            value={content}
                            onChange={onContentChange}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="file" 
                            onChange={onFileChange}
                            size="sm"
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={onSubmitTask}
                    >
                        Envoyer
                    </Button>    
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AddTask;
