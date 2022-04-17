<template>
    <div
        class="modal fade"
        :id="`${idModal}`"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        :aria-labelledby="`${idModal}Label`"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0 p-lg-3 close_modal">
                    <button
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        title="close"
                        class="close_image_btn"
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="times"
                            class="svg-inline--fa fa-times fa-w-11"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 352 512"
                        >
                            <path
                                fill="currentColor"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            ></path>
                        </svg>
                    </button>

                    <div class="expanded_image_wrapper">
                        <img
                            :src="expandedImgSrc"
                            :alt="expandedImgAlt"
                            class="image"
                        />

                        <div
                            class="expanded_image_footer"
                            v-if="expandedImgSrc"
                        >
                            <h2 v-if="author">{{ author }}</h2>
                            <p v-if="location">{{ location }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "idModal",
        "expandedImgSrc",
        "expandedImgAlt",
        "author",
        "location",
    ],
};
</script>

<style lang="scss" scoped>
.modal {
    overflow-x: hidden;
}

.modal-content {
    background: transparent;
    border: none;
}

.close_modal {
    position: relative;
}

.close_modal .close_image_btn {
    position: absolute;
    top: -35px;
    left: 0;
    right: 0;
    margin: auto;
    background: transparent;
    border-radius: 50%;

    &:hover {
        background: rgba(0, 0, 0, 0.25);
    }

    & svg {
        height: 1.95rem;
        width: 1.95rem;
        padding: 3px;
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
    }

    &:hover svg {
        transform: scale(0.825);
    }
}

.expanded_image_wrapper {
    height: 400px;
    width: 100%;
    margin: 0 auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .image {
        min-height: 300px;
        border-radius: 5px 5px 0 0;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: 48%;
        object-position: 48%;
    }

    & .expanded_image_footer {
        background: #fff;
        border-radius: 0 0 5px 5px;
        padding: 1.35rem 2rem;

        & h2 {
            font-size: 1.375rem;
            margin-bottom: 0;
        }

        & p {
            font-size: 0.875rem;
            color: #4f657e;
            margin-top: 0.25rem;
            margin-bottom: 0;
        }
    }
}

@media screen and (min-width: 768px) {
    .close_modal .close_image_btn {
        top: -70px;
        left: 100%;
    }

    .expanded_image_wrapper .image {
        min-height: 100%;
    }
}

@media screen and (min-width: 1440px) {
    .close_modal .close_image_btn {
        top: -25%;
    }

    .expanded_image_wrapper .image {
        min-height: 65vh;
    }
}
</style>