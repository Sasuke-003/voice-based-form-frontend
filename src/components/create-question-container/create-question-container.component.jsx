import React, { Component } from 'react';


import ViewQuestion from '../view-question/view-question.component';
import EditableQuestion from '../editable-question/editable-question.component';


import './create-question-container.styles.css'


class CreateQuestionContainer extends Component {


    render() {

        const { qData, currentId, handleEdit } = this.props;

        return (

            <div onClick={() => handleEdit( qData.id )} >

                {

                    currentId === qData.id ?

                    <EditableQuestion qData={qData} />

                    :

                    <ViewQuestion  qData={qData} />

                }

            </div>

        );

    }

}

export default CreateQuestionContainer;