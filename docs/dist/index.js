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
    const { name, args = [], return: r = "void" } = doc;
    const argList = args.map(createArgsTitle);
    return `${name} (${argList.join(", ")}) => ${r}`;
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

  // document/createMenu.ts
  function createLinks(doc, modelTitle) {
    const { name } = doc;
    const li = document.createElement("li");
    li.className = "menu-function";
    li.setAttribute("name", name);
    const a = document.createElement("a");
    const id = `${modelTitle}-model-${name}-function`;
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
    const id = `${name}-model`;
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
      id: `${modelTitle}-model-${name}-function`,
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
    if (example) {
      appendSubSection({
        title: "\u793A\u4F8B",
        titleClassName: "function-example-title",
        content: `<pre class="function-example-code function-example-pre">
import { ${name} } from 'salt-lib'

${html2Escape(example)}
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
    secH3.id = `${name}-model`;
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

  // document/index.ts
  var models = [async_default];
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
