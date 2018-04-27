<template>

  <v-app light>
    <v-navigation-drawer
      fixed
      :clipped="clipped"
      v-model="drawer"
      app
    >

      <v-list>

        <v-divider></v-divider>

        <v-list-tile ripple v-model="activeItem" v-for="item in items" :key="item.id" :to="{ name: item.link }">

          <v-list-tile-action>

            <v-icon light v-html="item.icon"></v-icon>

          </v-list-tile-action>

          <v-list-tile-content>

            <v-list-tile-title v-text="item.title"></v-list-tile-title>

          </v-list-tile-content>

        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

    <v-toolbar class="light-blue white--text" fixed app :clipped-left="clipped">

      <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer" light></v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>

      <account-menu @showMessage="showMessage"></account-menu>

    </v-toolbar>

    <v-content>

      <transition name="fade" mode="out-in">

        <router-view></router-view>

      </transition>

      <snack-bar v-model="snack_bar.toggle" :message="snack_bar.message"></snack-bar>

    </v-content>

  </v-app>

</template>

<style>

  .fade-enter-active, .fade-leave-active {

    transition: opacity .5s;

  }

  .fade-enter, .fade-leave-to {

    opacity: 0;

  }

</style>

<script>
  import AccountMenu from '@/layouts/AccountMenu.vue';
  import SnackBar from '@/layouts/SnackBar';

  export default {

    data () {

      return {

        clipped: true,

        drawer: false,

        fixed: true,

        activeItem: false,

        items: [

        ],

        right: true,

        title: 'Contas IAG',

        snack_bar: {

          message: '',

          toggle: false

        }

      }

    },

    methods: {

      showMessage (message) {

        console.log(message);

        this.snack_bar.message = message;

        this.snack_bar.toggle = true;

      }

    },

    components: {

      'account-menu': AccountMenu,

      'snack-bar': SnackBar

    }
  }
</script>
