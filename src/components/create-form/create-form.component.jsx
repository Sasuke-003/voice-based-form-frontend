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

        this.setState({

            qData: this.state.qData.map( ( data ) => {

                if ( data.id !== qId ) return data;
                return { ...data, Answers: this.state.qData.Answers.map( (ans) => ans.id !== aId )}

            })

        })

    }


    handleAnswerChange = ( event, qId, aId ) => {

        const { value } = event.target;
        this.setState({

            qData: this.state.qData.map( ( data ) => {

                if ( data.id !== qId ) return data;
                return { ...data, Answers: this.state.qData.Answers.map( (ans) => {
                    if (ans.id !== aId) return ans;
                    return { ...ans, value: value }
                }) }

            })

        })

    }


    handleEdit = ( id ) => {

        this.setState({

            currentId: id,

        })

    }


    componentDidMount() {

        this.addQuestion();

    }
    

    render() {

        const { qData, currentId } = this.state;

        return (

            <div>
            {
                console.log(this.state)
            }

            {

                qData.map( ( data ) => (

                    <CreateQuestionContainer key={data.id} data={data} currentId={currentId} handleEdit={this.handleEdit} />

                ))

            }
            <MyFloatingButton onClick={this.addQuestion} />
                
            </div>

        );

    }

}

export default CreateForm;