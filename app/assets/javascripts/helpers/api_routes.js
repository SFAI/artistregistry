class ApiRoutes {

  get works() {
    return {
      show: (id) => `/api/locations/${id}`,
      update   : (id) => `/api/locations/${id}`,
      create   : `/api/locations`,
      delete   : (id) => `/api/works/${id}`
    }
  }

  get artists() {
    return {
      show: (id) => `/api/artists/${id}`,
      update   : (id) => `/api/artists/${id}`,
      delete   : (id) => `/api/artists/${id}`,
      works : (id) => `/api/artists/works/${id}`,
      requests : (id) => `/api/artists/requests/${id}`
    }
  }

  get requests() {
    return {
      show: (id) => `/api/requests/${id}`,
      update   : (id) => `/api/requests/${id}`,
      create   : (id) => `/api/requests/${id}`
    }
  }

}
const APIRoutes = new ApiRoutes();