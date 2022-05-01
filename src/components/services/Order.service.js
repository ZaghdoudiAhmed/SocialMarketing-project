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

const OrderService={
    createOrder,
    getOrder,
    getOrderById
}

export default OrderService;