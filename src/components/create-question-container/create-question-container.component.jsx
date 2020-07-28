import React, { Component } from 'react';


import ViewQuestion from '../view-question/view-question.component';
import EditableQuestion from '../editable-question/editable-question.component';


import './create-question-container.styles.css'


class CreateQuestionContainer extends Component {


    render() {

        const { data, currentId, handleEdit, handleChange } = this.props;

        return (

            <div onClick={() => handleEdit( data.id )} >

                {

                    true ?

                    <EditableQuestion data={data} handleChange={ handleChange } />

                    :

                    <ViewQuestion  data={data} />

                }

            </div>

        );

    }

}

export default CreateQuestionContainer;