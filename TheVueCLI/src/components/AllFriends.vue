<template>
   <div id="allFriends">
      <h2>All Frends</h2>
      <div v-for="(friend, index) in friends" :key="index">
         <i>{{ index }}</i>
         <span>{{ friend.name }}</span>
      </div>
   </div>
</template>

<script>
export default {
   name: "AllFriends",
   props: ["friends"],
   data() {
      return {};
   }
};
</script>

<style lang="sass" scoped></style>
