import {Middleware} from '@/middleware/Middleware';

export class LoginInterceptor extends Middleware {

  static handleLoginResponse (api) {

    super.interceptResponse(api, (response) => {

      return response;

    }, (error) => {

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
