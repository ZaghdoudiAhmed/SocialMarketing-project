import http from "../../http-common";

const getCategories=()=>{
    return http.get('/category')
}

const CategoryService={
    getCategories
}

export default CategoryService;