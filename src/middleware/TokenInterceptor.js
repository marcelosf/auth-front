import {Middleware} from '@/middleware/Middleware';

export class TokenInterceptor extends Middleware {

  static handleBearer (api, token) {

    let headerValue = 'Bearer ' + token;

    return super.interceptPostHeader(api, 'Authorization', headerValue);

  }

  static refresh (api, response, error) {

    return super.interceptResponse(api, (response) => {

      console.log(response);

    }, error);

  }

}
