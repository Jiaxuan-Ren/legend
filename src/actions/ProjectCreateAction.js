export const UpdateInfo = (prop, text) => {
    return {
        type : 'update_info',
        payload : {prop, text}
    }
}