import http from "../../http-common";

const getUserById=(id) =>{
    return http.get(`/users/${id}`);

}
const UserService={
    getUserById

}
export default UserService;