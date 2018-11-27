class ApiRoutes {
  get works() {
    return {
      index: `/api/works`,
      create: `/api/works`,
      show: (id) => `/api/works/${id}`,
      update: (id) => `/api/works/${id}`,
      delete: (id) => `/api/works/${id}`,
      filtered_works: (search_params) => `/api/works/filtered_works/${search_params}`,
      categories: `/works/categories`,
      thumbnail: (id) => `api/works/thumbnail/${id}`
    }
  }

  get artists() {
    return {
      index       : `/api/artists`,
      show        : (id) => `/api/artists/${id}`,
      update      : (id) => `/api/artists/${id}`,
      delete      : (id) => `/api/artists/destroy/${id}`,
      works       : (id) => `/api/artists/works/${id}`,
      requests    : (id) => `/api/artists/requests/${id}`,
    }
  }

  get buyers() {
    return {
      index       : `/api/buyers`,
      show        : (id) => `/api/buyers/${id}`,
      update      : (id) => `/api/buyers/${id}`,
      requests    : (id) => `/api/buyers/requests/${id}`,
    };
  }

  get requests() {
    return {
      show: (id) => `/api/requests/${id}`,
      update: (id) => `/api/requests/${id}`,
      create: `/api/requests`,
      types: '/requests/types'
    }
  }

  get commissions() {
    return {
      create: `/api/commissions`,
      types: `/commissions/types`
    }
  }

  get receipts() {
    return {
      create: `/api/receipts`,
      show: (id) => `/api/receipts/${id}`,
      types: `/receipts/types`,
      artist: (id) => `/api/receipts/artist/${id}`
    }
  }

}
const APIRoutes = new ApiRoutes();
