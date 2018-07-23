<template>

    <v-card>

        <v-toolbar :class="classes ? classes : 'white'">

            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <slot name="content"></slot>

            <v-spacer></v-spacer>

            <slot name="menu"></slot>

        </v-toolbar>

        <v-card-text>

            <v-container grid-list-lg>

                <slot></slot>

            </v-container>

        </v-card-text>

        <v-card-actions>

            <slot name="actions"></slot>

        </v-card-actions>

    </v-card>

</template>

<script>
    export default {

      props: ['title', 'classes']

    }
</script>