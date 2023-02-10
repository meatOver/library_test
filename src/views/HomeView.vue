<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <LoginView/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginView from "@/components/LoginView";

export default {
  name: 'HomeView',
  components: {
    LoginView
  }
}
</script>
