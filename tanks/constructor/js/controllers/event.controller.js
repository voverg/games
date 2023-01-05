import { Controller } from './controller.js';

export class EventController extends Controller {
  init(props) {
    super.init(props);

    this.types = {
      tile: this.handleTile,
      save: this.handleSave,
    }

    this.setListeners();
  }

  update() {}

  setListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      this.checkType({type: target.dataset.type, target});
    });
  }

  checkType(props) {
    if (props.type in this.types) {
      this.types[props.type](props);
    }
  }

  handleTile = ({target}) => {
    if (target.closest('.aside')) {
      this.actions.setAsideTileId(target.id);
    } else if (target.closest('.board')) {
      this.actions.setBoardTileId(target.id);
    }
  }

  handleSave = () => {
    this.actions.setIsSave(true);
    this.animateSpoiler();
  }

  animateSpoiler() {
    const $spoiler = document.querySelector('.aside__spoiler');
    $spoiler.classList.add('aside__spoiler--show');

    setTimeout(() => {
      $spoiler.classList.remove('aside__spoiler--show');
    }, 3000);
  }

}