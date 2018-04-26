const GET_TOKEN_URL = 'auth/login';
const REFRESH_TOKEN_URL = 'auth/refresh';
const INVALIDATE_TOKEN_URL = 'auth/logout';

export class Jwt {

  constructor (api) {

    this.api = api;

  }

  requestToken (data, action, error) {

    return this.api.post(GET_TOKEN_URL, data).then(action).catch(error);

  }

  refreshToken (actions) {

    try {

      return this.api.post(REFRESH_TOKEN_URL).then((response) => {

        actions(response);

      });

    } catch (error) {

      return 'An error occurred when trying to refresh the token. Error: ' + error.message;

    }

  }

  removeToken () {

    try {

      this.api.post(INVALIDATE_TOKEN_URL).then((response) => {

        return response;

      });

    } catch (error) {

      return 'An error occurred while trying to invalidate the token. Error: ' + error.message;

    }

  }

  setApi (api) {

    this.api = api;

  }

}
