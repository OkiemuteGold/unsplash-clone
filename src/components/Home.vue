<template>
    <div v-if="getSearchedPhotos">
        <div class="wrapper">
            <div v-for="photo in getSearchedPhotos" :key="photo.id">
                <div class="image_container">
                    <div
                        class="image_container_bg"
                        :style="`backgroundImage: url(${photo.urls.regular})`"
                        title="Expand and download"
                        v-if="photo.urls.regular"
                        data-bs-toggle="modal"
                        :data-bs-target="`#MY${photo.id}`"
                        @click="getImageUrl(photo.id)"
                    >
                        <!-- <a
                            class="download_image_link"
                            :href="imageDownloadUrl"
                            :download="`MY${photo.id}`"
                            title="download"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"
                                />
                            </svg>
                        </a> -->
                    </div>

                    <Modal
                        :idModal="`MY${photo.id}`"
                        :expandedImgSrc="photo.urls.regular"
                        :expandedImgAlt="photo.alt_description"
                        :author="photo.user.name"
                        :location="photo.user.location"
                        :imageDownloadUrl="imageDownloadUrl"
                    />

                    <div class="photo_details">
                        <h1 class="name">{{ photo.user.name }}</h1>
                        <p class="location">
                            {{ photo.user.location }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "./Modal.vue";
import axios from "axios";

export default {
    components: { Modal },

    computed: {
        ...mapGetters(["getSearchedPhotos"]),
    },

    data() {
        return {
            imageDownloadUrl: "",
        };
    },

    methods: {
        async toDataURL(url) {
            const response = await fetch(url);
            const blob = await response.blob();
            const imageUrl = window.URL.createObjectURL(blob);
            // console.log(imageUrl);
            this.imageDownloadUrl = imageUrl;
        },

        getImageUrl(id) {
            /* 
                mine own --- MnwyOTE0ODZ8MHwxfHNlYXJjaHwxfHxBZnJpY2FufGVufDB8fHx8MTY1Mzc0NDg3OQ
                from site --- MnwxMTc4ODl8MHwxfHNlYXJjaHwxfHxwdXBweXxlbnwwfHx8fDE2MTc3NTA2MTM
            */

            const url = this.$store.state.baseURL;
            const key = this.$store.state.apiKey;
            const ixid =
                "MnwyOTE0ODZ8MHwxfHNlYXJjaHwxfHxBZnJpY2FufGVufDB8fHx8MTY1Mzc0NDg3OQ";

            const endpoint = `${url}/photos/${id}/download?ixid=${ixid}&client_id=${key}`;

            axios
                .get(endpoint)
                .then((response) => {
                    let url = response.data.url;
                    this.toDataURL(url);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    max-width: 780px;
    margin: -2.25rem auto 0;
    padding: 0 1.25rem 100px;
}

.image_container {
    position: relative;

    & .image_container_bg {
        position: relative;
        height: 280px;
        width: 100%;
        border-radius: 5px;
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);

        // &:nth-child(2n + 1) {
        //     height: 200px;
        // }

        &::before {
            background: linear-gradient(
                to bottom,
                rgba(54, 46, 46, 0.0125),
                rgba(54, 46, 46, 0.275),
                rgba(54, 46, 46, 0.6),
                rgba(54, 46, 46, 0.925)
            );
            position: absolute;
            content: "";
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            border-radius: 5px;
        }

        // & .download_image_link {
        //     position: absolute;
        //     top: 3px;
        //     right: 3px;
        //     background: #fff;
        //     display: none;
        //     align-items: center;
        //     justify-content: center;
        //     height: 1.5rem;
        //     width: 1.5rem;
        //     padding: 5px;
        //     border-radius: 5px;

        //     &:hover {
        //         transform: scale(1.1);
        //     }

        //     svg {
        //         height: 1.125rem;
        //         width: 1.125rem;
        //         fill: #63453c;
        //     }
        // }

        // &:hover .download_image_link {
        //     display: flex;
        // }
    }

    &:hover > .image_container_bg {
        -o-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
        cursor: zoom-out;
    }

    .photo_details {
        position: absolute;
        bottom: 0.5rem;
        left: 1rem;
        color: #fff;

        & .name {
            font-size: 1rem;
            margin-bottom: 0.175rem;
        }

        & .location {
            font-size: 0.75rem;
            text-transform: capitalize;
        }
    }
}

@media screen and (min-width: 425px) {
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
        -moz-column-gap: 1rem;
        -webkit-column-gap: 1rem;
        column-gap: 1rem;
        padding: 0 0.75rem 100px;
    }
}

@media screen and (min-width: 768px) {
    .wrapper {
        grid-template-columns: repeat(3, 1fr);
        -moz-column-gap: 2rem;
        -webkit-column-gap: 2rem;
        column-gap: 2rem;
    }
}
</style>