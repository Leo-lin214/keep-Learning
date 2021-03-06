# 瞧瞧 HTTP

本文主要对 HTTP 相关知识进行相应的总结。


## 目录
  - [DNS](#dns)
    - [基本概念](#一、基本概念)
    - [DNS查询过程](#二、DNS查询过程)
  - [CDN](#cdn)
    - [基本概念](#一、基本概念)
    - [工作原理](#二、工作原理)
    - [CDN访问过程](#三、cdn访问过程)
  - [HTTP首部](#http-header)
    - [通用首部字段](#一、通用首部字段)
    - [请求首部字段](#二、请求首部字段)
    - [响应首部字段](#三、响应首部字段)
    - [实体首部字段（用于响应首部）](#四、实体首部字段（用于响应首部）)
    - [为Cookie服务的首部字段](#五、为Cookie服务的首部字段)
  - [HTTP缓存机制](#cache)
    - [HTTP缓存类型](#一、HTTP缓存类型)
    - [HTTP缓存机制过程](#二、HTTP缓存机制过程)
    - [强缓存](#三、强缓存)
    - [协商缓存](#四、协商缓存)
    - [用户行为对HTTP缓存的影响](#五、用户行为对HTTP缓存的影响)

## DNS

### 一、基本概念

1. 域名系统DNS能把互联网上的**主机名转换为IP地址**。

2. 域名划分是从右到左，级别慢慢降低，如下：

   ```javascript
   www(三级域名).igola(二级域名).com(顶级域名)
   ```

   DNS规定，域名中的标号(即上述域名)只能由**英文字母和数字**组成，**不能超过63个字符**，不区分大小写。

3. 顶级域名可划分为三大类：

   + 国家顶级域名（nTLD）：如cn代表中国、us代表美国等；

   - 通用顶级域名（gTLD）：如com代表公司企业、net代表网络服务机构、org代表非营利性组织、int代表国际组织；
   - 基础结构域名（可私下查询资料了解）；

   国家顶级域名下注册的二级域名一般是由国家自行确定，我国一般划分二级域名如下：

   - 类别域名：如ac代表科研机构、com代表工商金融等企业、edu代表中国教育机构等；
   - 行政区域名：如bj代表北京、gd代表广东等；

4. DNS采用划分区的方式来解决每一级域名都有相对应域名服务器导致域名服务器数量过多的问题。每一个区都会设置有相对应的权限域名服务器，用于保存该区下所有主机的域名到IP地址的映射。

   ![树状结构的DNS域名服务器](http://learning-every-day.oss-cn-shenzhen.aliyuncs.com/Computer-Network/DNS%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%A0%91%E7%8A%B6%E7%BB%93%E6%9E%84.png)

   - 根域名服务器（root name server）

     拥有所有顶级域名服务器的域名和IP地址。只要本地域名服务器无法解析一个域名，都会先求助于根域名服务器。需注意的是，本地域名在无法解析域名时，都会去找**离该本地域名服务器最近**的一个根域名服务器进行查询（所谓的任播技术）。

     根域名服务器不能直接把等待查询的域名直接转换成IP地址，因为根域名服务器没有存放这种信息，而是会直接告诉本地服务器下一步应该找哪一个顶级域名服务器进行查询。

   - 顶级域名服务器（top level domain server，即TLD服务器）

     负责管理该**顶级域名服务器下注册的所有二级域名**。当收到DNS查询请求时，会告诉DNS客户下一步应该去哪个域名服务器找对应的IP地址。

   - 权限域名服务器（authority name server）

     负责**一个区的域名服务器**。当一个权限服务器无法给出查询回答时，会告诉发出查询请求的DNS客户下一步应该去找哪个权限域名服务器。

   - 本地域名服务器（local name server）

     本地域名服务器离用户主机较近，一般不超过几个路由器的距离，最经典的就是当地网络运行商（ISP）。当一台主机发出DNS查询请求时，会先查询本地域名服务器，例如互联网网络运行商ISP、一个大学或其里的一个系。

### 二、DNS查询过程

用户主机想本地域名服务器的查询一般采用**递归查询**，本地域名服务器向根域名服务器的查询通常使用**迭代查询**。当然本地域名服务器与根域名服务器的查询也可以采用递归查询，取决于最初查询请求报文的设置是哪种方式。

举个🌰，主机m.xyz.com打算查询主机y.abc.com的内容，具体查询过程如下：

1. 主机m.xyz.com先向本地域名服务器dns.xyz.com进行递归查询（使用一个UDP用户数据包的报文）；
2. 当本地域名服务器dns.xyz.com无法找到对应的IP地址时（在其映射表中获高速缓存中查询），会向根域名服务器进行发出DNS查询请求，采用的是迭代查询（使用一个UDP用户数据包的报文）；
3. 根域名服务器告诉本地域名服务器应该去找顶级域名服务器dns.com进行查询（使用一个UDP用户数据包的报文）；
4. 本地域名服务器向顶级域名服务器dns.com发出一个DNS查询请求（使用一个UDP用户数据包的报文）；
5. 当顶级域名服务器dns.com无法找到对应的IP地址时（在其映射表中获高速缓存中查询），会告诉本地域名服务器应该找权限服务器dns.abc.com进行查询（使用一个UDP用户数据包的报文）；
6. 本地域名服务器向权限域名服务器dns.abc.com发出一个DNS查询请求（使用UDP用户数据包的报文）；
7. 权限域名服务器dns.abc.com找到对应的IP地址，并返回给本地域名服务器（使用一个UDP用户数据包的报文）；
8. 本地域名服务器收到权限域名服务器返回的IP地址后，会把结果返回给主机m.xyz.com（使用一个UDP数据包的报文）；

![DNS查询过程](http://learning-every-day.oss-cn-shenzhen.aliyuncs.com/Computer-Network/DNS%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B%E5%9B%BE.png)

如果本地域名服务器向根域名服务器查询采用的是递归查询时，也是使用8个UDP用户数据包的报文。但是递归查询发出DNS请求的则是每个域名服务器，而不像迭代查询中每次DNS查询请求的发出者均是本地域名服务器。

每个域名服务器上都会有一个高速缓存，用于将不久前用户查询过的域名所对应的IP地址保存，合理情况下一般存放2天。


## CDN

### 一、基本概念

CDN（也叫Content Delivery Network），即为内容分发网络。其目的是，在客户端与服务端之间增加一个新的Cache缓存层，将服务端中对应的返回资源保存好，并且该缓存层是距离客户端较近的。这样用户就可以就近获取到所需的内容，提高了网站的响应速度。

### 二、工作原理

将远端服务器上的资源缓存起来，存放到位于全球各地的CDN节点上。当用户发起请求时，根据DNS解析并修改的IP就近获取CDN节点上缓存的资源。从而不需要每个用户都得去到真实服务器上获取资源，避免了网络拥塞、缓解服务器压力，保证了用户访问体验。

### 三、CDN访问过程
![CDN访问过程](http://learning-every-day.oss-cn-shenzhen.aliyuncs.com/Computer-Network/CDN%E8%AE%BF%E9%97%AE%E8%BF%87%E7%A8%8B.png)

1. 用户主机先想本地域名服务器发送DNS查询IP请求；
2. 本地域名服务器根据域名从右向左开始解析，先向根域名服务器发送DNS查询IP请求（先假设在本地域名服务器缓存中该DNS查询记录已过期）；
3. 若根域名服务器找不到，会直接返回一个域名权限DNS记录到本地域名服务器；
4. 本地域名服务器根据域名权限DNS记录寻找对应权限域名服务器，并发出DNS查询IP请求；
5. 权限域名服务器若发现该域名已开启CDN服务，则会返回一个CNAME给本地域名服务器；
6. 本地域名服务器根据这个CNAME去访问智能调度DNS服务器进行查询IP地址；
7. 智能调度DNS服务器会按照一定的算法和策略，将最靠近用户主机的CDN节点对应资源的IP地址返回给本地域名服务器；
8. 本地域名服务器将CDN节点对应资源的IP地址直接交给用户主机；
9. 用户主机得到对应IP地址后，可直接访问较近的节点服务器上对应的资源；
10. CDN服务器会返回对应资源给用户主机；


## HTTP首部

### 一、通用首部

1. Cache-Control

   Cache-Control指定了请求和响应遵循的缓存机制。多个指令之间通过","分隔开，既可用于客户端也可用服务端。

   - 客户端Request
     - **no-cache**：端到端的重新加载，不能使用缓存数据，需向服务端重新拉取一份新的数据；
     - **no-store**：请求和响应都禁止被缓存；
     - **max-age = 秒**：表示响应时间不超过该设置的值时会直接读取缓存数据，一旦超过就需要重新从远端服务器读取数据；需注意的是，当设置max-age = 0时，表示端到端重新验证，请求会一直进行验证所请求的资源直到远端服务器，只有返回304时，才会去读取缓存数据；
     - max-stale = 秒：表示在该设置的时间内，不管所请求的资源是否过期，都统一到缓存中读取所请求的资源（即使该资源已经过期了）；
     - min-fresh = 秒：表示只有当前时间与该设置的值之和小于或等于上述设置的max-age值时，才会去读取缓存中对象；
     - no-transform：表示告诉代理，不能更改媒体类型，例如本身是jpg的，不能更改为png返回；
     - only-if-cached：表示不管怎样都是从缓存中获取资源；
   - 服务端Response
     - public：响应内容均被缓存起来，包括连有密码保护的网页也储存，安全性很低；
     - private：响应内容只能存在一个私有的cache中，只能针对部分用户能够使用该cache；
     - **no-cache**：可以缓存响应内容，但都得先和服务端进行校验。即一开始不管缓存中存在的是否有效，都得先和服务端进行验证后，不过期才能保存起来。从而避免客户端读取该份资源时是过期的；
     - no-store：请求和响应都禁止被缓存；
     - **max-age = 秒**：表示响应数据的过期时间，即在混存中能够保留的有效时间。需注意的是，当设置max-age = 0时，就表示该资源在缓存中已经是无效的，在客户端使用该缓存资源时，需与服务端进行验证；
     - no-transform：表示服务端通知代理不能更改响应资源的媒体类型；
     - **must-revalidate**：表示服务端告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验；
     - proxy-revalidate：功能和must-revalidate类似，但是排除掉缓存服务器（即中间所有代理），只要求是浏览器或其他客户端；

2. Connection

   connection首部字段有两个作用：控制不再转发给代理的首部字段、管理持久连接。

   - 不再转发的首部字段名：输入不需被转发的头部字段名，在发送到服务端时，请求头部会不存在所输入的不需转发的头部字段名；
   - **keep-alive**：HTTP/1.1 规定连接默认都是采取该值，即持久连接。客户端会在持久连接上持续滴发送请求，避免TCP连接建立和释放的时间消耗。若需断开连接，只需配置值为close即可；

3. Date

   用于表示HTTP报文的创建日期和时间，格式采取的是格林威治时间：

   ```javascript
   Date: Tue, 03 Jul 2019 03:20:12 GMT
   ```

4. Pragma

   作为HTTP/1.1之前的版本遗留下来的首部字段，只用于客户端发送的请求中，表示客户端要求中间所有的服务器都不返回缓存中资源。

   由于目前HTTP/1.1的标准使用的是：

   ```javascript
   Cache-Control: no-cache
   ```

   为了兼容部分机器使用依然是旧版本的HTTP，为此一般同时使用该两个字段：

   ```javascript
   Cache-Control: no-cache
   Pragma: no-cache
   ```

5. Transfer-Encoding

   规定了传输报文主体时所采用的编码方式。举个小例子，请求URL为[http://host/abc.txt](https://link.jianshu.com/?t=http://host/abc.txt)，服务器发送数据时认为该文件可用gzip方式压缩以节省带宽，因此会直接在transfer-encoding赋值为gzip。当客户端看到gzip值时，就会知道需要解码后才能解析获取到响应。

6. Upgrade

   对客户端来说，表示其希望通过指定的通信协议与服务端进行通信。对服务端，则用于表示告知客户端能支持哪些通信协议，**返回码一般为101**。需注意的是，Upgrader字段需与Connection字段组合使用。

   ```javascript
   // 客户端
   Upgrade: TLS/1.0
   Connection: Upgrade
   
   // 服务端
   HTTP/1.1 101 Switching Protocols
   Upgrade: TLS/1.0, HTTP/1.1
   Connection: Upgrade
   ```

   上述的Switching Protocols，说明服务器正根据客户端的要求，将协议切换成其所希望的通信协议。

7. Via

   表示客户端与服务端之间的请求和响应报文，经过了哪些代理或者网关，方便于追踪其路径。

   - 当客户端发送一个请求到第一个代理服务器时，该服务器会在自己将要发出的请求头部添加Via字段，对该字段赋值为该服务器上的基本信息；
   - 请求到达下一个代理服务器时，下一个代理服务器会先复制第一个代理服务器的Via头部信息，并贴上本服务器的基本信息，然后赋值到将要发出请求头部的Via字段；
   - 当远端服务器收到请求后，就可以根据Via字段来追踪中间经过了哪些代理或网关；

   当然客户端收到的响应也可以有Via字段，顺便举个🌰：

   ```javascript
   Via: 1.0 gw.hackr.jp(Suqid/3.1), 1.1 a1.example.com(Squid/2.7)
   // 可看到经过了两层的代理
   ```

8. Warning

   从HTTP/1.0的响应首部（Retry-After）演变过来，表示告知用户一些与缓存相关的问题警告。**一般用于响应头部**。

   Warning首部的格式一般如下：

   ```javascript
   Warning: 警告码 警告的主机:端口号 "警告内容" (日期时间)
   ```

   在HTTP/1.1中，共定义了7种警告，分别如下：

   - 警告码 — 警告内容 — 说明

   - 101 — Response is stale（响应已过期） — 代理返回已过期的资源；
   - 111 — Revalidate failed（再次验证失败） — 代理再验证资源有效性失败；
   - 112 — Disconnection operation（断开连接操作） — 代理与互联网连接被故意切断；
   - 113 — Heuristic expiration（试探性过期） — 响应的使用期已过期；
   - 199 — Miscellanenous warning（杂项警告） — 任意的警告内容；
   - 214 — Transformation applied（使用了转换）— 代理对内容编码或媒体类型等执行了某些处理时；
   - 299 — Miscellaneous persisitent warning（持久杂项警告）— 任意的警告内容；



### 二、请求首部字段

1. **Authorization**

   表示授权，用来告知服务器，需通过该字段里的值进行验证后，只有验证通过才能获取到响应信息。否则，服务端将返回401状态码，标记信息为Uauthorized。

   例如iGola网站中，用户登录后，若想获取该用户下的某些信息，往往需要向头部添加authorization字段，并赋值为token，如下：

   ```javascript
   authorization: token A6tpNxHJLTDw7Ka5a14ZBxlULeZKnBEB
   ```

2. Expect

   客户端使用该字段来告知服务器，期望返回某种特定的行为。举个栗子：

   ```javascript
   expect: 100-continue
   ```

   上述的请求，就是期望服务端能够返回的状态码为100 Continue。若服务器无法理解或无法实现客户端所期望的事情时，会返回状态码417 Expectation Failed（即期望失败）。

3. **If-Macth**

   只要带有if开头的，都属于条件请求。用于告诉服务端，该值是否能够匹配服务端它所要请求的资源对应的Etag值，即if-macth设置的值是否等于Etag的值，一旦相等就直接返回对应的资源，反之则返回状态码412 Precondition Failed的响应。

   当然，if-match也可设置值为*，用于表示告诉服务端直接忽略Etag的值，直接处理客户端的请求。

   ```javascript
   If-Match: "123456"
   ```

4. **If-Modified-Since**

   用于告诉服务端该字段指定的日期时间后，若所请求的资源发生了更改，则服务端就会接受客户端请求重新获取资源，若没发生更改，则直接返回304 Not Modified，客户端就会在缓存中读取资源。

   ```javascript
   if-modified-since: Thu, 15 Apr 2004 00:00:00 GMT
   ```

   格式依然使用的是格林威治时间。获取资源的更新的日期，可通过首部字段Last-Modified来确定。

5. **If-None-Match**

   作用刚好跟If-Match相反，告诉服务端，当该值与Etag的值不想等时，就处理客户端的请求，返回其资源。

6. If-Range

   用于告诉服务器该值与所请求的资源的Etag值相符时，则按照range头部字段值进行返回相对应范围的内容，但是不符时，则直接返回全体资源。因此If-Range一般会和Range字段一起使用来获取响应资源中部分内容。

   需注意的是，一旦range字段的值是无效时，服务端则会返回412 Precondition Failed（前提条件失败），目的是催促客户端再次发送请求。

   ```javascript
   if-range: "123456"
   range: 100-200
   ```

   上述的请求是希望服务端返回Etag值为123456的资源里100字节到200字节的内容。

7. If-Unmodified-Since

   作用和If-Modified-Since相反，用于告诉服务器所请求的资源如果在该值时间后木有更新的话，服务端需直接处理客户端的请求，返回对应的响应内容。

   需注意的是，一旦服务端发现该资源已经在该值之后已经更新了，则会返回412 Precondition Failed（前提条件失败）。

8. Max-forwards

   用于表示客户端的请求转发的次数只能是在该设置的值内，当max-forwards为0时，则不准再进行转发，而是直接返回响应。举个例子：

   ```javascript
   max-forwards: 2
   ```

   上述头部设置表示客户端发起后，只能转发2次，没经过一个代理或网关都得把上述的值进行-1，直到0，则会直接返回响应内容，而不能再次转发出去。

9. Proxy-Authorization

   作用和Authorization一致，区别在于该字段只能用于客户端与代理之间的数据验证，而Authorization则是用于客户端与服务端之间的数据验证。

10. **Range**

    用于获取所请求资源的指定范围。若不和If-Range使用时，则是直接要求服务端返回指定范围的内容回来。

    服务端收到请求后，一般会返回206 Partial Content（部门内容），当无法处理该范围请求时，则会返回200 OK以及全部资源。

    ```javascript
    range: bytes=100-200
    ```

11. **Referer**

    用于告诉服务端，是从哪里链接过来的。服务端可根据这个字段的值进行验证，来进行防治盗链以及恶意请求。例如iGola网站上有一个www.baidu.com的连接，当点击后，获取到的百度页面会带有referer头部字段，来告诉百度服务器是从iGola链接过来的，如果百度不允许我们这么做，就会直接返回403 Forbidden（禁止访问）。

    ```javascript
    referer: https://www.igola.com
    ```

12. Te

    用于告诉服务端，客户端能够处理响应的**传输编码**方式以及它的优先级（优先级只要在对应传输编码方式后加上**;q=数字**即可）

    ```javascript
    te: gzip, deflate;q=0.5
    ```

13. **User-Agent**

    用于表示客户端的基本信息。如果中间经过代理，也会可能被添加上代理服务器的名称。

    

### 三、响应头部字段

1. Age

   用于告诉客户端，在该字段设置的值前创建了响应内容。字段值的单位为秒。

   ```javascript
   age: 600
   ```

   一般用于缓存服务器，指的是在该设置值前，缓存服务器已和源服务器确认后产生的响应内容。而永在缓存服务器上时必须带上该头部返回到客户端中。

2. **Etag**

   在服务端用于标识资源，告诉客户端实体标识，因此服务端会为每分资源都分配一个的Etag。一旦资源更新时，Etag也会跟着一起更改。

   资源被缓存时，就会被分配唯一性标识。Etag有强弱之分，强Etag只要对于资源发生任何细微变化都会改变其值，而弱Etag值用提示资源是否相同，只有资源发生了根本的改变并产生差异时才会改变Etag的值，一般会在值的开头带上W/表示弱Etag。

   ```javascript
   etag: W/"123456"
   ```

3. **Location**

   用于告诉客户端进行重定向，即向该设置的值重新发送请求获取资源。一般会返回3xx: Rediection（重定向）。日常中会经常遇到，例如随便输入一个路由识别不了时，就会重定向到另外一个网站中。

   ```javascript
   location: http://www.igola.com
   ```

4. Server

   用于告诉客户端当前服务器的基本信息。

   ```javascript
   server: Apache/2.2.17
   ```



### 四、实体首部字段（一般用于服务端）

1. Allow

   一般用于响应头部，告诉客户端要按指定的请求方法来获取资源。一旦客户端不按要求（即使用服务端不支持的HTTP方法时），会返回405 Method Not Allowed（方法不支持）。

   ```javascript
   allow: get, post
   ```

2. Content-Length

   用于响应头部，告诉客户端响应内容主体部分的字节长度大小，单位是字节。

   ```javascript
   content-length: 1500
   ```

3. Content-Range

   针对范围请求（即带有range头部字段的请求），返回响应时，会带上该字段，告诉客户端返回了范围的内容。表示当前发送部分及整个实体的大小

   ```javascript
   content-range: bytes 100-200
   ```

4. Content-Type

   表示响应内容主体内对象的媒体类型。

   ```javascript
   content-type: text/html; charset=UTF-8
   ```

5. **Expires**

   用于告诉客户端响应内容在该设置内是有效的。**当源服务器不希望所请求的资源被缓存时，可设置该值刚好等于首部字段Date的值**。使用依然是格林威治时间，并且能够兼容HTTP/1.0。

   当首部字段Cache-Control有指定max-age时，会优先处理max-age指令（因为max-age是HTTP/1.1的标准）。

   ```javascript
   expires: Wed, 08 Feb 2019 08:08:08 GMT
   ```

6. Last-Modified

   表示所请求的资源最终修改时间。

   ```javascript
   last-modified: Wed, 08 Feb 2019 08:08:08 GMT
   ```

   

### 五、为Cookie服务的首部字段

Cookie的工作机制就是用户识别以及状态管理。

1. Set-Cookie

   开始状态管理所使用的Cookie信息，用于响应首部字段。

   ```javascript
   set-cookie: status=captcha; expires=Wed, 08 Feb 2019 08:08:08 GMT; path=/; domain=.igola.com; secure; HttpOnly;
   ```

   - expires

     格林威治时间，用于表示Cookie在客户端上存放的有效期。服务端是没有删除客户端Cookie的方法，因此服务端为了能够处理客户端上过期的Cookie，可直接重新发送set-cookie来覆盖Cookie的值；

   - path

     用于限制指定Cookie的发送范围的文件目录（即路由），若不指定，则默认为文档所在的目录。

   - domain

     用于匹配客户端的域名，只有符合指定域名才会进行发送。例如指定了example.com后，除了example.com以外，www.example.com和www2.example.com等都可以发送Cookie。

   - secure

     只有在HTTPS情况下，才可以进行发送Coookie。

   - HttpOnly

     强制JavaScript脚本无法操作cookie。主要目的是为防治跨站脚本攻击（即Cross-site-scripting，XSS）对Cookie信息的窃取。

2. Cookie

   用于客户端，当客户端存在并符合要求的Cookie时，会跟随着每个请求到达服务端，而服务端可根据客户端发来的Cookie头部进行校验等操作。

   ```javascript
   cookie: status=captcha
   ```

   其中字段名就是status，它的值为captcha。


## HTTP缓存机制

参考于[HTTP强缓存 VS 协商缓存](https://www.cnblogs.com/wonyun/p/5524617.html)

### 一、HTTP缓存类型

HTTP缓存可以分为两种：**强缓存**（也叫强制缓存）和**协商缓存**（也叫请求缓存）。

### 二、HTTP缓存机制过程

1. 浏览器请求一个资源时，会先在缓存拿到该资源上一次请求的响应Header头部信息，根据该头部信息中的**cache-control和expires**两个字段，用于判断是否命中强缓存。若命中，浏览器就不需要向服务端发送请求，只需在缓存中直接获取该资源即可，这时候状态码为**200 (from cache)**。状态码后面的from cache就是表明成功从缓存中获取到资源。
2. 若无法命中强缓存，浏览器就需要向服务端发送一个验证请求，请求头部中会发带有第一步中响应头部Header中的**Last-Modified或者Etag**字段。服务端接收到该请求后，会拿请求头部中的Last-Modified或者Etag字段，来与服务端中该资源的**If-Modified-Since或If-None-Match**进行比较。若发现没变化，则会在响应中告诉浏览器只需在缓存中读取资源即可，这时候状态码为**304 (not modified)**，若发现了变化的话，服务端会直接在响应中重新把该请求资源的最新版返回给客户端，这时候状态为**200  (OK)**。

### 三、强缓存

1. Expires

   HTTP/1.0的标准规范，格式是格林威治时间，规定在该设置的时间之前，资源是有效的。若符合则直接从缓存中读取资源即可，无需向服务端发送请求。

2. Cache-Control

   HTTP/1.1的标准规范，强缓存只针对Cache-Control中的max-age = 秒字段的值。max-age的值表示的是多少秒，即该资源存从存放到缓存中到多少秒内是有效的，一旦超过即过期。因此该**资源的有效时间 = 第一次请求该资源的时间 +   max-age的值**。

需注意的是，一旦使用**Cache-Control的no-cache值时，表示客户端不会执行强缓存的判断过程，而是会进行协商缓存**，只有使用no-store时，才会即不执行强缓存也不执行协商缓存，直接从服务端重新获取新版资源。另外，若**Expires和Cache-Control同时使用时，会优先使用Cache-Control字段**。

### 四、协商缓存

在协商缓存中，需注意的是，Last-Modified和If-Modified-Since匹配的，而Etag则和If-None-Match进行匹配的。而它们都是成组出现的。浏览器第一次请求资源时，服务端会在响应头部带上Last-Modified或Etag，当浏览器在后续再次请求时同一个资源时，则会在请求头带上If-Modified-Since或If-None-Match字段，来给服务端进行匹配判断是否命中协商缓存。

1. Last-Modified和If-Modified-Since

   - 浏览器第一次请求资源时，服务端在响应头部上标上Last-Modified来表示该资源最后更改时间，客户端收到响应后，会把该响应包括其header头部信息保存在缓存中；
   - 当浏览器再次请求该资源时，会请求头部上带上**If-Modified-Since（需注意的是，该字段的值其实就是上一步响应中的Last-Modified的值）**，服务端收到该请求后，会拿If-Modified-Since的值与该资源的Last-Modified的值进行比较。若不相等，则会返回该资源到浏览器上，状态码为200 OK。若相等，则会直接在响应中告诉浏览器直接从缓存中读取资源，状态码为304 Not Modified。

   需注意的是，当比较该两个字段不相等时，会在响应中重新返回一个新的Last-Modified字段，浏览器收到后，会重新更新缓存中的资源。**当两个字段的值相等时，则不会在响应头上再次戴胜Last-Modified字段。**

2. Etag和If-None-Match

   判断过程跟Last-Modified和If-Modified-Since一样。而Etag是服务端用于标识一个资源用的，只要资源发生改变，Etag的值也会跟着变化。

   而Etag跟Last-Modfied过程唯一的区别，**当比较两个字段相等时，由于每次比较时，Etag都会根据后端自定义的算法重新生成，因此会跟着响应头再次返回给浏览器，而Last-Modified则不会。**

需注意是，既然有Last-Modified和If-Modified-Since，那为什么还需要Etag和If-None-Match呢？

1. 一些周期性更改的文件，如果文件内容木有更改，而仅仅修改了文件的修改时间，这时候浏览器就不应该把它当成是一个已修改的资源。**Last-Modified由于辨别到时间改了，则会认为是已修改的资源，而Etag则会根据资源发生根本改变才会改变，因此不会认为该资源是已修改的。**
2. If-Modified-Since所能检测的粒度为s，而对于1秒以内修改的资源，是无法进行辨别的。而Etag则会检测到。
3. 由于服务器的类别众多，因此不能确保每一个服务器都能确认到资源的最后修改时间。

综上所述，可以看到**使用Etag可以更准确滴辨别是否符合协商缓存。**当然Last-Modifed与Etag可同时使用，而服务端会优先检验Etag的值一致时，才会去校验Last-Modified的值。

### 五、用户行为对于HTTP缓存的影响

![用户行为对于HTTP缓存的影响](http://learning-every-day.oss-cn-shenzhen.aliyuncs.com/Computer-Network/%E7%94%A8%E6%88%B7%E8%A1%8C%E4%B8%BA%E5%AF%B9HTTP%E7%BC%93%E5%AD%98%E5%BD%B1%E5%93%8D.png)