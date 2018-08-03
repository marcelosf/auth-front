<template>

    <div>
            
         {{ userMenu ? userMenu.name : ''}}

        <v-btn icon v-if="!userMenu" @click="goToLoginForm">

            <v-icon class="white--text">account_circle</v-icon>

        </v-btn>

        <v-menu offset-y offset-x v-if="userMenu">

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

                                <v-list-tile-title>{{ userMenu ? userMenu.name : '' }}</v-list-tile-title>

                                <v-list-tile-sub-title>{{ userMenu ? userMenu.email : ''}}</v-list-tile-sub-title>

                            </v-list-tile-content>

                        </v-list-tile>

                    </v-list>

                </v-card-text>

                <v-card-actions>

                    <v-spacer></v-spacer>

                    <v-btn flat color="primary" @click="logout">Logout</v-btn>

                    <v-btn flat color="primary" @click="edit">Edit</v-btn>

                </v-card-actions>

            </v-card>

        </v-menu>

    </div>

</template>

<script>

import {Authentication} from '@/resources/Authentication';
import {User} from '@/resources/User';

export default {

  computed: {

    userMenu () {

      return this.loadUserData();

    }

  },

  methods: {

    goToLoginForm () {

      return this.$router.push({name: 'authentication'});

    },

    logout () {

      this._getAuthHandler().logout((response) => {

        this.$store.state.user.user = {};

        this._dispatchShowMessageEvent(response.data.message);

      });

    },

    edit () {

      this.$router.push({name: 'user-edit', params: {userId: this.$store.state.user.user.id}})

    },

    loadUserData () {

        let user = this._getUserFromStore();

        if (!this.$R.isEmpty(user)) {

            return this._getUserFromStore();

        }

        this._userHandler().loadUserData();

        return this._setUserStore(this._userHandler().getUser());

    },

    _userHandler () {

        return User;

    },

    _getUserFromStore () {

        return this.$store.state.user.user;

    },

    _setUserStore (user) {

        this.$store.state.user.user = user;

        return user;

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