export const getUser = (state) => {

    if (state.repository && state.repository.user && state.repository.user.value){
        return state.repository.user;
    }

    return null;//localized, epta!

};