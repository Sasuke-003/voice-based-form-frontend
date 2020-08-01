import React, { Component } from 'react';
import './info-display.styles.css'

class InfoDisplay extends Component {
    render() {
        return (
            <div align='left' className='info' >
            CREATE FORM COMMANDS : <br /><br />
            -------------------------------------------------<br /><br />
            
            add Question           - adds one question to the form.<br /><br />
            
            add num Question       - adds num questions to the form.( Here num is an integer )   <br /><br />
            
            focus num              - makes Question num as editable.( Here num is an integer )<br /><br />
            
            set title str          - sets the title of the form.( Here str is the title of the form ) <br /><br />
            
            set description str    - sets the description of the form.( Here str is the description of the form ) <br /><br />
            
            add option             - adds option to the editable question.<br /><br />
            
            add num option/options - adds num options to the editable question.( Here num is an integer )<br /><br />
            
            select option multiple choice/check box/drop down/text field - selects the answer typr for the editable question<br /><br />
            
            set question str        - sets the question field in the editable question.( Here str is the question that has to be asked )<br /><br />
            
            set option num as str   - sets the num th option as str in the editable question.( Here num is integer and str is the option string )<br /><br />
            
            remove question         - deletes the current editable question.( if you want to delete the i th queestion you must first say 'focus i' and then 'remove question' )<br /><br />
            
            remove option num       - deletes the num th option in editable queestion.( Here num is an integer )<br /><br />
            
            submit form             - submits the form<br /><br />
            
            NOTE: IF ANY OF THE ABOVE LISTED COMMANDS IS NOT RECOGNIZED THEN THE APP WOULD SAY WRONG COMMAND..<br /><br />
            
            
            SUBMIT FORM COMMANDS:<br /><br />
            ----------------------------------------------------<br /><br />
            
            focus num     	 - makes Question num as editable.( the mic speechh will only set if the question is focused )<br />
            
            submit form      - submits the form<br /><br />
            
            NOTE: ANY OTHER SPEECH INPUT WILL BE CHECKED IN THE OPTIONS OF THE FOCUSED QUESTION. IF PRESENT IT WILL BE SELECTED<br /><br />
                  FOR TEXT FIELDS THE SPEECH INPUT WILL BE TAKEN AS TEXT VALUE<br /><br />
                  IN CHECK BOX FOR THE OPTION TO BE UNSELECTED SIMPLY SAY THE OPTION AGAIN TO UNSELECT	<br /><br />
            </div>
        );
    }
}

export default InfoDisplay;