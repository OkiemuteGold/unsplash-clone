<template>
    <div class="header">
        <form
            class="search_container"
            @submit.prevent="search"
            v-if="searchPhotos"
        >
            <div class="form-control" v-if="showResultText">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search for photo"
                    aria-placeholder="Search for photo"
                    v-model="input"
                />

                <button
                    class="search_icon"
                    type="submit"
                    :disabled="invalidInput"
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="search"
                        class="svg-inline--fa fa-search fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        ></path>
                    </svg>
                </button>
            </div>

            <div class="search_result_text" v-if="!showResultText">
                <h1>Search Results for "{{ query | capitalize }}"</h1>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            input: "",
            query: "",
            showResultText: true,
        };
    },

    computed: {
        invalidInput() {
            return this.input === "";
        },
    },

    filters: {
        capitalize: function (value) {
            let firstLetter = value.charAt(0).toUpperCase();
            return firstLetter + value.slice(1);
        },
    },

    methods: {
        ...mapActions(["searchPhotos"]),

        search() {
            /* search if there is an input */
            if (!this.invalidInput) {
                this.query = this.input.toLowerCase();

                setTimeout(() => {
                    /* call searchPhotos using inputted name as argument */
                    this.searchPhotos(this.query);
                    this.showResultText = !this.showResultText;
                }, 1500);
            }

            /* return all to origin state */
            // this.input = "";
        },
    },
};
</script>

<style scoped>
.header {
    background-color: rgb(221, 226, 233);
    width: 100vw;
    height: 250px;
    padding: 5.5rem 5rem 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search_container {
    width: 400px;
    position: relative;
}

button {
    border: none;
    background: none;
}

.search_icon {
    height: 1.275rem;
    width: 1.275rem;
    padding: 2px;
    color: #bbb;
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
}

.search_container input {
    outline: none;
    border: none;
    width: 100%;
    min-width: 260px;
    padding: 1rem 1rem 1rem 3.25rem;
    border-radius: 5px;
    font-size: 0.875rem;
    font-family: "Nunito", sans-serif;
    font-weight: 700;
    color: #536d88;
}

.search_container input::placeholder {
    color: #536d88;
}

@media screen and (min-width: 768px) {
    .search_container {
        width: 90%;
        max-width: 850px;
        margin: auto;
    }
}
</style>