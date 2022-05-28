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

                            <a
                                class="download_image_link"
                                :href="imageDownloadUrl"
                                :download="idModal"
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
                            </a>
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
        "imageDownloadUrl",
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
        -o-object-position: 48% 40%;
        object-position: 48% 40%;
    }

    & .expanded_image_footer {
        background: #fff;
        border-radius: 0 0 5px 5px;
        padding: 1.35rem 2rem;
        position: relative;

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

        & .download_image_link {
            position: absolute;
            top: -2.5rem;
            right: 0.65rem;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            width: 2rem;
            padding: 5px;
            // border-radius: 5px;

            &:hover {
                transform: scale(1.1);
            }

            svg {
                height: 1.125rem;
                width: 1.125rem;
                fill: #63453c;
            }
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