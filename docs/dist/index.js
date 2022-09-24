"use strict";
(() => {
  // node_modules/salt-lib/lib/utils/async.js
  function sleep(time = 120) {
    return new Promise((res) => setTimeout(res, time));
  }
  function docReady(fn) {
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // node_modules/salt-lib/lib/utils/console.js
  function $log(...args) {
    if (!args.length)
      return new Promise((res) => res("")).then(console.log.bind(console));
    return new Promise((res) => res(args[args.length - 1])).then(console.log.bind(console, ...args.slice(0, args.length - 1)));
  }

  // node_modules/salt-lib/lib/utils/dom.js
  function $(selectors, parentElement) {
    if (parentElement)
      return parentElement.querySelector(selectors);
    return document.querySelector(selectors);
  }
  function offset(el) {
    if (!el || !el.getClientRects().length)
      return { top: 0, left: 0 };
    var rect = el.getBoundingClientRect();
    var win = el.ownerDocument.defaultView;
    return { top: rect.top + win.pageYOffset, left: rect.left + win.pageXOffset };
  }

  // document/createSectionUtils.ts
  function createArgsTitle(doc) {
    const { name, default: d, require: require2 } = doc;
    if (d)
      return `[${name}=${d}]`;
    if (require2 === false)
      return `[${name}]`;
    return name;
  }
  function createFuncTitle(doc) {
    const { name, args = [], return: r = "void", gene } = doc;
    const argList = args.map(createArgsTitle);
    return `${name} ${gene ? `<${gene}>` : ""}(${argList.join(", ")}) => ${r}`;
  }
  function appendSubSection(props) {
    const {
      title,
      content,
      titleClassName,
      contentClassName,
      container,
      id,
      heading = "h4"
    } = props;
    if (title) {
      const headLine = document.createElement(heading);
      headLine.className = titleClassName;
      headLine.textContent = title;
      if (id)
        headLine.id = id;
      container.appendChild(headLine);
    }
    if (content) {
      const desc = document.createElement("p");
      desc.className = contentClassName;
      desc.innerHTML = content;
      container.appendChild(desc);
    }
  }
  function html2Escape(str) {
    return str.replace(/[<>&"]/g, (c) => {
      return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] || "";
    });
  }
  function scrollToElById(id) {
    const target = $(`#${id}`);
    if (target) {
      location.hash = id;
      scrollTo({ top: Math.max(0, offset(target).top - 64) });
      return true;
    }
    return false;
  }
  function idFix(id) {
    return id.replace(/\$/g, "__S");
  }

  // document/createMenu.ts
  function createLinks(doc, modelTitle) {
    const { name } = doc;
    const li = document.createElement("li");
    li.className = "menu-function";
    li.setAttribute("name", name);
    const a = document.createElement("a");
    const id = idFix(`${modelTitle}-model-${name}-function`);
    a.href = `#${id}`;
    a.innerHTML = `<div>${name}</div>`;
    a.onclick = (ev) => {
      if (scrollToElById(id))
        ev.preventDefault();
    };
    li.appendChild(a);
    return li;
  }
  function createMenu(doc) {
    const { title, name, main: main2 } = doc;
    const sec = document.createElement("section");
    sec.className = "menu-model";
    sec.setAttribute("name", title);
    const head = document.createElement("div");
    head.className = "menu-model-title";
    const a = document.createElement("a");
    const id = idFix(`${name}-model`);
    a.href = `#${id}`;
    a.innerHTML = `<div>${title}</div>`;
    a.onclick = (ev) => {
      if (scrollToElById(id))
        ev.preventDefault();
    };
    head.appendChild(a);
    sec.appendChild(head);
    const funcList = document.createElement("ul");
    funcList.className = "menu-function-list";
    main2.forEach((funcDoc) => funcList.appendChild(createLinks(funcDoc, name)));
    sec.appendChild(funcList);
    return sec;
  }

  // document/createSection.ts
  function createArgs(doc) {
    const { desc, type } = doc;
    return `<li>
  <code>${createArgsTitle(doc)}</code>: <code>${type}</code> ${desc}
</li>`;
  }
  function createFuncDoc(doc, modelTitle) {
    const { name, desc, args = [], return: r = "void", example = "" } = doc;
    const div = document.createElement("article");
    div.className = "article function";
    div.setAttribute("name", `${modelTitle}-${name}`);
    appendSubSection({
      heading: "h3",
      id: idFix(`${modelTitle}-model-${name}-function`),
      title: createFuncTitle(doc),
      titleClassName: "function-title",
      content: desc,
      contentClassName: "function-desc",
      container: div
    });
    if (args.length) {
      const argsList = [];
      args.forEach((argDoc) => {
        argsList.push(createArgs(argDoc));
      });
      appendSubSection({
        title: "\u53C2\u6570",
        titleClassName: "function-args-title",
        content: `<ul>${argsList.join("")}</ul>`,
        contentClassName: "function-args",
        container: div
      });
    }
    appendSubSection({
      title: "\u8FD4\u56DE",
      titleClassName: "function-return-title",
      content: r.includes("</") && r.includes(">") ? r : `<code>${html2Escape(r)}</code>`,
      contentClassName: "function-return",
      container: div
    });
    if (example.trim()) {
      appendSubSection({
        title: "\u793A\u4F8B",
        titleClassName: "function-example-title",
        content: `<pre class="function-example-code function-example-pre">
import { ${name} } from 'salt-lib'

${html2Escape(example.trim())}
</pre>`,
        contentClassName: "function-example",
        container: div
      });
    }
    return div;
  }
  function createSection(doc) {
    const { title, name, main: main2 } = doc;
    $log(title);
    const sec = document.createElement("section");
    sec.className = "section model";
    sec.setAttribute("name", name);
    const secH3 = document.createElement("h2");
    secH3.className = "model-title";
    secH3.textContent = title;
    secH3.id = idFix(`${name}-model`);
    sec.appendChild(secH3);
    main2.forEach((funcDoc) => {
      sec.appendChild(createFuncDoc(funcDoc, name));
    });
    return sec;
  }

  // document/data/async.ts
  var asyncUtils = {
    title: "\u5F02\u6B65\u65B9\u6CD5 \u201CAsync\u201D Methods",
    name: "async",
    main: [
      {
        name: "sleep",
        desc: "\u5EF6\u8FDF\u4E00\u6BB5\u65F6\u95F4",
        args: [
          {
            name: "time",
            desc: "\u5EF6\u8FDF\u591A\u5C11\u65F6\u95F4\uFF0C\u5355\u4F4D\u6BEB\u79D2(ms)\uFF0C\u9ED8\u8BA4120\u6BEB\u79D2",
            type: "number",
            default: "120"
          }
        ],
        return: "Promise<void>",
        example: "await sleep() // \u7B49\u5F85120ms\nawait sleep(200) // \u7B49\u5F85200ms"
      },
      {
        name: "waitTill",
        desc: "\u4E00\u76F4\u7B49\u5F85\u5230<code>fn</code>\u8FD4\u56DE\u771F\u503C",
        args: [
          {
            name: "fn",
            desc: "\u4F1A\u4E00\u76F4\u7B49\u5F85\u5230\u8FD9\u4E2A\u65B9\u6CD5\u8FD4\u56DE\u771F\u503C",
            type: "() => unknown"
          },
          {
            name: "time",
            desc: "\u8F6E\u8BE2\u65F6\u95F4\u95F4\u9694\uFF0C\u5355\u4F4D\u6BEB\u79D2(ms)\uFF0C\u9ED8\u8BA4120\u6BEB\u79D2",
            type: "number",
            default: "120"
          },
          {
            name: "timeout",
            desc: "\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u51FA\u8FD9\u4E2A\u65F6\u95F4\u540E\u4F1A\u629B\u51FA\u9519\u8BEF\uFF0C\u5355\u4F4D\u6BEB\u79D2(ms)\uFF0C\u9ED8\u8BA4\u4E3A6,0000\u6BEB\u79D2",
            type: "number",
            default: "6e4"
          }
        ],
        return: "Promise<void>",
        example: "await waitTill(() => document.readyState !== 'loading', 200, 60000) // \u6BCF200ms\u68C0\u67E5\u4E00\u6B21\u6587\u6863\u662F\u5426\u51C6\u5907\u5B8C\u6BD5\uFF0C1\u5206\u949F\u540E\u8D85\u65F6\u62A5\u9519"
      },
      {
        name: "defer",
        desc: "\u5C06\u56DE\u8C03\u903B\u8F91\u6539\u5199\u4E3A\u5F02\u6B65\u903B\u8F91\u7684\u65B9\u6CD5",
        return: `{ promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }`,
        example: `async function asyncFn(args) {
  const deferFn = defer()
  const onSuccess = deferFn.resolve // \u6210\u529F\u65F6\u8C03\u7528\u56DE\u8C03
  const onError = deferFn.reject // \u5931\u8D25\u65F6\u8C03\u7528\u56DE\u8C03
  callbackFn(args, onSuccess, onError) // \u8C03\u7528\u56DE\u8C03\u903B\u8F91\u7684\u51FD\u6570
  return deferFn.promise // \u5C06\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570\u5305\u88C5\u4E3A\u5F02\u6B65\u51FD\u6570
}`
      },
      {
        name: "docReady",
        desc: "\u6587\u6863\u51C6\u5907\u5B8C\u6BD5\u540E\u6267\u884C\u56DE\u8C03\uFF0C\u76F8\u5F53\u4E8EjQuery\u7684<code>$(function)</code>",
        args: [
          {
            name: "fn",
            desc: "\u56DE\u8C03\u51FD\u6570",
            type: "() => unknown"
          }
        ],
        example: 'docReady(() => console.log("docReady"))'
      },
      {
        name: "waitDocReady",
        desc: "\u7B49\u5F85\u6587\u6863\u51C6\u5907\u5B8C\u6BD5",
        args: [
          {
            name: "time",
            desc: "\u8F6E\u8BE2\u65F6\u95F4\u95F4\u9694\uFF0C\u5355\u4F4D\u6BEB\u79D2(ms)\uFF0C\u9ED8\u8BA4240\u6BEB\u79D2",
            type: "number",
            default: "240"
          },
          {
            name: "timeout",
            desc: "\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u51FA\u8FD9\u4E2A\u65F6\u95F4\u540E\u4F1A\u629B\u51FA\u9519\u8BEF\uFF0C\u5355\u4F4D\u6BEB\u79D2(ms)\uFF0C\u9ED8\u8BA4\u4E3A12,0000\u6BEB\u79D2",
            type: "number",
            default: "12e4"
          }
        ],
        return: "Promise<void>",
        example: "await waitDocReady(200, 60000) // \u6BCF200ms\u68C0\u67E5\u4E00\u6B21\u6587\u6863\u662F\u5426\u51C6\u5907\u5B8C\u6BD5\uFF0C1\u5206\u949F\u540E\u8D85\u65F6\u62A5\u9519"
      }
    ]
  };
  var async_default = asyncUtils;

  // document/data/console.ts
  var consoleUtils = {
    title: "\u63A7\u5236\u53F0\u65B9\u6CD5 \u201CConsole\u201D Methods",
    name: "console",
    main: [
      {
        name: "$log",
        desc: "\u5728\u63A7\u5236\u53F0\u6253\u5370\u5185\u5BB9\uFF0C\u540C\u65F6<b>\u4E0D\u663E\u793A\u884C\u53F7</b>\uFF08chrome\u3001\u706B\u72D0\u6D4B\u8BD5\u901A\u8FC7\uFF09",
        args: [{ name: "...args", desc: "\u8981\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u7684\u5185\u5BB9", type: "any[]" }],
        return: "Promise<void>",
        example: "$log('[salt-lib]', 123456, true)"
      },
      {
        name: "$warn",
        desc: "\u5728\u63A7\u5236\u53F0\u6253\u5370<b>\u8B66\u544A</b>\u5185\u5BB9\uFF0C\u540C\u65F6<b>\u4E0D\u663E\u793A\u884C\u53F7</b>\uFF08chrome\u3001\u706B\u72D0\u6D4B\u8BD5\u901A\u8FC7\uFF09",
        args: [{ name: "...args", desc: "\u8981\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u7684\u5185\u5BB9", type: "any[]" }],
        return: "Promise<void>",
        example: "$warn('[salt-lib]', 123456, true)"
      },
      {
        name: "$error",
        desc: "\u5728\u63A7\u5236\u53F0\u6253\u5370<b>\u62A5\u9519</b>\u5185\u5BB9\uFF0C\u540C\u65F6<b>\u4E0D\u663E\u793A\u884C\u53F7</b>\uFF08chrome\u3001\u706B\u72D0\u6D4B\u8BD5\u901A\u8FC7\uFF09",
        args: [{ name: "...args", desc: "\u8981\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u7684\u5185\u5BB9", type: "any[]" }],
        return: "Promise<void>",
        example: "$error('[salt-lib]', 123456, true)"
      },
      {
        name: "$info",
        desc: "\u5728\u63A7\u5236\u53F0\u6253\u5370<b>\u6D88\u606F</b>\u5185\u5BB9\uFF0C\u540C\u65F6<b>\u4E0D\u663E\u793A\u884C\u53F7</b>\uFF08chrome\u3001\u706B\u72D0\u6D4B\u8BD5\u901A\u8FC7\uFF09",
        args: [{ name: "...args", desc: "\u8981\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u7684\u5185\u5BB9", type: "any[]" }],
        return: "Promise<void>",
        example: "$info('[salt-lib]', 123456, true)"
      },
      {
        name: "$debug",
        desc: "\u5728\u63A7\u5236\u53F0\u6253\u5370<b>Debug</b>\u5185\u5BB9\uFF0C\u540C\u65F6<b>\u4E0D\u663E\u793A\u884C\u53F7</b>\uFF08chrome\u3001\u706B\u72D0\u6D4B\u8BD5\u901A\u8FC7\uFF09",
        args: [{ name: "...args", desc: "\u8981\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u7684\u5185\u5BB9", type: "any[]" }],
        return: "Promise<void>",
        example: "$debug('[salt-lib]', 123456, true)"
      }
    ]
  };
  var console_default = consoleUtils;

  // document/data/random.ts
  var randomUtils = {
    title: "\u968F\u673A\u6570\u65B9\u6CD5 \u201CRandom\u201D Methods",
    name: "random",
    main: [
      {
        name: "randomInt",
        desc: "\u8FD4\u56DE\u4E00\u4E2A<code>[start, end)</code>\u533A\u57DF\u5185\u7684\u6574\u6570",
        args: [
          { name: "start", desc: "\u533A\u95F4\u6700\u5C0F\u503C", type: "number", default: "0" },
          {
            name: "end",
            desc: "\u533A\u95F4\u6700\u5927\u503C\uFF0C\u7ED3\u679C\u4E2D<b>\u4E0D\u5305\u62EC</b>\u6B64\u6570",
            type: "number",
            default: "100"
          }
        ],
        return: "number",
        example: ""
      },
      {
        name: "randomIntCeil",
        desc: "\u8FD4\u56DE\u4E00\u4E2A<code>(start, end]</code>\u533A\u57DF\u5185\u7684\u6574\u6570",
        args: [
          {
            name: "start",
            desc: "\u533A\u95F4\u6700\u5C0F\u503C\uFF0C\u7ED3\u679C\u4E2D<b>\u4E0D\u5305\u62EC</b>\u6B64\u6570",
            type: "number",
            default: "0"
          },
          { name: "end", desc: "\u533A\u95F4\u6700\u5927\u503C", type: "number", default: "100" }
        ],
        return: "number",
        example: ""
      },
      {
        name: "randomIntBoth",
        desc: "\u8FD4\u56DE\u4E00\u4E2A<code>[start, end]</code>\u533A\u57DF\u5185\u7684\u6574\u6570",
        args: [
          { name: "start", desc: "\u533A\u95F4\u6700\u5C0F\u503C", type: "number", default: "0" },
          { name: "end", desc: "\u533A\u95F4\u6700\u5927\u503C", type: "number", default: "100" }
        ],
        return: "number",
        example: ""
      },
      {
        name: "randomChoice",
        desc: "\u4ECE\u6570\u7EC4\u6216\u7C7B\u6570\u7EC4\u4E2D\u968F\u673A\u62BD\u53D6\u4E00\u4E2A\u5143\u7D20",
        gene: "T",
        args: [{ name: "arr", type: "ArrayLike<T>", desc: "\u6570\u7EC4\u6216\u7C7B\u6570\u7EC4" }],
        return: "T",
        example: "randomChoice([1, 2, 3])\nrandomChoice({ 1: 1, 2: 2, 3: 3, length: 3 })"
      },
      {
        name: "randomHex",
        desc: "\u5FEB\u901F\u751F\u6210\u5341\u516D\u8FDB\u5236\u5B57\u7B26\u4E32<code>0 1 ... e f</code>",
        args: [
          {
            name: "len",
            type: "number",
            desc: "\u5B57\u7B26\u4E32\u957F\u5EA6\uFF0C<b>\u4E0D\u80FD\u8D85\u8FC713</b>"
          }
        ],
        return: "string",
        example: "randomHex(4) // ae53, bcf9, 098e ...\nrandomHex(2) // a3, 79, 2e ..."
      },
      {
        name: "uuidV4",
        desc: '\u751F\u6210\u4E00\u4E2Av4\u7248uuid\uFF0C\u9075\u5FAA<a href="https://www.ietf.org/rfc/rfc4122.txt">RFC4122</a>\u89C4\u8303',
        return: "string"
      },
      {
        name: "uuidRandom",
        desc: "\u751F\u6210\u4E00\u4E2A\u5168\u968F\u673Auuid\uFF0C\u7C7B\u4F3Cv4\uFF0C\u4F46\u662F\u7248\u672C\u4F4D\u548C\u53D8\u578B\u4F4D\u4E5F\u968F\u673A",
        return: "string"
      }
    ]
  };
  var random_default = randomUtils;

  // document/data/object.ts
  var objectUtils = {
    title: "\u5BF9\u8C61\u64CD\u4F5C\u65B9\u6CD5 \u201Cobject\u201D Methods",
    name: "object",
    main: [
      {
        name: "isUnsafePropName",
        desc: "\u662F\u5426\u53EF\u7528\u4E8E\u5C5E\u6027\u540D\u653B\u51FB",
        args: [
          {
            name: "propName",
            desc: "\u8981\u68C0\u67E5\u7684\u5C5E\u6027\u540D",
            type: "string | number"
          }
        ],
        return: "boolean",
        example: "isUnsafePropName('__proto__') // true\nisUnsafePropName('123') // false"
      },
      {
        name: "isSafePropName",
        desc: "\u662F\u5426\u4E0D\u53EF\u7528\u4E8E\u5C5E\u6027\u540D\u653B\u51FB",
        args: [
          {
            name: "propName",
            desc: "\u8981\u68C0\u67E5\u7684\u5C5E\u6027\u540D",
            type: "string | number"
          }
        ],
        return: "boolean",
        example: "isSafePropName('__proto__') // false\nisSafePropName('123') // true"
      },
      {
        name: "filterUnsafeProp",
        desc: "\u5C06\u5BF9\u8C61\u4E2D\u53EF\u679A\u4E3E<code>enumerable</code>\u7684\u4E0D\u5B89\u5168\u5C5E\u6027\u8BBE\u4E3A<code>undefined</code>",
        gene: "T extends object",
        args: [
          {
            name: "obj",
            type: "T",
            desc: "\u9700\u8981\u68C0\u67E5\u7684\u5BF9\u8C61"
          }
        ],
        return: "T",
        example: "filterUnsafeProp({a: 'a', toString: () => 'awa'}) // {a: 'a', toString: undefined}"
      },
      {
        name: "extend",
        desc: "\u4F7F\u7528<code>prop</code>\u62D3\u5C55<code>obj</code>\uFF0C\u53EF\u4EE5\u6307\u5B9A\u5C5E\u6027",
        gene: "O extends object, N extends object",
        args: [
          { name: "obj", desc: "\u88AB\u62D3\u5C55\u7684\u5BF9\u8C61", type: "O" },
          { name: "prop", desc: "\u62D3\u5C55\u7528\u7684\u5BF9\u8C61", type: "N" },
          {
            name: "options",
            desc: "\u9ED8\u8BA4\u4E3A\u4E0D\u53EF\u679A\u4E3E\u3001\u53EF\u4FEE\u6539\u3001\u53EF\u5199\u5165",
            type: "{ enumerable?: boolean; configurable?: boolean; writable?: boolean }",
            require: false
          }
        ],
        return: "O & N",
        example: 'extend({ a: "a" }, { b: "b" }) // { a: "a", b: "b" } \u5176\u4E2D\u201Cb\u201D\u662F\u4E0D\u53EF\u679A\u4E3E\u7684'
      },
      {
        name: "deepClone",
        desc: `
\u6DF1\u5EA6\u514B\u9686\uFF08\u5168\u590D\u5236\uFF09\u4E00\u4E2A\u7B80\u5355\u5BF9\u8C61<code>{}</code>\u6216\u6570\u7EC4<code>[]</code>\uFF0C\u53EF\u4EE5\u5904\u7406\u5FAA\u73AF\u5F15\u7528\u4E4B\u7C7B\u7684\u7279\u6B8A\u573A\u666F
<br/>
<b>\u65E0\u6CD5</b>\u6B63\u786E\u5904\u7406<code>String</code>\u3001<code>Number</code>\u3001<code>Date</code>\u3001<code>Set</code>\u4E4B\u7C7B\u7684\u7279\u6B8A\u5BF9\u8C61
<br/>
\u5982\u679C\u8981\u5904\u7406\u8FD9\u4E9B\u7279\u6B8A\u7684\u5BF9\u8C61\uFF0C\u8BF7\u5C1D\u8BD5<code>deepClonePlus</code>`,
        gene: "T",
        args: [
          {
            name: "obj",
            type: "T",
            desc: "\u9700\u8981\u5168\u590D\u5236\u7684\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u662F\u7B80\u5355\u5BF9\u8C61\u6216\u6570\u7EC4"
          }
        ],
        return: "T",
        example: 'deepClone([[[{ a: "a" }]]]) // [[[{ a: "a" }]]]'
      },
      {
        name: "deepClonePlus",
        desc: `
\u6DF1\u5EA6\u514B\u9686\uFF08\u5168\u590D\u5236\uFF09\u4E00\u4E2A\u5BF9\u8C61<code>{}</code>\u6216\u6570\u7EC4<code>[]</code>\uFF0C\u53EF\u4EE5\u5904\u7406\u5FAA\u73AF\u5F15\u7528\u4E4B\u7C7B\u7684\u7279\u6B8A\u573A\u666F
<br/>
\u53EF\u4EE5\u6B63\u786E\u5904\u7406<code>String</code>\u3001<code>Number</code>\u3001<code>Date</code>\u3001<code>Set</code>\u4E4B\u7C7B\u7684\u7279\u6B8A\u5BF9\u8C61
<br/>
\u4F46\u662F\u6027\u80FD\u4E0D\u5982<code>deepClone</code>`,
        gene: "T",
        args: [
          {
            name: "obj",
            type: "T",
            desc: "\u9700\u8981\u5168\u590D\u5236\u7684\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u662F\u7B80\u5355\u5BF9\u8C61\u6216\u6570\u7EC4"
          }
        ],
        return: "T",
        example: `
const loopSet = { set: new Set() }
loopSet.set.add(loopSet) // \u4F7F\u7528Set\u5F15\u7528\u81EA\u8EAB

const loopSetClone = deepClonePlus(loopSet)
loopSetClone.set.has(loopSetClone) // true
`
      }
    ]
  };
  var object_default = objectUtils;

  // document/index.ts
  var models = [async_default, console_default, random_default, object_default];
  var menu = $("#menu");
  var main = $("#main");
  models.forEach((model) => {
    menu.appendChild(createMenu(model));
    main.appendChild(createSection(model));
  });
  docReady(async () => {
    await sleep(240);
    const id = location.hash.replace(/^#/, "");
    if (id)
      scrollToElById(id);
  });
})();
//# sourceMappingURL=index.js.map
