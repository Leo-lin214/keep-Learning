## TCP连接管理
### 一、TCP的连接建立

1. 首先，TCP客户A向TCP服务B发出SYN连接请求报文段（TCP规定，SYN报文段即SYN=1报文段不能携带数据），首部中同步标记位SYN=1以及初始序号seq=x（随机数），随后进入**SYN-SENT**状态；
2. TCP服务B收到连接请求后，如同意连接则向TCP客户A发出确认请求。首部中，同步标记位SYN=1、确认标志位ACK=x+1（即上次请求中的seq的随机数值 + 1）、初始序号seq=y（随机数），随后进入**SYN-RCVD**状态；
3. TCP客户A收到连接确认后，还需向TCP服务B发出确认。首部中，不再需要SYN（此时SYN=0）、确认标志位ACK=y+1（即上次确认中的seq的随机数值 + 1）、序号为seq=x+1（上一次发送请求随机数 + 1），随后进入**ESTABLISHED**状态（当然，TCP服务B收到确认后，也会进入**ESTABLISHED**状态），**可携带数据，若携带数据即消耗序号**；

三次握手流程，如果在第二步中把同步位和确认位分开传送时，会形成一个四次握手协议。

另外，第三步中为什么还需要发送多一次确认，原因是：**为了避免已失效的报文段传到TCP服务B而产生错误**。因为第一次的连接请求，如果在一定时间内未能发送到服务B，这时候客户A会认为这个请求已失效，过一段时间，请求到了服务B，服务B会误以为客户A需要建立连接请求。因此会发送一个确认信号到客户A，然而客户A会当这个确认是垃圾信号而丢掉，最后服务B就会一直等待A的确认而浪费服务端资源。

![TCP建立连接-三次握手](http://learning-every-day.oss-cn-shenzhen.aliyuncs.com/Computer-Network/TCP-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.png)

### 二、TCP的连接释放（也叫连接关闭）

1. 首先，客户A向服务B发出FIN连接释放报文段，并停止发送数据，首部中，终止标志位FIN=1、序号为seq=x（相当于前面已传送过的序号 + 1），随后进入**FIN-WAIT-1**状态（终止等待1）；
2. 服务B收到请求后，需向客户A发送确认。首部中，确认标志位ACK=x+1（请求中的序号 + 1）、序号为seq=y，随后进入**CLOSE-WAIT**状态（需注意的是，该状态下仍可继续发送数据到客户A），客户A收到确认后也会进入**FIN-WAIT-2**状态（终止等待2）来等待服务B向客户A的关闭请求；
3. 当服务B发现再无数据可发给客户A后，立马向客户A发送FIN连接释放报文段。首部中，终止标记位FIN=1、确认号ACK=x+1（上一次确认号）、序号为seq=z（随机数），随后进入**LAST-ACK**状态，最后等待A的确认；
4. 客户A收到请求后，需向服务B发送确认。首部中，确认标志位ACK=z+1（请求中序号 + 1）、序号seq=x+1（关闭请求中序号为x，因此加1即可），随后进入**TIME-WAIT**时间等待状态。需注意是，这时候服务B收到确认后，一般需等待最长报文段寿命2MSL（1MSL = 2分钟）后才会进入**CLOSE**状态，而客户A大概就是等待4分钟才进入**CLOSE**状态；

为什么需要四次挥手，而不是两次挥手？原因是：TCP一般是全双工模式，一方接收到FIN时就意味着另一方不会再发送数据过来，但是本身仍可发送数据到另一方。

![TCP关闭连接-四次挥手](http://learning-every-day.oss-cn-shenzhen.aliyuncs.com/Computer-Network/TCP-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.png)


## TCP与UDP

### 一、TCP

1. TCP是面向连接的运输层协议（必须先建立连接，传输完毕还需经过连接释放的过程）。
2. 每一条TCP连接只能由两个端点（套子节scoket），也就是只能一对一的。
3. TCP提供可靠交付的服务（无差错、不丢失、不重复）。
4. TCP提供全双工通信。
5. TCP面向的是字节流。应用程序和TCP的交互是一次一个数据块（大小不等），因此TCP把应用程序交下来的数据看成是一连串的无结构字节流。

### 二、UDP

1. UDP是无连接的。发送数据前无需建立连接，结束时也无需释放连接。
2. UDP尽最大努力进行交付，即不可靠交付。
3. UDP面向的是报文。UDP对应用层交下来的报文，既不合并也不拆分，按照原样添加一个首部后正常发送。
4. UDP没有拥塞控制。即允许在网络发生拥塞时丢失一些数据，但不允许数据有太大的时延。
5. UDP支持一对一、一对多、多对一和多对多的交互通信。
6. UDP首部开销小，只需8个字节，而TCP则需要20个字节。