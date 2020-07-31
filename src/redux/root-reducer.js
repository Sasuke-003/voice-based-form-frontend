import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import formReducer from './form/form.reducer'
import { persistReducer } from 'redux-persist';
import  storage  from 'redux-persist/lib/storage';        


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'form']
}

const rootReducer = combineReducers({
    user: userReducer,
    form: formReducer

});


export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;
