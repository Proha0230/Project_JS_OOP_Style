import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';
import MiniSlider from './modules/slider/slider-mini';
import Slider5Page from './modules/slider/slider_5_page';
import Difference from './modules/difference';
import Form from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', ()=> {
    const slider = new MainSlider({btns:'.next', container:'.page'});
    slider.render();

    const sliderModuleHtml = new MainSlider({btns:'.next', container:'.moduleapp'});
    sliderModuleHtml.render();

    new VideoPlayer('.module__video-item .play', '.overlay').init();
    new VideoPlayer('.page .play', '.overlay').init();

    new ShowInfo('#moduleTwoButton').init();
    new Download('.download').init();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new Slider5Page ({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active',
    });
    feedSlider.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Form('.form').init();
});