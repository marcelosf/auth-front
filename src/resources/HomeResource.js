import {Resource} from './Resource';

const HOME_API = '/';

export class HomeResource extends Resource {

  static list (actions, page, search, errors) {

    let searchParams = this.setSearch(search);

    this._getApi().get(HOME_API + '?page=' + page + (searchParams || '')).then((response) => {

      actions(response.data.data);

    }).catch(errors);

  }

  static setSearch (search) {

    if (search) {

      let searchKeys = Object.keys(search);

      let searchParameters = '&search=';

      searchKeys.forEach((value) => {

        if (search[value]) {

          searchParameters = searchParameters + value + ':' + search[value] + ';';

        }

      });

      return searchParameters;

    }

  }

}
