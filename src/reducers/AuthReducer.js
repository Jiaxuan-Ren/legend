const INITIAL_STATE = {email : "", password : "", confirm_password : "", loginMessage : "", user : null, login : false, form_id : 0};

export default (state=INITIAL_STATE, action) => {
    
    switch(action.type){
        default:
            return state;
        case "email_changed":
            return {...state, email : action.payload};
        case "password_changed":
            return {...state, password : action.payload};
        case "confirm_password_changed":
            return {...state, confirm_password : action.payload};
        case "login_success" :
            return {...state, user : action.payload, loginMessage : "Login Success", login : false};
        case "login_failed" :
            return {...state, loginMessage : action.payload, password : "", login : false};
        case "login_start" :
            return {...state, login : true, loginMessage : "", };
        case "switch_form" :
            return {...state, form_id : action.payload, };
    }
}