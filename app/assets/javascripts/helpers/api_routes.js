class ApiRoutes {
  get works() {
    return {

      index: `/api/works`,
      create: `/api/works`,
      show: (id) => `/api/works/${id}`,
      update: (id) => `/api/works/${id}`,
      delete: (id) => `/api/works/destroy/${id}`,
      filtered_works: (search_params) => `/api/works/filtered_works/${search_params}`,
      categories: `/works/categories`
    }
  }

  get artists() {
    return {
      index: `/api/artists`,
      show: id => `/api/artists/${id}`,
      update: id => `/api/artists/${id}`,
      delete: id => `/api/artists/${id}`,
      works: id => `/api/artists/works/${id}`,
      requests: id => `/api/artists/requests/${id}`
    };
  }

  get requests() {
    return {
      show: (id) => `/api/requests/${id}`,
      update: (id) => `/api/requests/${id}`,
      create: (id) => `/api/requests/${id}`
    }
  }

  get commissions() {
    return {
      create: `/api/commissions`
    }
  }

}
const APIRoutes = new ApiRoutes();
