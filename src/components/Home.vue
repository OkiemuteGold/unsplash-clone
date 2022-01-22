<template>
    <div v-if="getSearchedPhotos">
        <div class="wrapper">
            <div v-for="photo in getSearchedPhotos" :key="photo.id">
                <div
                    class="image_container"
                    @click="expandPhoto(photo, $event)"
                >
                    <div
                        class="image_container_bg"
                        :style="`backgroundImage: url(${photo.urls.regular})`"
                        title="View photo"
                        v-if="photo"
                        data-bs-toggle="modal"
                        :data-bs-target="`#MY${photo.id}`"
                    ></div>

                    <Modal
                        :idModal="`MY${photo.id}`"
                        :expandedImgSrc="photo.urls.regular"
                        :expandedImgAlt="photo.alt_description"
                        :author="photo.user.name"
                        :location="photo.user.location"
                    />

                    <div class="photo_details">
                        <h1 class="name">{{ photo.user.name }}</h1>
                        <p class="location">
                            {{ photo.user.location }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- <div v-if="!invalidInput">
                <div class="overlay"></div>
                <div class="expanded_image_wrapper">
                    <div class="close_image" @click="closeExpandedPhoto()">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="times"
                            class="
                                svg-inline--fa
                                fa-times fa-w-11
                                close_image_svg
                            "
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 352 512"
                        >
                            <path
                                fill="currentColor"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            ></path>
                        </svg>
                    </div>

                    <img :src="expandedImgSrc" :alt="expandedImgAlt" />

                    <div class="expanded_image_footer" v-if="expandedImgSrc">
                        <h2>{{ author }}</h2>
                        <p>{{ location }}</p>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "./Modal.vue";

export default {
    components: { Modal },
    data() {
        return {
            expandedImgSrc: "",
            // expandedImgAlt: "",
            // author: "",
            // location: "",
            // id: "",
        };
    },

    computed: {
        ...mapGetters(["getSearchedPhotos"]),

        invalidInput() {
            return this.expandedImgSrc === "";
        },
    },

    methods: {
        expandPhoto(otherParams, e) {
            let item = e.target;

            let style =
                    item.currentStyle || window.getComputedStyle(item, false),
                bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");

            if (item.className === "image_container_bg") {
                this.expandedImgSrc = bi;
                // this.expandedImgAlt = otherParams.alt_description;
                // this.author = otherParams.user.name;
                // this.location = otherParams.user.location;
                // this.id = otherParams.id;
            }

            // console.log(item, otherParams, this.expandedImgAlt, bi);
        },

        // closeModal: function () {
        //     this.$store.dispatch("closeModal");
        // },

        // closeExpandedPhoto() {
        //     this.expandedImgSrc = "";
        //     this.closeModal();
        // },
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
        bottom: 1.5rem;
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

.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    margin: auto;
    background: rgba(0, 0, 0, 0.45);
    overflow: hidden;
}

.expanded_image_wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 350px;
    max-width: 650px;
    margin: auto;
    padding: 10px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;

    & img {
        height: 100%;
        width: 100%;
        border-radius: 5px 5px 0 0;
        -o-object-fit: cover;
        object-fit: cover;
    }

    & .expanded_image_footer {
        background: #fff;
        border-radius: 0 0 5px 5px;
        padding: 1.5rem 2.75rem;
        margin-top: -5.85px;

        & h2 {
            font-size: 1.375rem;
            margin-bottom: 0.5rem;
        }

        & p {
            font-size: 0.875rem;
            color: #4f657e;
        }
    }

    & .close_image {
        position: absolute;
        top: -1rem;
        right: 50%;
        left: 50%;
        height: 1.75rem;
        width: 1.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        background: transparent;
        color: #fff;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            background: rgba(0, 0, 0, 0.15);
        }

        & svg {
            height: 1.125rem;
            width: 1.125rem;
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

    .expanded_image_wrapper .close_image {
        top: -1.25rem;
        right: -2.5rem;
        left: 100%;
    }
}

@media screen and (min-width: 1440px) {
    .expanded_image_wrapper {
        max-height: 440px;
        max-width: 700px;
        padding: 5px;
    }
}
</style>