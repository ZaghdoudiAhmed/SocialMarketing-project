import http from "../../http-common";
const createAddress=(data)=>{
    return http.post('/user/address/create',data)
}
const retreiveAddressById= (id) =>{
    return http.get(`/user/address/get/${id}`)
}

const AddressService={
    createAddress,
    retreiveAddressById
}
export default AddressService;