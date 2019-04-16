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
      thumbnail: (id) => `api/works/thumbnail/${id}`,
      filtered_artist_hidden: `/api/works/filtered/artist_hidden`,
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
      commissions : (id) => `/api/artists/commissions/${id}`,
      filtered_artists: (search_params) => `/api/artists/filtered_artists/${search_params}`,
      categories  : `/api/artists/categories`,
      lock_user : (id) => `/api/artists/lock_user/${id}`,
      unlock_user : (id) => `/api/artists/unlock_user/${id}`,
    }
  }

  get buyers() {
    return {
      show        : (id) => `/api/buyers/${id}`,
      update      : (id) => `/api/buyers/${id}`,
      requests    : (id) => `/api/buyers/requests/${id}`,
    };
  }

  get requests() {
    return {
      show: (id) => `/api/requests/${id}`,
      update: (id) => `/api/requests/${id}`,
      delete: (id) => `/api/requests/delete/${id}`,
      create: `/api/requests`,
      types: '/requests/types',
      request_exist: (search_params) => `/api/requests/request_exist/${search_params}`
    }
  }

  get commissions() {
    return {
      create: `/api/commissions`,
      types: `/commissions/types`,
      update: (id) => `/api/commissions/${id}`,
    }
  }

  get receipts() {
    return {
      create: `/api/receipts`,
      show: (id) => `/api/receipts/${id}`,
      update: (id) => `/api/receipts/${id}`,
      types: `/receipts/types`,
      artist: (id) => `/api/receipts/artist/${id}`
    }
  }

}
const APIRoutes = new ApiRoutes();
