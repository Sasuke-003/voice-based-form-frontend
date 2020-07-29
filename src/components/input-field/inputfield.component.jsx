import React from 'react';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import './inputfield.styles.css'


const theme = createMuiTheme({

    typography: {

        

       }

});


class  InputField extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {

        if  (nextProps.value === this.props.value ){

            return false

        }

        return true

    }

    render(){

        const { value, ...otherProps } = this.props;

        return (

            <ThemeProvider theme={theme}>

                <div className='text-field'>

                {
                    console.log("yo")
                }
                        
                    <TextField autoComplete={'off'} value={value} {...otherProps}  />
                            
                </div>

            </ThemeProvider>

        );

    }

}


export default InputField;