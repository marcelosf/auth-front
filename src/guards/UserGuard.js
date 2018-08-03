import {User} from '@/resources/User';

export class UserGuard {

    static check (actions) {

        User.check((response) => {

            actions(response.data.access_token);

        });

    }

}
