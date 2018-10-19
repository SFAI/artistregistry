(() => {
  class Requester {
    initialize(type, route, content='application/json') {
      const request = new XMLHttpRequest();
      request.open(type, route);
      request.setRequestHeader('Accept', content);
      request.setRequestHeader('Content-Type', content);
      request.setRequestHeader('X-CSRF-Token', document.getElementsByName("csrf-token")[0].content);
      return request;
    }

    delete(route, resolve, reject) {
      const request = this.initialize('DELETE', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (request.status === 204 && resolve) {
            resolve();
          }
        }
      };
      request.send();
    }

    get(route, resolve, reject) {
      const request = this.initialize('GET', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 && resolve) {
            resolve(JSON.parse(request.response));
          }
        }
      };
      request.send();
    }

    post(route, params, resolve, reject) {
      const request = this.initialize('POST', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject(JSON.parse(request.response));
          }
        }
      };
      request.send(JSON.stringify(params));
    }

    update(route, params, resolve, reject) {
      const request = this.initialize('PATCH', route);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject(JSON.parse(request.response));
          }
        }
      };
      request.send(JSON.stringify(params));
    }
  }
  this.Requester = new Requester();

})();
