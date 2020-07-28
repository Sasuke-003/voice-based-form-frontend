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
                currentId: this.state.qData[this.state.qData.length - 1].id,
            });

        });

        

    }

    deleteQuestion = ( id ) => {

        this.setState( { qData: this.state.qData.filter( ( data ) => data.id !== id ), },
        () => {

            this.setState({
                currentId: this.state.qData[this.state.qData.length - 1].id,
            });

        } );

    }


    handleChange = ( event, id ) => {

        const { value, name } = event.target;
        this.setState({

            qData: this.state.qData.map( ( data ) => {

                if ( data.id !== id ) return data;
                return { ...data, [name]: value }

            })

        });
  
    }

    addAnswer = ( id ) => {


        const elementsIndex = this.state.qData.findIndex(element => element.id === id )

        let newArray = [...this.state.qData ]

        newArray[elementsIndex].Answers.push({
            value : '',
            id    : Date.now(), 

        })

        this.setState({

            qData: newArray,

        })


    }

    deleteAnswer = ( qId, aId ) => {

        const elementsIndex = this.state.qData.findIndex(element => element.id === qId )
        let newArray = [...this.state.qData ]

        const answerIndex = newArray[elementsIndex].Answers.findIndex(element => element.id === aId)

        newArray[elementsIndex].Answers.splice(answerIndex, 1);

        this.setState({

            qData: newArray,

        })

    }


    handleAnswerChange = ( event, qId, aId ) => {

        const { value } = event.target;

        
        const elementsIndex = this.state.qData.findIndex(element => element.id === qId )
        let newArray = [...this.state.qData ]

        const answerIndex = newArray[elementsIndex].Answers.findIndex(element => element.id === aId)

        newArray[elementsIndex].Answers[answerIndex].value = value;


        this.setState({

            qData: newArray,

        })



    }


    handleEdit = ( id ) => {

        if (this.state.id !== id){

            this.setState({

                currentId: id,

            });
        }

    }


    componentDidMount() {

        this.addQuestion();

    }
    

    render() {

        const { qData, currentId } = this.state;

        return (

            <div>

            {

                qData.map( ( data ) => (

                    <CreateQuestionContainer key={data.id} data={data} currentId={currentId} handleEdit={this.handleEdit} 
                    handleChange={this.handleChange} addAnswer={this.addAnswer} deleteAnswer={this.deleteAnswer} handleAnswerChange={this.handleAnswerChange}
                    />

                ))

            }
            <MyFloatingButton onClick={this.addQuestion} />
                
            </div>

        );

    }

}

export default CreateForm;