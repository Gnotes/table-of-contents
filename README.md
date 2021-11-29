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

| Field       | Type                | Required | Comment                                                                                         |
| ----------- | ------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| el          | HTMLElement、String | **Y**    | the root element which toc needs to be mounted                                                  |
| mode        | String              | N        | the way of anchor, default to `hash`, but you can use `scroll` which means scrollIntoView in JS |
| container   | HTMLElement、String | N        | the root element which contains headings, the default is `document.body`                        |
| selector    | String              | N        | css selector of heading tags, default is `h1 ~ h6`                                              |
| beforeMount | Function            | N        | life-cycle hook called _before_ toc mount                                                       |
| onMounted   | Function            | N        | life-cycle hook called _after_ toc mounted                                                      |
| cleanRoot   | Boolean             | N        | clean root element before mounting doms                                                         |
