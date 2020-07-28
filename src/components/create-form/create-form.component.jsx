import React, { Component } from 'react';


import MyFloatingButton from '../my-floating-button/my-floating-button';
import CreateQuestionContainer from '../create-question-container/create-question-container.component'

class CreateForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

            qData     : [],
            currentId : '',

        }

    }

    addQuestion = () => {

        this.setState({

            qData:   [...this.state.qData, 

                        {

                            Question   : '',
                            AnswerType : '',
                            Answers    : [ ],
                            id         : Date.now(),

                        }

                    ],

        }, () => {

            this.setState({
                currentId: this.state.qData.lastItem.id,
            })

        });

        

    }

    handleEdit = ( id ) => {

        this.setState({

            currentId: id,

        })

    }
    

    render() {

        const { qData, currentId } = this.state;

        return (

            <div>

            {

                qData.map( ( data ) => (

                    <CreateQuestionContainer qData={qData} currentId={currentId} handleEdit={this.handleEdit} />

                ))

            }
            <MyFloatingButton onClick={this.addItem} />
                
            </div>

        );

    }

}

export default CreateForm;