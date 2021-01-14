# Table of contents

Crawling all heading tags of page and generating TOC automatically.

**Styling TOC by your self.**

### Install

- Module

```bash
npm i @xinghe/toc -S
# or
yarn add @xinghe/toc -S
```

- CDN

```js
<script src="https://unpkg.com/@xinghe/toc@1.0.1/lib/index.umd.js" />
```

### Usage

```js
new TOC({ el: '#toc' });
```

### Configuration

| Field       | Type                | Comment                                                                                |
| ----------- | ------------------- | -------------------------------------------------------------------------------------- |
| el          | HTMLElement、String | **Required**, the root element which toc needs to be mounted                           |
| container   | HTMLElement、String | **Optional**, the rool element which contains headings, the default is `document.body` |
| beforeMount | Function            | **Optional**, life-cycle hook called _before_ toc mount                                |
| onMounted   | Function            | **Optional**, life-cycle hook called _after_ toc mounted                               |
