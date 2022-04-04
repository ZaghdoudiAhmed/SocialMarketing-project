import http from "../../http-common";

const createPayment = (data)=>{
    return http.post('/payment',data)

}

const PaymentService={
    createPayment
};
export default PaymentService;