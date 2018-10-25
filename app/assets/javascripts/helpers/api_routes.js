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
      allArtists  : `api/artists`
    }
  }

  get commissions() {
    return {
      create  : `/commissions/create/`
    }
  }

}
const APIRoutes = new ApiRoutes();
