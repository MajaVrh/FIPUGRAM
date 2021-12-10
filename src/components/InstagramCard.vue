<template>
  <div class="card text-center">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <p>{{ info.imageDescription }}</p>
        <p >{{ email }}</p>
      </div>
    </div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.imageUrl" />
    </div>
 <div class="card-footer text-muted">{{postedFromNow}}</div> 
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["info", "email","posted_at"],
  
  name: "InstagramCard",
  computed:{postedFromNow(){return moment(this.posted_at).fromNow()}},
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
p {
  color: rgb(109, 109, 109);
}
</style>