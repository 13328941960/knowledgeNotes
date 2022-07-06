(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{222:function(s,t,e){"use strict";e.r(t);var r=e(6),v=Object(r.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"前端安全"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端安全"}},[s._v("#")]),s._v(" 前端安全")]),s._v(" "),t("h2",{attrs:{id:"xss"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#xss"}},[s._v("#")]),s._v(" xss")]),s._v(" "),t("p",[s._v("xss是跨站脚本攻击的简称，英文全名cross site scripting，为了与叠层样式简称css不重名，改名为xss。")]),s._v(" "),t("p",[s._v("xss 攻击是指攻击者通过在客户端注入恶意代码，对页面进行篡改，接着在用户进入页面后，会被其控制或者被获取隐私数据。")]),s._v(" "),t("p",[s._v("xss攻击有三种类型：")]),s._v(" "),t("ul",[t("li",[s._v("反射性XSS：这种攻击只是简单的把用户输入的数据反射给浏览器，往往诱导用户点击一个链接，或一个表单，注入一段恶意代码。")]),s._v(" "),t("li",[s._v("存储型: 这种攻击是把恶意代码数据储存到服务器，当浏览器请求时恶意代码会被执行。一般会在某网站的评论区下注入一段恶意代码，接着等其他用户进入网站就会被执行")]),s._v(" "),t("li",[s._v("基于DOM型：这种攻击是通过恶意代码修改DOM结构，是纯粹发生在客户端的攻击")])]),s._v(" "),t("h3",{attrs:{id:"xss-攻击的防范"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#xss-攻击的防范"}},[s._v("#")]),s._v(" XSS 攻击的防范")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("HttpOnly 防止劫取 Cookie")])]),s._v(" "),t("li",[t("p",[s._v("输入检查\n不要相信用户的任何输入")])])]),s._v(" "),t("h2",{attrs:{id:"csrf-corss-site-request-forgery-跨站请求伪造"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#csrf-corss-site-request-forgery-跨站请求伪造"}},[s._v("#")]),s._v(" CSRF: Corss Site Request Forgery 跨站请求伪造")]),s._v(" "),t("p",[s._v("是一种劫持受信任用户向服务器发送非预期的请求，这种攻击一般是通过借助受害者的cookie，在受害者不知情的情况下，以受害者的名义伪造请求发送给服务器。")]),s._v(" "),t("p",[s._v("假设在 www.c.com网站中，如果用户想删除一个帖子，需要调用www.c.com/content/delete/id，如果想要删除id为6666，则需要调用www.c.com/content/delete/6666，")]),s._v(" "),t("p",[s._v("而恶意攻击者，可能会将该请求地址放在恶意网站的img标签中，如果此时受害者点击该img标签，那么会发现原来的帖子也被删除了。")]),s._v(" "),t("p",[s._v("CSRF 攻击的防范\n1.Referer Check")]),s._v(" "),t("p",[s._v("Referer是请求头中的一个字段，放入当前的网站地址，这样如果恶意网站去调用该网站的请求时，服务器就会进行验证，判断是不是来自该网站的地址，而如果是别的网站发起的，那么服务器就会拒绝请求。")]),s._v(" "),t("p",[s._v("添加 token 验证\n可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。")])])}),[],!1,null,null,null);t.default=v.exports}}]);