<template>
    <div id="app">
        <Header />
        <Home />
    </div>
</template>

<script>
import Home from "@/components/Home.vue";
import Header from "@/components/Header.vue";

import { mapActions } from "vuex";

export default {
    name: "App",
    components: {
        Home,
        Header,
    },
    data() {
        return {
            query: "african",
        };
    },

    methods: {
        ...mapActions([
            "searchPhotos",
            "fetchAllPhotosList",
            "saveAllPhotosList",
        ]),
    },

    mounted() {
        this.searchPhotos(this.query);
        this.fetchAllPhotosList();
        this.saveAllPhotosList();
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap");

*,
body {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

#app {
    font-family: "Nunito", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
}

img {
    max-width: 100%;
    height: auto;
}
</style>
