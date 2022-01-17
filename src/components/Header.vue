<template>
    <div class="header">
        <form class="search_container" @submit.prevent="search">
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
                <div class="back_icon" @click="backToSearch">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="arrow-left"
                        class="svg-inline--fa fa-arrow-left fa-w-14"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        title="Back to search"
                    >
                        <path
                            fill="currentColor"
                            d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
                        ></path>
                    </svg>
                    <span>Back to search</span>
                </div>

                <h1>
                    Search Results for <span>“{{ query | capitalize }}”</span>
                </h1>
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

                /* call searchPhotos using inputted name as argument */
                this.searchPhotos(this.query);
                this.closeModal();

                setTimeout(() => {
                    if (this.searchPhotos) {
                        this.showResultText = !this.showResultText;
                    }
                }, 3000);
            }
        },

        closeModal: function () {
            this.$store.dispatch("closeModal");
        },

        backToSearch() {
            this.closeModal();
            this.showResultText = true;

            /* return all to origin state */
            // this.input = "";
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    background-color: rgb(221, 226, 233);
    width: 100vw;
    height: 250px;
    padding: 5.5rem 1.25rem 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search_container {
    width: 400px;
    position: relative;

    & input {
        outline: none;
        border: none;
        width: 100%;
        min-width: 260px;
        padding: 1rem 1rem 1rem 3.25rem;
        border-radius: 5px;
        font-size: 0.875rem;
        font-family: "Nunito", sans-serif;
        font-weight: 700;
        color: #4f657e;

        &::placeholder {
            color: #4f657e;
        }
    }

    & .search_icon {
        padding: 2px;
        color: #bbb;
        position: absolute;
        // top: calc(1rem - 2px);
        top: 1rem;
        left: 1rem;
        cursor: pointer;
    }
}

.back_icon {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    width: fit-content;
    padding: 1px;
    margin-bottom: 0.875rem;
    color: #4f657e;
    cursor: pointer;

    & span {
        padding: 2px 2px 0px 8px;
    }
}

.search_result_text h1 {
    font-size: 1.375rem;

    & span {
        color: #4f657e;
    }
}

@media screen and (min-width: 768px) {
    .search_container {
        width: 90%;
        max-width: 860px;
        margin: auto;
    }

    .search_result_text h1 {
        font-size: 2rem;
    }
}
</style>