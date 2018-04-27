<template>

    <v-content>

        <v-container fluid fill-height>

            <v-layout align-center justify-center>

                <v-flex xs12 sm8 md4>

                    <v-card class="elevation-12">

                        <v-toolbar dark color="primary">

                            <v-toolbar-title>Login</v-toolbar-title>

                        </v-toolbar>

                        <v-card-text>

                            <v-form>

                                <v-text-field
                                        prepend-icon="person"
                                        name="code"
                                        label="Nº Usp"
                                        type="text"
                                        v-model="credentials.code"
                                ></v-text-field>

                                <v-text-field
                                        prepend-icon="lock"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        v-model="credentials.password"
                                ></v-text-field>

                            </v-form>

                        </v-card-text>

                        <v-card-actions>

                            <v-spacer></v-spacer>

                            <v-btn color="primary" @click="login()">Login</v-btn>

                        </v-card-actions>

                    </v-card>

                </v-flex>

            </v-layout>

        </v-container>

        <snack-bar v-model="snack_bar.toggle" :message="snack_bar.message"></snack-bar>

    </v-content>

</template>

<script>
    import {Authentication} from '@/resources/Authentication';
    import {User} from '@/resources/User';
    import SnackBar from '@/layouts/SnackBar';

    export default {

      data () {

        return {

          credentials: {

            code: '',

            password: ''

          },

          snack_bar: {

            message: '',

            toggle: false

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

            this._showMessage('You are logged in.');

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

        },

        _showMessage (message) {

          this.snack_bar.message = message;

          this.snack_bar.toggle = true;

        }

      },

      components: {

        'snack-bar': SnackBar

      }

    }
</script>