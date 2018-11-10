(() => {
  var op = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    var resp = op.apply(this, arguments);
    this.setRequestHeader('X-CSRF-Token', document.getElementsByName("csrf-token")[0].content);
    return resp;
  };

  class Requester {
    initialize(type, route, content='application/json') {
      const request = new XMLHttpRequest();
      request.open(type, route);
      request.setRequestHeader('Accept', content);
      request.setRequestHeader('Content-Type', content);
      return request;
    }

    delete(route) {
      const request = this.initialize('DELETE', route);
      return new Promise(function (resolve, reject) {
        request.onload = function () {
          if (this.status == 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject({
              status: this.status,
              statusText: this.statusText,
            });
          }
        }
        request.send();
      });
    }

    get(route) {
      const request = this.initialize('GET', route);
      return new Promise(function (resolve, reject) {
        request.onload = function () {
          if (this.status == 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject({
              status: this.status,
              statusText: this.statusText,
            });
          }
        }
        request.send()
      });
    }

    post(route, params) {
      const request = this.initialize('POST', route);
      return new Promise(function (resolve, reject) {
        request.onload = function () {
          if (this.status == 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject({
              status: this.status,
              statusText: this.statusText,
            });
          }
        }
        request.send(JSON.stringify(params));
      });
    }

    submit(route, formData) {
      const request = new XMLHttpRequest();

      request.open('POST', route);
      request.setRequestHeader('Content-Type', 'multipart/form-data');
      return new Promise(function (resolve, reject) {
        request.onload = function () {
          if (this.status == 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject({
              status: this.status,
              statusText: this.statusText,
            });
          }
        }
        request.send(formData);
      });
    }

    update(route, params) {
      const request = this.initialize('PUT', route);
      return new Promise(function (resolve, reject) {
        request.onload = function () {
          if (this.status == 200 && resolve) {
            resolve(JSON.parse(request.response));
          } else if (reject) {
            reject({
              status: this.status,
              statusText: this.statusText,
            });
          }
        }
        request.send(JSON.stringify(params));
      });
    }
  }
  this.Requester = new Requester();
})();
