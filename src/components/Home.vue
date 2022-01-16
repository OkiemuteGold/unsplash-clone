<template>
    <div v-if="getSearchedPhotos || getAllPhotosList">
        <div class="wrapper">
            <div v-for="photo in getSearchedPhotos" :key="photo.id">
                <div class="image_container">
                    <div
                        class="image_container_bg"
                        :style="`backgroundImage: url(${photo.urls.regular})`"
                    ></div>

                    <div class="photo_details" v-if="!isLoading">
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

export default {
    data() {
        return {
            query: "african",
        };
    },

    computed: {
        ...mapGetters(["getSearchedPhotos", "getAllPhotosList", "isLoading"]),
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem 2rem;
    max-width: 750px;
    margin: -2rem auto 0;
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
        transition: 0.3s;

        // &:nth-child(2n + 1) {
        //     height: 200px;
        // }

        &::before {
            background: linear-gradient(
                to bottom,
                rgba(54, 46, 46, 0.125),
                rgba(54, 46, 46, 0.35),
                rgba(54, 46, 46, 0.625),
                rgba(54, 46, 46, 0.825)
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
        transform: scale(1.05);
        cursor: pointer;
    }

    .photo_details {
        position: absolute;
        bottom: 1.5rem;
        left: 1rem;
        color: #f2f2f2;

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

@media screen and (min-width: 375px) {
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (min-width: 768px) {
    .wrapper {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>