<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <form @submit.prevent="postNewImage" class="form-inline mb-5 ">
        <div class="form-group dodavanje_slike">
          <label for="imageUrl">Image URL</label>
          <input 
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
        </div>
        <div class="form-group dodavanje_slike">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <br />
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <instagram-card
        v-for="card in filterCards"
        :key="card.id"
        :info="card"
        :email="card.email"
        :posted_at="card.posted_at"
      />
    </div>
    <div class="col-3"></div>
 
  </div>
</template>
<!--  <button class="btn btn-primary ml-2" @click="debugPosts">DEBUG</button> -->
<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db, addDoc, collection, getFirestore, getDocs, query, onSnapshot } from "@/firebase";

/*
let cards = [];
cards = [
  {
    url: "https://picsum.photos/id/1/450/450",
    description: "nešto",
    time: "few minutes ago...",
    ime: "Alen",
    prezime: "Valek",
  },
  {
    url: "https://picsum.photos/id/21/450/450",
    description: "slika",
    time: "10 minutes ago...",
    ime: "Andrej",
    prezime: "Korica",
  },
  {
    url: "https://picsum.photos/id/42/450/450",
    description: "opet nešto",
    time: "20 minutes ago...",
    ime: "Dominik",
    prezime: "Ružić",
  },
  {
    url: "https://picsum.photos/id/88/450/450",
    description: "bla bla",
    time: "30 minutes ago...",
    ime: "Deni",
    prezime: "Vidan",
  },
];
*/

export default {
  name: "Home",
  data: function () {
    return {
      cards: [], //možemo napisat i samo cards i samo store
      store: store,
      ime: "",
      prezime: "",
      newImageDescription: "",
      newImageUrl: "",
      posted_at:"",
      

    };
  },
  mounted() {
    //DAJE TOČNO TRENUTAK KAD SAM SE DATOTRKA PRIKAŽE NA ERKRANU, on se prikaže kad se home.vue treba prikazati na ekranu
    this.getPosts()
  },
  methods: {
    async getPosts() {
      const q = query(collection(db, "postovi"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postovi = []
        querySnapshot.forEach(doc => {
          postovi.push({id: doc.id, ...doc.data()})
        })
        this.cards = postovi
      })
    },
    debugPosts() {
      console.log(this.cards)
    },
    async postNewImage() {
      try {
        console.log("OK");
        const posted_at = posted_at;
        const imageUrl = this.newImageUrl;
        const imageDescription = this.newImageDescription;
        const post = {
          imageUrl,
          imageDescription,
          email: this.store.currentUser,
          posted_at: Date.now(),
        };

        const docRef = await addDoc(collection(db, "postovi"), post);
        console.log(docRef);
         this.newImageUrl = ""
         this.newImageDescription = ""
        alert("Dodana slika");
      
        

      } catch (error) {
        console.log(error);
      }
      
    },
      
  },
  
  computed: {
    // unutra pisšemo funkcije koje će služiti za nekavu obradu ili nešto, što koristi podatke iz data, ali ih pokušava prikazati na drukčiji način
    filterCards() {
      let termin = this.store.searchTerm; // this pokazuje/uzima/pristupa na element iz data
      return this.cards.filter(
        (card) =>
          card.imageDescription.toLowerCase().includes(termin.toLowerCase())
      );
      // return this.cards.filter(card => card.description.indexOf(termin)>=0);  //28:00
      /* let newCards = [];
      for (let card of this.cards) {
        if (card.description.indexOf(termin) >= 0) {  newCards.push(card); // indexOf() vraća poziciju stringa unutrar stinga, a ako ne pronađe vraća 0
        }
      }
      return newCards;*/
    },
  },
  components: {
    InstagramCard,
  },
};
</script>


<style>
.dodavanje_slike{width: 50%;
margin-left: auto;
margin-right: auto;}
</style>