<template>
   <div id="app">
      <h1>{{title}}</h1>
      <Navbar />
		<AllFriends :friends="people" />
		<OnlineFriends :friends="people" />
   </div>
</template>

<script>
import Navbar from "./components/Navbar";
import AllFriends from "./components/AllFriends";
import OnlineFriends from "./components/OnlineFriends";

export default {
   name: "app",
   components: {
		Navbar,
		AllFriends,
		OnlineFriends,
   },
   data() {
      return {
			title: "My first Vue.js app!",
			people: [
            { name: "Mario", online: true },
            { name: "Luigi", online: true },
            { name: "Karol", online: false },
            { name: "Princess", online: false }
         ],
      };
   }
};
</script>

<style lang="sass">
h1
  color: #444
  font-weight: normal
  text-align: center
</style>
