import http from "../../http-common";

const createOrder=(data)=>{
    return http.post('/user/order/create',data)
}

const getOrder=()=>{
    return http.get('/user/order/get');
}

const getOrderById=(id)=>{
    return http.get(`/user/order/getByid/${id}`);
}

const getOrderByUser=(name)=>{
    return http.get(`/user/order/getByUser/${name}`);
}
const editOrder=(id,data)=>{
    return http.put(`/user/order/update/${id}`,data);
}
const OrderService={
    createOrder,
    getOrder,
    getOrderById,
    getOrderByUser,
    editOrder
}

export default OrderService;