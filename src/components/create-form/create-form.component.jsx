import React, { Component } from 'react';


class CreateForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

            qData  : [],

        }

    }

    addQuestion = () => {

        this.setState({

            qData:   [...this.state.qData, 

                        {

                            Question   : '',
                            AnswerType : '',
                            Answers    : [ ],
                            id   : Date.now(),

                        }

                    ]

        });

    }
    

    render() {

        const { qData } = this.state;

        return (

            <div>

            {

                qData.map( ( data ) => (



                ))

            }
            
                
            </div>

        );

    }

}

export default CreateForm;