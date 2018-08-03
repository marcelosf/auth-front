import {UserGuard} from '@/guards/UserGuard';

describe('User', () => {

    describe('Check for user authentication', () => {

      it('Should return a boolean value.', () => {

        UserGuard.check(async response => {

            expect(response).to.be.a('boolean');

        });

      });

    });

});

