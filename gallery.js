import galleryItems from './gallery-items.js'
const modalImgElem = document.querySelector('.lightbox_image')
const closeBtnElem = document.querySelector('.lightbox_button')
const galleryElem = document.querySelector('.js-gallery')
const modalElem = document.querySelector('.js-lightbox')
const overlayElem = document.querySelector('.lightbox_overlay')

const galleryListElem = createGalleryList(galleryItems)

galleryElem.insertAdjacentHTML('beforeend', galleryListElem)

galleryElem.addEventListener('click', onOpenModal)
closeBtnElem.addEventListener('click', onCloseModal)
overlayElem.addEventListener('click', onCloseModalOnOverlay)

function createGalleryList(img) {
    return img
        .map(({ original, description, preview }) => {
            return `<li class="gallery_item">
    <a
      class="gallery_link"
      href="${original}"
    >
      <img
        class="gallery_image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
        })
        .join('')
}

function onOpenModal(event) {
    event.preventDefault()
        // Проверяем тип узла, если не изображение - выходим из функции
    if (event.target.nodeName !== 'IMG') {
        return
    }
    document.addEventListener('keydown', onCloseModalByEsc)

    modalElem.classList.add('is-open')
    modalImgElem.src = event.target.dataset.source
    modalImgElem.alt = event.target.alt
}

function onCloseModal(event) {
    document.removeEventListener('keydown', onCloseModalByEsc)
    modalElem.classList.remove('is-open')
    modalImgElem.src = ''
}

function onCloseModalByEsc(event) {
    if (event.code === 'Escape') {
        onCloseModal()
    }
}

function onCloseModalOnOverlay(event) {
    if (event.currentTarget === event.target) {
        onCloseModal()
    }
}