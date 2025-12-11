import { createApp } from 'vue';

import WidgetComponent from '../widget/components/Widget.vue';

import '../app/assets/styles/fonts.scss';
import '../app/assets/styles/global.scss';

function parsePropsFromElement(el: Element) {
  let uuid: string = '';

  if (!el) {
    return { uuid };
  }

  const data = el.getAttribute('data-uuid');

  if (data) {
    uuid = data;
  }

  return { uuid };
}

function mountWidget() {
  const el = document.querySelector('#tasks-widget');

  if (!el) {
    return;
  }

  const props = parsePropsFromElement(el);

  const app = createApp(WidgetComponent, props);

  app.mount(el);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}
