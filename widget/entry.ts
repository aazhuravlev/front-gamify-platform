// import { createApp } from 'vue';

// import WidgetComponent from '../widget/components/Widget.vue';

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

function mountElement(el: Element) {
  const props = parsePropsFromElement(el);

  console.log('=>>>>>>>> mountWidget props', props);

  // const app = createApp(WidgetComponent, props);
  //
  // app.mount(el);
}

function mountWidget() {
  let el: Element | null = document.querySelector('#tasks-widget');
  let interval: NodeJS.Timeout | null = null;
  let qty = 0;

  if (!el) {
    interval = setInterval(() => {
      el = document.querySelector('#tasks-widget');
      console.log('=>>>>>>>>>> interval', el);
      qty++;

      if (el || qty === 10) {
        clearInterval(interval!);
        interval = null;

        if (el) {
          mountElement(el);
        }
      }
    }, 1000);
  }

  if (el) {
    mountElement(el);
  }
}

mountWidget();
