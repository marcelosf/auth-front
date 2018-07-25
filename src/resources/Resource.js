const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

import {Api} from '@/resources/Api/Api';
import {LocalStorage} from '@/resources/LocalStorage/LocalStorage';
import {Jwt} from '@/resources/Jwt/Jwt';

export class Resource {

  constructor () {

    this.api = this._apiHandler();

  }

  getApi (actions, errorActions) {

    this.api.interceptors.response.use(response => {

      if (actions) {

        actions(response);

      }

      return response;

    }, errors => {

      if (errorActions) {

        errorActions(errors);

      }

      if (this._getErrorCode(errors) === 0) {

        this._refreshToken(() => {

          return this._retryRequest(errors.config);

        });

      }

      this._loginRedirect(errors);

      return Promise.reject(errors);

    });

    return this.api;

  }

   _loginRedirect (error) {

      if (this._getErrorCode(error) !== 0) {

        window.location = '/#/authentication';

        this._localStorageHandler().destroy(ACCESS_TOKEN_KEY);

        this._localStorageHandler().destroy(USER_KEY);

      }

   }

   _refreshToken (actions) {

      this._jwtHandler().refreshToken(response => {

        this._localStorageHandler(response);

        actions;

      });

   }

  _retryRequest (config) {

    config.headers.Authorization = 'Bearer ' + this._getAccessToken();

    return this.api.request(config).catch(response => { console.log(response); });

  }

  _apiHandler () {

    return new Api().initialize();

  }

  _getErrorCode (error) {

    if (error.response.request.response) {

      return JSON.parse(error.response.request.response).code;

    }

  }

  _getAccessToken () {

    return this._storageHandler().getValueByKey(ACCESS_TOKEN_KEY);

  }

  _storageHandler () {

    return LocalStorage;

  }

  _jwtHandler () {

    return new Jwt(this.api);

  }

  _localStorageHandler (response) {

    LocalStorage.storeValue(ACCESS_TOKEN_KEY, response.data.access_token);

    return true;

  }

}
