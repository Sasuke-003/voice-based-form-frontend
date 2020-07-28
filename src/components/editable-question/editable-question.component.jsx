import React from 'react';

import TextField from '@material-ui/core/TextField';

import './editable-question.styles.css'

const EditableQuestion = ({ data, handleChange }) => {


    return (

        <div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="question"
                label="Question"
                name="Question"
                autoComplete="false"
                autoFocus
                onChange={(event) => handleChange( event, data.id )}
                value={data.Question}
            />
            
        </div>

    );

};

export default EditableQuestion;