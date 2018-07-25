import {Middleware} from '@/middleware/Middleware';

export class LoginInterceptor extends Middleware {

  static handleLoginResponse (api, actions, errorActions) {

    super.interceptResponse(api, (response) => {

      actions(response);

      return response;

    }, (error) => {

      errorActions(error);

      return Promise.reject(error);

    });

  }

  static handleLoginRequest (api) {

    super.interceptRequest(api, (request) => {

      console.log(request);

      return request;

    });

  }

}
