<template>

    <v-container>

        <workspace-card :title="workspace.title">

            <v-layout>

                <v-flex s12 md12>

                    <v-form v-model="valid">

                        <v-text-field

                                label="Code"
                                v-model="user.user.code"
                                disabled="disabled"
                                prepend-icon="credit_card"

                        ></v-text-field>

                        <v-text-field

                                label="Name"
                                v-model="user.user.name"
                                :rules="user.rules.name"
                                prepend-icon="person"
                                required

                        ></v-text-field>

                        <v-text-field

                                label="E-mail"
                                v-model="user.user.email"
                                :rules="user.rules.email"
                                prepend-icon="email"
                                required

                        ></v-text-field>

                        <v-select

                                label="User Type"
                                v-model="user.user.type"
                                :items="user.user.items"
                                prepend-icon="portrait"
                                required

                        ></v-select>

                        <v-text-field

                                label="Phone"
                                v-model="user.user.phone"
                                :rules="user.rules.phone"
                                prepend-icon="phone"
                                mask="####-####"
                                required

                        ></v-text-field>

                    </v-form>

                </v-flex>

            </v-layout>

            <span slot="actions">

                <v-btn color="primary" @click="save">Save</v-btn>

                <v-btn>Cancel</v-btn>

            </span>

        </workspace-card>

    </v-container>

</template>

<script>
    import WorkspaceCard from '@/layouts/WorkspaceCard';
    import UserModel from './User';
    import {User} from '@/resources/User';

    export default {

      created () {

        this.loadCurrentUserData();

      },

      data () {

        return {

          workspace: {

            title: 'User Account'

          },

          user: UserModel,

          valid: true,

          disabled: true

        }

      },

      methods: {

        loadCurrentUserData () {

          let user = this.getUser();

          this.fillForm(user);

        },

        save () {

          User.update(this.user.user, (response) => {

            console.log(response);

          });

        },

        getUser () {

          return User.getUser();

        },

        fillForm (user) {

          this.user.user.code = user.code;

          this.user.user.name = user.name;

          this.user.user.email = user.email;

          this.user.user.type = user.type;

          this.user.user.alternative_email = user.alternative_email;

          this.user.user.usp_email = user.usp_email;

          this.user.user.phone = user.phone;

          this.user.user.extra = user.extra;

        }

      },

      components: {

        'workspace-card': WorkspaceCard

      }

    }
</script>