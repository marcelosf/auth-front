import {Jwt} from './Jwt/Jwt.js';
import {Api} from './Api/Api';
import {LocalStorage} from './LocalStorage/LocalStorage';
import {LoginInterceptor} from '@/middleware/LoginInterceptor';
import {TokenInterceptor} from '@/middleware/TokenInterceptor';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

export class Authentication {

  constructor (api) {

    this._api = null;

    this._setApi(api);

    LoginInterceptor.handleLoginResponse(this._api);

    this.JWT = new Jwt(this._api);

  }

  login (credentials, triggerLoginActions, error) {

    this.JWT.requestToken(credentials, (response) => {

      this._storeAccountToken(response);

      triggerLoginActions();

    }, error);

  }

  refreshLogin () {

    if (this.check()) {

      this._setAccessToken();

      this._setRequester();

      this.JWT.setApi(this._api);

      return this.JWT.refreshToken((response) => {

        this._storeAccountToken(response);

      });

    }

    return false;

  }

  logout (actions) {

    if (this.check()) {

      this.JWT.removeToken((response) => {

        actions(response);

        LocalStorage.destroy(ACCESS_TOKEN_KEY);

        LocalStorage.destroy(USER_KEY);

      });

    }

  }

  check () {

    return LocalStorage.getValueByKey(ACCESS_TOKEN_KEY) !== null;

  }

  _storeAccountToken (response) {

    LocalStorage.storeValue(ACCESS_TOKEN_KEY, response.data.access_token);

    return true;

  }

  _setApi (api) {

    if (api) {

      this._api = api;

      return true;

    }

    this._api = new Api().initialize();

    return true;

  }

  _setAccessToken () {

    this._accessToken = this._getStorageHandler().getValueByKey('access_token');

  }

  _setRequester () {

    this._api = TokenInterceptor.handleBearer(this._api, this._accessToken);

  }

  _getStorageHandler () {

    return LocalStorage;

  }

}
