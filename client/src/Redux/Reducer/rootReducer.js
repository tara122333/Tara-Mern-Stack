import {combineReducers} from 'redux';

import user from './User/user.reducer';
import mail from './Mail/mail.reducer';

const rootReducer = combineReducers({user,mail});

export default rootReducer;