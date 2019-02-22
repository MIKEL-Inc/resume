<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-flex class="pa-3">
              <v-img v-bind:src="require('@/assets/logo.png')" height="125px" alt="inMIKEL Logo" contain></v-img>
            </v-flex>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" v-on:keydown.enter="login"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
              <v-alert :value="alert" type="error">{{ error }}</v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from '@/firebase/init'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    error: '',
    alert: false
  }),
  methods: {
    login () {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home')
        },
        (err) => {
          this.error = err
          this.alert = true
        }
      )
    }
  }
}
</script>
