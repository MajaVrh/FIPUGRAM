<template>
  <div class="about">
    <h1>This is an sign up page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <!--      <div class="form-group">
              <label for="exampleInputUsername1">Username</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                placeholder="Enter username"
                v-model="ime"
              />
            </div>  -->

            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword2">Confirm password</label>
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control"
                id="exampleInputPassword2"
                placeholder="Password"
              />
            </div>
            <br />
            <button type="button" class="btn btn-primary" @click="signup">
              Submit
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
    <div class="alert alert-danger mt-3 w-25 mx-auto" role="alert" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { auth, createUserWithEmailAndPassword } from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
      error: ""
    };
  },
  methods: {
    signup() {
      if (this.password != this.passwordRepeat ) return this.popUp("Niste unijeli istu lozinku")
      if (this.password.length < 6) return this.popUp("Lozinka mora imati minimalno 6 znakova")
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then(() => {
          console.log("Uspješna registracija");
          this.$router.replace({ name: "Home" }); 
        })
        .catch((error) => {
          console.log(error)
        });
    },
    popUp(text) {
      this.error = text
    }
  },
};
</script>
