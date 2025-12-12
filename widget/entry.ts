import { createApp } from 'vue';

import WidgetComponent from '../widget/components/Widget.vue';

import '../app/assets/styles/fonts.scss';
import '../app/assets/styles/global.scss';

function parsePropsFromElement(el: Element) {
  let uuid: string = '';
  let phone: string = '';

  if (!el) {
    return { uuid, phone };
  }

  const dataUuid = el.getAttribute('data-uuid');
  const dataPhone = el.getAttribute('data-phone');

  if (dataUuid && dataPhone) {
    uuid = dataUuid;
    phone = dataPhone;
  }

  return { uuid, phone };
}

function mountWidget() {
  const el = document.querySelector('#tasks-widget');

  console.log('=>>>>>>>> mountWidget', el);

  if (!el) {
    return;
  }

  const props = parsePropsFromElement(el);

  console.log('=>>>>>>>> mountWidget props', props);

  const app = createApp(WidgetComponent, props);

  app.mount(el);
}

mountWidget();
