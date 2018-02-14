export const getUser = (state) => {

    if (state.repository && state.repository.user){
        return state.repository.user;
    }

    return {};

};