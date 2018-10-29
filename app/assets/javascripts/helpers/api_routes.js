class ApiRoutes {

  get works() {
    return {
      show        : (id) => `/api/works/${id}`,
      update      : (id) => `/api/works/${id}`,
      create      : `/api/works/`,
      delete      : (id) => `/api/works/destroy/${id}`
    }
  }

  get artists() {
    return {
      show        : (id) => `/api/artists/${id}`,
      update      : (id) => `/api/artists/${id}`,
      delete      : (id) => `/api/artists/destroy/${id}`,
      works       : (id) => `/api/artists/works/${id}`,
      allArtists  : `api/artists`,
      requests    : (id) => `/api/artists/requests/${id}`
    }
  }

  get requests() {
    return {
      show        : (id) => `/api/requests/${id}`,
      update      : (id) => `/api/requests/${id}`,
      create      : (id) => `/api/requests/${id}`
    }
  }

}
const APIRoutes = new ApiRoutes();
