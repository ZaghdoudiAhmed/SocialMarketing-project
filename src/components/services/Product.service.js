import http from "../../http-common";


    const getAllProducts =()=>{
        return http.get('/products');
    };
    const  createProduct = ( data )=>{
        return http.post('/products',data)

    }
    const getProductById = (id) =>{
        return http.get(`/products/${id}`);

    }
    const deleteProductByID=(id)=>{
        return http.delete(`/products/${id}`);
    }

    const updateProduct=(id,data)=>{
        console.log(data);
        return http.put(`/products/${id}` , data);
    }
    const getProductsByFilter=(data)=>{
        return http.get(`/product/search/${data}`)
    }
    const ProductService={
        getAllProducts,
        createProduct,
        getProductById,
        deleteProductByID,
        updateProduct,
        getProductsByFilter
    };
export default ProductService;
