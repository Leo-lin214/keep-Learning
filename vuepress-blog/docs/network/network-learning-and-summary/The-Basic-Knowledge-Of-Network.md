# 《计算机网络》小总结

由于之前回看了一小遍的《计算机网络》这本书（其实也是自己大学里的课程），主要就是针对一些知识点进行相应的总结。说句实在话，书的内容还是挺多的，看起来还是会有稍微的繁杂哈哈，不过主要还是好好学习好好总结啦。

## 概述

 1. OSI 七层结构: 

    - 应用层;
    - 表示层;
    - 会话层;       // 其中应用层, 表示层, 会话层对应五层结构和 TCP/IP 四层结构的应用层
    - 运输层;
    - 网络层;
    - 数据链路层;
    - 物理层;
    

 2. TCP/IP 四层结构: 

    - 应用层; // 包含有TELNET, TCP, SMTP等;
    - 运输层; // TCP 或 UDP;
    - 网际层IP;
    - 网络接口层;
    
 3. 五层结构: 

    - 应用层;   // 通过应用进程间的交互来完成特定网络应用;
    - 运输层;   // 向两个主机中进程之间的通信提供通用的数据传输服务;
    - 网际层;   // 为分组交换网上的不同主机提供通信服务, 分组也称为IP数据包;
    - 数据链路层;   // 将IP数据包组装成帧, 在两个相邻节点间的链路上传送帧 不仅要检错, 而且还要纠错;
    - 物理层;   // 所传的数据单位是比特;
    

 4. 协议的实现保证了能够向上一层提供服务, 协议是"水平的", 即协议是控制对等实体之间通信的规则, 但服务是"垂直的", 即服务是由下层向上层通过层间接口提供的;

## 物理层

 1. 物理层考虑的是怎样才能在连接各种计算机的传输媒体上的传输数据比特流, 而不是指具体的传输媒体, 传输数据的基本单位是比特;
 2. 限制码元在信道上的传输速率的因素有: 
    
    - 信道能够通过的频率范围;
    - 信噪比;
 3. 物理层下面的传输媒体: 

    - 导引型传输媒体: 
    
      + 双绞线; // 最高速率与数字信号的编码方法有关;
      + 同轴电缆;   // 具有很好的抗干扰特性, 广泛应用于传输较高速率的数据;
      + 光缆;   // 利用光导纤维传递光脉冲来进行通信;
    
    - 非导引型传输媒体: 无线电波;
    
 

 4. 信道复用技术

    - 频分复用( FDM ): 频分复用的所有用户在同样的时间占用不同的带宽资源;
    - 时分复用( TDM ): 时分复用的所有用户是在不同的时间占用同样的频带宽度;
    - 波分复用( WDM ): 光的频分复用;
    - 码分复用( CDM ): 具有很强的抗干扰能力, 不易被敌人发现;
    
 5. ADSL 技术

    - 定义: 用数字技术对现有的模拟电话用户线进行改造, 使它能够承载宽带数字业务;
    - ADSL 的传输距离取决于数据率和用户线的线径( 用户线越细, 信号传输时的衰减就越大 );
    - ADSL 采用自适应调制技术使用用户线能够传送尽可能高的数据率;
    

## 数据链路层
 

 1. 数据链路层的三个主要功能: 

    - 封装成帧; // 在一段数据的前后分别添加首部和尾部;
    - 透明传输; 
    - 差错检错; // 广泛使用循环冗余检验CRC检错技术;
     
 2. 数据链路层的协议数据单元---帧;
 3. PPP 协议( 点到点信道 ): 

    - 定义: 用户计算机和 ISP 进行通信所使用的数据链路层协议;
    - 组成: 
    
      + 一个将 IP 数据报封装到串行链路的方法;
      + 一个用来建立, 配置和测试数据链路连接的链路控制协议 LCP;
      + 一套网络控制协议 NCP;
    

 4. 局域网( 广播信道 ):

    - 优点: 
    
      + 具有广播功能;
      + 便于系统的扩展和逐渐演变, 各设备的位置可灵活调整和改变;
      + 提高系统的可靠性, 可用性和生存性;
      
    - 用户能够合理方便共享通信媒体资源方法: 
    
      + 静态划分信道;
      + 动态媒体接入控制;
      
    - 局域网的数据链路层划分为两个子层: 逻辑链路控制( LLC )子层和媒体接入控制( MAC )子层, MAC子层与传输媒体有关, 而LLC子层则与传输媒体无关, 采用何种传输媒体和MAC子层的局域网对LLC子层都是透明的;
    
    - 计算机与外界局域网的连接是通过通信适配器;
    
 

 5. CSMA/CD 协议

    - 多点接入;
    - 载波监听;
    - 碰撞检测;
    
 6. 集线器工作在物理层;
 7. 适配器从网络上收到一个MAC帧就先用硬件检查MAC帧中的目的地址, 如果是发往本站的帧则收下, 然后再进行其他的处理, 否则就将此帧丢弃, 不做任何处理;
 8. 视为无效帧的情况: 

    - 帧的长度不是整数个字节;
    - 用收到的帧检验序列FCS查出有差错;
    - 收到的帧的MAC客户数据字段的长度不在46~1500字节之间;
    
 9. 网桥: 

    - 优点: 
    
      + 过滤通信量, 增大吞吐量;
      + 扩大物理范围;
      + 提高可靠性;
      + 可互连不通物理层, 不同MAC子层和不同速率的以太网;
      
    - 缺点: 
    
      + 对接收的帧要先存储和查找转发表, 增加了时延;
      + 在MAC子层并没有流量控制功能;
      
    - 网桥在转发帧时, 不改变帧的源地址;

10. 虚拟局域网 ( VLAN ) 只是局域网给用户提供的一种服务, 而不是一种新型的局域网;


## 网络层

 1. 网络层向上只提供简单灵活的, 无连接的, 尽最大努力交付的数据报服务, 网络在发送分组时不需要先建立连接, 网络层不提供服务质量的承诺, 即所传送的分组可能出错, 丢失, 重复和失序, 如果主机中的进程之间的通信需要时可靠的, 那么就由网络主机中的运输层负责( 包括差错检测, 流量控制等 );
 2.  OSI提出的是虚电路服务, TCP/IP体系的网络层提供的是数据报服务;
 3.  物理层使用的中间设备是转发器;
     数据链路层使用的中间设备是网桥或桥接器;
     网络层使用的中间设备是路由器;
     在网络层以上使用的中间设备是网关;

 4. IP地址的编址方法

    - 分类的编址方法;
    - 子网的划分;
    - 构成超网;
    

 5. 分类的编址方法

    - 定义: 
    
      将IP地址划分为若干个固定类, 每一类地址都由两个固定长度的字段组成,, 第一个为网络号, 第二个为主机号, 格式为: 
        
      ```javascript
        IP地址 := {<网络号>, <主机号>}
      ```
      
    - 一个网络号在整个因特网范围内必须是唯一的, 一个主机号在它前面额网络号所指明的网络范围内必须是唯一的, 所以一个 IP 地址在整个因特网范围内是唯一的;
    
    - A, B, C类地址都是单播地址( 一对一通信 ), 是最常用的;
    
    - 对主机或路由器来说, IP地址都是32位的二进制代码( 即 4 个字节长 );
    
    - A类, B类, C类地址的主机号字段分别为3个, 2个和1个字节长;
 
    - D地址( 前4位是1110 )用于多播( 一对多通信 );
    
    - IP地址并不仅仅指明一个主机, 而是还指明了主机所连接到的网络;
    
    - A类地址可指派的网络号是2^7 - 2个( 即126个 ), 其中减去的2个就是全0或全1, 最大主机数是2^24 - 2( 即16777214 ), 减2的原因是减去全0的单个网络地址, 全1的主机号字段表示该网络上的所有主机;
    
    - B类地址由于前面两位( 10 )已经固定, 所以不会出现网络号全0或全1, 但可以指派的最小B类地址是128.0.0.0, 而它是不指派的, 而可以指派的B类最小网络地址是128.1.0.0, 所以可指派的网络号是2^14 - 1( 即16383 ), 而最大主机数是2^16-2, 即要减去全0和全1的情况;
    
    - C类地址最前面的3位是( 110 ), 而网络地址192.0.0.0是不指派的, 可以指派的C类最小网络地址是192.0.1.0, 所以可指派的网络总数是2^21 - 1( 即2097151 ), 最大主机数为2^8 - 2( 即254 ), 减去全0和全1情况;
    
 6. 在同一个局域网上的主机或路由器的IP地址中的网络号必须是一样的, 用网桥互连的网段仍然是一个局域网, 只能有一个网络号;
 7. 路由器总是具有两个或两个以上的IP地址, 即路由器的每一个接口都有一个不同的网络号的IP地址;
 8. IP地址与硬件地址区别:

    - 物理地址( MAC地址 )是数据链路层和物理层使用的地址, 而IP地址是网络层和以上各层使用的地址, 是一种逻辑地址;
    
    - 使用IP地址的IP数据报一旦交给了数据链路层, 就被封装成MAC帧, MAC帧在传送时使用的源地址和目的地址都是硬件地址, 这两个硬件地址都写在MAC帧的首部;
    
    - IP地址放在IP数据报的首部, 而硬件地址则放在MAC帧的首部, 在网络层以上使用的是IP地址, 而数据链路层及以下使用的是硬件地址, 在数据链路层是看不见数据报的IP地址;
    
    - 路由器只根据目的站的IP地址的网络号进行路由选择;
    
 9. 地址解析协议ARP

    - ARP协议作用是为了从网络层使用的IP地址解析出在数据链路层使用的硬件地址( IP地址是32位, 硬件地址是48位 );
    
    - 每一个主机都设有一个ARP高速缓存( ARP cache ), 里面有本局域网上的各主机和路由器的IP地址到硬件地址的映射表;
    
    - ARP协议过程如下: 
    
      当主机A要向本局域网上的某个主机B发送IP数据报时, 就先在其ARP高速缓存中查看有无主机B的IP地址, 如有, 就在ARP高速缓存中查出对应的硬件地址, 再把这个硬件地址写入MAC帧, 然后通过局域网把该MAC帧发往此硬件地址;
      
    - 从IP地址到硬件地址的ARP解析是自动进行的, 主机的用户对这种地址解析过程是不知道的;
    
 10. 划分子网

     - 划分子网后的IP地址会变成三级结构, 划分子网只是把IP地址的主机号这部分进行再划分, 而不改变IP地址原来的网络号; 
     
     - ( 针对B类地址进行解说 )子网掩码中的1对应于IP地址中原来二级地址中的16位网络加上新增加的8位子网号, 而子网掩码中的0对应于剩下的8位主机号;
     
       ```javascript
        两级IP地址: 145.13.3.10( 3.10为主机号 );
        
        两级IP地址的子网掩码: 11111111 11111111 00000000 00000000;
        
        三级IP地址: 145.13.3( 3为子网号 ).10( 10为主机号 );
        
        三级IP地址的子网掩码: 11111111 11111111 11111111 00000000;
       ```
       
       通过上面三级IP地址的子网掩码与目的地址145.13.3.10进行" 与 "运算, 可以得到网络地址为145.13.3.0;