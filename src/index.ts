export interface TOCOptions {
  el: HTMLElement | string;
  container?: HTMLElement | string;
  beforeMount?: () => void;
  onMounted?: () => void;
  selector?: string;
  [i: string]: any;
}
const __classCheck = (instance: any, constructor: any) => instance instanceof constructor;

class TOC {
  private el?: HTMLElement;
  private container?: HTMLElement;
  public options?: TOCOptions;

  constructor(options: TOCOptions = { el: '' }) {
    if (!__classCheck(this, TOC)) return new TOC(options);
    this.options = options;
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

  mount() {
    const selector = this.options!.selector || 'h1, h2, h3, h4, h5, h6';
    const headings: HTMLElement[] = [].slice.call(this.container!.querySelectorAll(selector));
    const self = this;
    self.options!.cleanRoot && self.cleanRootElement();

    headings.forEach(function(heading, index) {
      var title = heading.textContent || `${index}`;
      var anchor = document.createElement('a');
      anchor.setAttribute('id', title);
      anchor.setAttribute('class', 'toc-anchor');

      var link = document.createElement('a');
      link.setAttribute('href', '#' + title);
      link.textContent = title;

      var div = document.createElement('div');
      div.setAttribute('class', heading.tagName.toLowerCase());

      div.appendChild(link);
      self.el!.appendChild(div);
      heading.parentNode!.insertBefore(anchor, heading);
    });
  }

  cleanRootElement() {
    this.el!.innerHTML = '';
  }
}

export default TOC;
