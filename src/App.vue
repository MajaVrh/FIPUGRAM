<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light mb-5">
      <img
        src="@/assets/fipu_logo.png"
        height="60"
        class="d-inline-block align-top lijevi-razmak"
        alt="logo"
        loading="lazy"
      />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 cent">
          <li v-if="store.currentUser" class="nav-item active">
            <router-link class="nav-link" to="/"> Home </router-link>
          </li>
          <li v-if="!store.currentUser" class="nav-item">
            <!--da se login pokaže kad ne postoju currenUser -->
            <router-link class="nav-link" to="/Login"> Login </router-link>
          </li>
          <li v-if="!store.currentUser" class="nav-item">
            <router-link class="nav-link" to="/Signup"> Sign up </router-link>
          </li>
           <li v-if="store.currentUser" class="nav-item">
            <router-link class="nav-link" to="/Profile"> Profile </router-link>
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <a href="#" @click.prevent="logout()" class="nav-link"> Logout </a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 razmak desni-razmak">
          <input
            v-model="store.searchTerm"
            class="form-control"
            type="search"
            placeholder="Search"
          />
        </form>
      </div>
    </nav>
    {{ store.searchTerm }}

    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.razmak {
  margin-left: auto !important;
}

.desni-razmak {
  margin-right: 1rem;
}

.lijevi-razmak {
  margin-left: 1rem;
}
.cent {
  margin-left: auto !important;
}

.marg {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #111111;
    text-decoration: none;

    &.router-link-exact-active {
      color: #803d77;
    }
  }
}
</style>

<script>
import store from "@/store";
import { auth, onAuthStateChanged, signOut } from "@/firebase";
import router from "@/router";

onAuthStateChanged(auth, (user) => {
  const currentRoute = router.currentRoute;
  if (user) {
    // User is signed in
    console.log("Prijavljen je:", user.email);
    store.currentUser = user.email; //kad detektiramo korisnika
    const uid = user.uid;
     if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
    // ...
  } else {
    // User is signed out

    console.log("*Nema prijavljenog korisnika*");
    store.currentUser = null; //kad detektiremo da nema korisnika
    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
    // ...
  }
});
export default {
  name: "app",
  data() {
    return {
      store: store,
    };
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "Login" });
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
