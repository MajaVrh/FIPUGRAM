<template>
  <div class="about">
    <h1>Profile settings</h1>
    <h5>Change your password</h5>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1"> New password</label>
              <input
                v-model="newPassword"
                type="password"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Repeat new password</label>
              <input
                v-model="newPasswordRepeat"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <br />
            <button type="button" class="btn btn-primary" @click="confirm()">
              Confirm
            </button>
            <br />
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
import { auth, updatePassword } from "@/firebase";
import store from "@/store";
export default {
  name: "Profile",
  data() {
    return {
      newPassword: "",
      newPasswordRepeat: "",
      error: "",
    };
  },
  methods: {
    confirm() {
      const user = auth.currentUser;
      if (this.newPassword != this.newPasswordRepeat)
        return this.popUp("Niste unijeli istu lozinku");
      if (this.newPassword.length < 6)
        return this.popUp("Lozinka mora imati minimalno 6 znakova");
      updatePassword(user, this.newPassword)
        .then(() => {
           console.log("Uspješna promjena");
       
        })
        .catch((error) => {
          console.log(error)
        });
    },
    popUp(text) {
      this.error = text;
    },
  },
};
</script>
