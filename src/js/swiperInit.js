import Swiper, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

if (window.innerWidth < 500) {
  const swiper = new Swiper(".swiper", {
    modules: [Pagination],
    slidesPerView: 2,
    spaceBetween: 190,

    pagination: {
      el: ".swiper-pagination",
    },
  });
}
