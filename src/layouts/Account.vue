<template>

    <v-card class="my-5">

        <v-card-title>

            <h3 class="headline">{{ title }}</h3>

        </v-card-title>

        <v-card-text>

            <v-form>

                <v-text-field
                        label="Login"
                        v-model="credentials.code"
                        required
                ></v-text-field>

                <v-text-field
                        name="account-password"
                        label="Password"
                        v-model="credentials.password"
                        type="password"
                        required
                ></v-text-field>

            </v-form>

        </v-card-text>

        <v-card-actions>

            <v-btn flat @click="login()">Login</v-btn>

        </v-card-actions>

    </v-card>

</template>

<script>
    import {Authentication} from '@/resources/Authentication';
    import {User} from '@/resources/User';

    export default {

      props: ['title'],

      data () {

        return {

          credentials: {

            code: '',

            password: ''

          }

        }
      },

      methods: {

        login () {

          this._getAuthHandler().login(this.credentials, this._triggerLoginActions, this._triggerLoginError);

        },

        _getAuthHandler () {

          return new Authentication();

        },

        _triggerLoginActions () {

          this._getUserHandler().loadUserData(() => {

            this.$store.state.user.user = this._getUserHandler().getUser();

            this.$store.state.loggedin = true;

          }, (error) => {

            this.$emit('error', error.response.message);

          });

        },

        _getUserHandler () {

          return User;

        },

        _triggerLoginError (error) {

          console.log(error);

          this.$emit('error', error.response);

        }

      }

    }
</script>