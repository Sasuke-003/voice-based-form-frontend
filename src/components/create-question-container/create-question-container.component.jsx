import React, { Component } from "react";


import EditableQuestion from '../editable-question/editable-question.component'
import ViewQuestion from '../view-question/view-question.component'
import "./create-question-container.styles.css";


class CreateQuestionContainer extends Component {

  render() {

    const { no, data, currentId, handleEdit, handleChange, addAnswer, deleteAnswer, handleAnswerChange, deleteQuestion } = this.props;

    return (
     
        <div onClick={() => handleEdit(data.id)}>

          {
            
            currentId === data.id ? 

              <EditableQuestion 
                no={no} 
                data={data}
                handleChange={handleChange} 
                addAnswer={addAnswer} 
                deleteAnswer={deleteAnswer} 
                handleAnswerChange={handleAnswerChange}
                deleteQuestion={deleteQuestion}
              />

           : 

            <ViewQuestion data={data} deleteAnswer no={no} />
          
          }

        </div> 

    );

  }

}

export default CreateQuestionContainer;
