const INITIAL_STATE = {name : "", description : "", data : ""};

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state;
        case "update_info":
            return {...state, [action.payload.prop] : action.payload.value};
    }
}