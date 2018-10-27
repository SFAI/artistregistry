class ApiRoutes {
  get works() {
    return {
      show        : (id) => `/api/works/${id}`,
      update      : (id) => `/api/works/${id}`,
      create      : `/api/works`,
      delete      : (id) => `/api/works/destroy/${id}`,
      index       : `/api/works/index`,
      filtered_works: (search_params) => `/api/works/filtered_works/${search_params}`,
      categories: `/works/categories`
    }
  }

  get artists() {
    return {
      show: id => `/api/artists/${id}`,
      update: id => `/api/artists/${id}`,
      delete: id => `/api/artists/${id}`,
      works: id => `/api/artists/works/${id}`
    };
  }
}
const APIRoutes = new ApiRoutes();
