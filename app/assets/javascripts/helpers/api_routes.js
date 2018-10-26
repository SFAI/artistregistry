class ApiRoutes {

  get works() {
    return {
      show        : (id) => `/api/locations/${id}`,
      update      : (id) => `/api/locations/${id}`,
      create      : `/api/locations`,
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

  get commissions() {
    return {
      create  : `/api/commissions`
    }
  }

}
const APIRoutes = new ApiRoutes();
