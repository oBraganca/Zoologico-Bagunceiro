const AUTHENTICATED = 'AUTHENTICATED'
const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED' 
interface ROOT_INITIAL_STATE{
    authChecked: false,
    loggedIn: false,
    currentUser: {}
};
export {AUTHENTICATED, NOT_AUTHENTICATED}
