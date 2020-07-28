import React, { Component } from 'react';


import ViewQuestion from '../view-question/view-question.component';
import EditableQuestion from '../editable-question/editable-question.component';


import './create-question-container.styles.css'


class CreateQuestionContainer extends Component {


    render() {

        const { data, currentId, handleEdit, handleChange , addAnswer, deleteAnswer, handleAnswerChange } = this.props;

        return (

            <div onClick={() => handleEdit( data.id )} >

                {

                    currentId === data.id ?

                    <EditableQuestion data={data} handleChange={ handleChange } addAnswer={addAnswer} 
                    deleteAnswer={deleteAnswer} handleAnswerChange={handleAnswerChange} />

                    :

                    <ViewQuestion  data={data} />

                }

            </div>

        );

    }

}

export default CreateQuestionContainer;