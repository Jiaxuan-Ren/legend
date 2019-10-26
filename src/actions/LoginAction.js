import firebase from 'firebase';

export const emailChanged = (text) =>{
    return {
        type : 'email_changed',
        payload : text,
    }
}

export const passwordChanged = (text) => {
    return {
        type : 'password_changed',
        payload : text
    }
}

export const confirmPasswordChanged = (text) => {
    return {
        type : 'confirm_password_changed',
        payload : text
    }
}

export const LoginUser = (email, password) => {
    
    return (dispatch) => {
        dispatch({type : 'login_start'});
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch({type : 'login_success', payload : user});
        }).catch(() => dispatch({type : 'login_failed', payload : 'Authentication Failed. Please try again.'}));
    }
}

export const SwitchLoginForm = (index) => {
    return {
        type : 'switch_form',
        payload : index,
    }
}

export const CreateUser = (email, password, confirm_password) => {
    return (dispatch) => {
        if (password !== confirm_password){
            dispatch({type : 'login_failed', payload : 'Password and Confirmed Password are different.'})
        } else {
            dispatch({type : 'login_start'});
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({type : 'login_success', payload : user})
            }).catch(() => dispatch({type : 'login_failed', payload : 'Sign up failed'}));
        }
    }
}

export const HandleMenu = () => {
    return {
        type : 'handle_menu'
    }
}