class ApiRoutes {
  get works() {
    return {
      index: (page) => `/api/works/page/${page}`,
      create: `/api/works`,
      show: (id) => `/api/works/${id}`,
      update: (id) => `/api/works/${id}`,
      delete: (id) => `/api/works/${id}`,
      filtered_works: (search_params, page) => `/api/works/filtered_works/${search_params}/${page}`,
      categories: `/works/categories`,
      thumbnail: (id) => `api/works/thumbnail/${id}`,
      flag: (id) => `/api/works/flag/${id}`,
    }
  }

  get artists() {
    return {
      index       : (page) => `/api/artists/page/${page}`,
      show        : (id) => `/api/artists/${id}`,
      update      : (id) => `/api/artists/${id}`,
      delete      : (id) => `/api/artists/destroy/${id}`,
      works       : (id) => `/api/artists/works/${id}`,
      requests    : (id) => `/api/artists/requests/${id}`,
      commissions : (id) => `/api/artists/commissions/${id}`,
      filtered_artists: (search_params, page) => `/api/artists/filtered_artists/${search_params}/${page}`,
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
      lock_user : (id) => `/api/buyers/lock_user/${id}`,
      unlock_user : (id) => `/api/buyers/unlock_user/${id}`,
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

  get blocks() {
    return {
      block_user: `/api/blocks/block_user`,
      unblock_user: `/api/blocks/unblock_user`,
      is_blocking: (search_params) => `/api/blocks/is_blocking/${search_params}`
    }
  }

}
const APIRoutes = new ApiRoutes();
