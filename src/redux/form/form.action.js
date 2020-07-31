import { FormActionTypes } from './form.types'

export const setFormData = data => ({
    type: FormActionTypes.SET_FORM_DATA,
    payload: data
});