<template>
    <div v-if="getSearchedPhotos">
        <div class="wrapper">
            <div v-for="photo in getSearchedPhotos" :key="photo.id">
                <div class="image_container">
                    <div
                        class="image_container_bg"
                        :style="`backgroundImage: url(${photo.urls.regular})`"
                        title="View photo"
                        v-if="photo.urls.regular"
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
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "./Modal.vue";

export default {
    components: { Modal },

    computed: {
        ...mapGetters(["getSearchedPhotos"]),
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