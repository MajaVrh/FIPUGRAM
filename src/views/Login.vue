<template>
  <div class="about">
    <h1>This is an login page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
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
            <br />
            <button type="button" @click="login()" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, signInWithEmailAndPassword } from "@/firebase";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then((result) => {
          //ako pišemo na taj način-> sačuvamo this iz parent konteksta
          //result- neki rezultat prijave
          console.log("Uspješna prijava", result);
          //push -> idi na sljedecu rutu (zapamti di smo bili ako idemo back)
          //replace -> trenutunu rutu zamjeni nekom drugom
       
        })
        .catch(function (error) {  console.log("Greška", error);});
    },
    popUp(text) {
      this.error = text;
    },
  },
};
</script>
