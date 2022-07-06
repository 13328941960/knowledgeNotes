# 网络请求

浏览器发送一个网络请求的整体过程：

### 构建请求

浏览器会自动构建请求行

GET HTTP/1.1

### 检查是否有强缓存

先检查强缓存，如果有直接使用缓存，否则发送请求

### DNS解析

发送网络请求是从输入URL开始，但是数据包是以IP地址的方式传输到服务器。
在这过程中需要依赖一个系统——DNS，将域名转成IP，这个转化的过程就叫做DNS解析。
注意：浏览器有DNS缓存功能，即解析过的DNS可以直接获取而不需要再次解析。

### 建立TCP连接
TCP是一种连接的、可靠的、基于字节流的传输通信协议。

建立TCP的过程分成三步：

1. 三次握手（即总共发送3个数据包确认已经建立连接）建立客户端和服务端的连接。

2. 数据传输：

    （1）确认机制：在对方接受到数据后必须向对方确认收到，否则会被认为数据丢失

    （2）大包拆小包机制：在传输过程会将大数据包拆成一个一个小包，接收方再将小包拼成大包。

3. 四次挥手：断开连接接口通过四次挥手来完成。

### 发送HTTP请求

已经连接完成，此时要发送HTTP请求：

1. 浏览器发送请求包括：请求行、请求头、请求体

请求头
```
请求方法是GET，路径为根路径，HTTP协议版本为1.1
GET / HTTP/1.1
```

请求行

同时也要带上请求头，比如我们之前说的Cache-Control、If-Modified-Since、If-None-Match都由可能被放入请求头中作为缓存的标识信息。
当然了还有一些其他的属性，列举如下:

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: keep-alive
Cookie: /* 省略cookie信息 */
Host: www.baidu.com
Pragma: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1
```
最后是请求体

```
currentUid: 5cc811495188252d740bfa1c
targetUids: 5c45ddf06fb9a04a006f5491
src: web
```

2. 服务器收到请求：返回响应头、响应行：响应体