import React, { Component } from 'react';

class MyForms extends Component {

    constructor(props) {
        super(props);
        
        this.state ={

            links: []

        }

    }


    componentDidMount() {

        // code for retrieving links from server

    }
    

    render() {

        const { links } = this.state();

        return (
            <div>
                {

                    links.map(( link , index ) => (


                        // code for displaying links


                    ))

                }
                
            </div>
        );
    }
}

export default MyForms;