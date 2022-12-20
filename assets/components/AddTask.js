import * as React from 'react';

const AddTask = ({title, content, onTitleChange, onContentChange, onFileChange, onSubmitTask}) => {

    return(
        <div>
            <h2>Nouvelle Requête</h2>
            <input 
                type="Text"
                placeholder="Titre"
                value={title}
                onChange={onTitleChange}
            />
            <input 
                type="Text"
                placeholder="Contenu"
                value={content}
                onChange={onContentChange}
            />
            <input 
                type="file"
                onChange={onFileChange}
            />
            <button onClick={onSubmitTask}>
                <span>Submit</span>
            </button> 
        </div>
    );
}

export default AddTask;