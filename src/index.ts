export interface TOCOptions {
  el: HTMLElement | string;
  mode?: 'hash' | 'scroll';
  container?: HTMLElement | string;
  beforeMount?: () => void;
  onMounted?: () => void;
  selector?: string;
  [i: string]: any;
}
const __classCheck = (instance: any, constructor: any) => instance instanceof constructor;

const BlankReg = /\s+/g;

class TOC {
  private el?: HTMLElement;
  private container?: HTMLElement;
  public options?: TOCOptions;
  [i: string]: any;

  constructor(options: TOCOptions = { el: '' }) {
    if (!__classCheck(this, TOC)) return new TOC(options);
    this.options = options;
    this.__isScrollMode__ = this.options!.mode === 'scroll';
    this.elementCheck();
    const { beforeMount, onMounted } = this.options;
    beforeMount && beforeMount();
    this.mount();
    onMounted && onMounted();
  }

  elementCheck() {
    const { container, el } = this.options!;
    const containerEl = container ? (typeof container === 'string' ? document.querySelector(container) : container) : document.body;
    const mountEl = typeof el === 'string' ? document.querySelector(el) : el;
    if (!containerEl) throw new Error('Can not find container element: ' + container);
    if (!mountEl) throw new Error('Can not find el element: ' + el);
    this.el = mountEl as HTMLElement;
    this.container = containerEl as HTMLElement;
  }

  replaceBlank(str: string) {
    return str.trim().replace(BlankReg, '-');
  }

  onClickHandler(e: Event) {
    const target = e.target as HTMLElement;
    if (target!.nodeName.toLowerCase() !== 'a') return;
    const targetId = target.dataset['targetId'];
    const dom = document.querySelector(`#${targetId}`);
    dom &&
      dom.scrollIntoView({
        behavior: 'smooth',
      });
  }

  onListeningClickEvent(dom: HTMLElement) {
    dom.addEventListener('click', this.onClickHandler);
    return () => {
      dom.removeEventListener('click', this.onClickHandler);
    };
  }

  mount() {
    const selector = this.options!.selector || 'h1, h2, h3, h4, h5, h6';
    const headings: HTMLElement[] = [].slice.call(this.container!.querySelectorAll(selector));
    const self = this;
    self.options!.cleanRoot && self.cleanRootElement();

    headings.forEach(function (heading, index) {
      const title = heading.textContent || `${index}`;
      const titleReplaced = self.replaceBlank(title);
      const anchor = document.createElement('a');

      anchor.setAttribute('id', self.__isScrollMode__ ? titleReplaced : title);
      anchor.setAttribute('class', 'toc-anchor');

      const link = document.createElement('a');
      if (self.__isScrollMode__) {
        link.setAttribute('data-target-id', titleReplaced);
        link.setAttribute('href', 'javascript:void(0)');
      } else {
        link.setAttribute('href', '#' + title);
      }
      link.textContent = title;

      const div = document.createElement('div');
      div.setAttribute('class', heading.tagName.toLowerCase());
      if (self.__isScrollMode__) {
        self.__removeListener__ = self.onListeningClickEvent(self.el!);
      }

      div.appendChild(link);
      self.el!.appendChild(div);
      heading.parentNode!.insertBefore(anchor, heading);
    });
  }

  cleanRootElement() {
    this.el!.innerHTML = '';
    if (this.__isScrollMode__ && this.__removeListener__) {
      this.__removeListener__();
      this.__removeListener__ = undefined;
    }
  }
}

export default TOC;
