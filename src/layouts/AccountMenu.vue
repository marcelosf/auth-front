<template>

    <div>

        {{ userMenu.name }}

        <v-menu offset-y offset-x>

            <v-btn slot="activator" icon>

                <v-icon class="white--text">account_circle</v-icon>

            </v-btn>

            <v-card>

                <v-card-title>

                    <span class="headline">Account</span>

                </v-card-title>

                <v-card-text>

                    <v-list two-line>

                        <v-list-tile avatar>

                            <v-list-tile-avatar>

                                <v-icon x-large>account_circle</v-icon>

                            </v-list-tile-avatar>

                            <v-list-tile-content>

                                <v-list-tile-title>{{ userMenu.name }}</v-list-tile-title>

                                <v-list-tile-sub-title>{{ userMenu.email }}</v-list-tile-sub-title>

                            </v-list-tile-content>

                        </v-list-tile>

                    </v-list>

                </v-card-text>

                <v-card-actions>

                    <v-spacer></v-spacer>

                    <v-btn flat color="primary" @click="logout">Logout</v-btn>

                    <v-btn flat color="primary">Edit</v-btn>

                </v-card-actions>

            </v-card>

        </v-menu>

    </div>

</template>

<script>

import {Authentication} from '@/resources/Authentication';

export default {

  computed: {

    userMenu () {

      return this.$store.state.user.user;

    }

  },

  methods: {

    logout () {

      this._getAuthHandler().logout((response) => {

        this.$store.state.user.user = {};

        this._dispatchShowMessageEvent(response.data.message);

      });

    },

    _getAuthHandler () {

      return new Authentication();

    },

    _dispatchShowMessageEvent (message) {

      this.$emit('showMessage', message);

    }

  }

}

</script>