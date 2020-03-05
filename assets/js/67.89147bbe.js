(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{271:function(s,a,t){"use strict";t.r(a);var e=t(0),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"ubuntu下完美安装运行校园网inode客户端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu下完美安装运行校园网inode客户端"}},[s._v("#")]),s._v(" Ubuntu下完美安装运行校园网iNode客户端")]),s._v(" "),t("p",[s._v("在Linux Ubuntu系统下安装校园网iNode客户端， 可谓是一大难题， 各种报错令人眼花缭乱， 不知所措， 经过本人一两天的煎熬， 终于找出了解决方法， 于是就在本文跟有需要的同学分享一下（普遍的Ubuntu版本都能使用该方法， 本人的Ubuntu版本是15.0.4）, 步骤如下:")]),s._v(" "),t("h2",{attrs:{id:"首先先下载inode客户端安装包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#首先先下载inode客户端安装包"}},[s._v("#")]),s._v(" 首先先下载iNode客户端安装包")]),s._v(" "),t("p",[s._v("打开下面链接, 先下载iNode客户端安装包:")]),s._v(" "),t("p",[s._v("链接: http://pan.baidu.com/s/1c25DEEk 密码: hekg")]),s._v(" "),t("h2",{attrs:{id:"创建inode目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建inode目录"}},[s._v("#")]),s._v(" 创建iNode目录")]),s._v(" "),t("p",[s._v("下载iNode客户端安装包后, 打开控制台(terminal)。\n创建目录时, 谨记要在home目录下创建(找不到home目录的话, 可以点击computer目录并在里面找出home目录), 而且还需要使用root用户, 命令如下:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /home/iNode\n")])])]),t("h2",{attrs:{id:"移动inode客户端安装包到inode里面"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#移动inode客户端安装包到inode里面"}},[s._v("#")]),s._v(" 移动iNode客户端安装包到iNode里面")]),s._v(" "),t("p",[s._v("移动时, 记得使用root用户权限, 命令如下:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" Linux_iNodeClient.tar.gz /home/iNode\n")])])]),t("h2",{attrs:{id:"解压inode客户端安装包到inode目录下"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解压inode客户端安装包到inode目录下"}},[s._v("#")]),s._v(" 解压iNode客户端安装包到iNode目录下")]),s._v(" "),t("p",[s._v("命令如下:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /home/iNode                    //进入iNode目录\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zxvf Linux_iNodeClient.tar.gz            //解压iNode客户端安装包\n")])])]),t("h2",{attrs:{id:"进入inodeclient目录并运行安装文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#进入inodeclient目录并运行安装文件"}},[s._v("#")]),s._v(" 进入iNodeClient目录并运行安装文件")]),s._v(" "),t("p",[s._v("命令如下:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" iNodeClient                    //进入iNodeClient目录\n//运行安装文件\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ./install.sh\n")])])]),t("p",[s._v("运行安装文件之后, 一般会出现:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("Starting Authenngervice：OK\n")])])]),t("p",[s._v("按照以上的步骤一般都不会出现任何问题, 除非你并不是使用我的iNode安装包, 否则可能会出现一些问题")]),s._v(" "),t("h2",{attrs:{id:"安装好之后-有些同学会发现双击inodeclient图标-没有任何的反应-这时候就需要建立链接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装好之后-有些同学会发现双击inodeclient图标-没有任何的反应-这时候就需要建立链接"}},[s._v("#")]),s._v(" 安装好之后, 有些同学会发现双击iNodeCLient图标, 没有任何的反应, 这时候就需要建立链接")]),s._v(" "),t("p",[s._v("使用如下命令进入 /usr/lib/i386-linux-gnu目录:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/lib/i386-linux-gnu/\n")])])]),t("p",[s._v("进入目录后, 需要查看一下库文件, 使用如下命令:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -l "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("less")]),s._v("\n")])])]),t("p",[s._v("进去后, 找到如下指令:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("\nlrwxrwxrwx "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("月 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v(":30 libjpeg.so.8 -"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" libjpeg.so.62\n-rw-r--r-- "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("300776")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),s._v("月 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2013")]),s._v(" libjpeg.so.8.0.2\n\nlrwxrwxrwx "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("月  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2015")]),s._v(" libtiff.so.5 -"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" libtiff.so.5.2.0\n-rw-r--r-- "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" root root   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("496652")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("月  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2015")]),s._v(" libtiff.so.5.2.0\n\n\n")])])]),t("p",[s._v("你可以不需要管这四行代码是什么用的, 它们只是一个动态链接的指向, 这时候我们会找出了两个重要的文件 libjpeg.so.8.0.2 和 libtiff.so.5.2.0 ,现在可以去创建链接:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("//需要把libjpeg.so.8.0.2指向链接libjpeg.so.62\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s libjpeg.so.8.0.2 libjpeg.so.62\n")])])]),t("p",[s._v("这时候, 也需要你会报如下错误:")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("ln: failed to create symbolic "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" ‘libjpeg.so.62’: File exists\n")])])]),t("p",[s._v("解决这个错误的方法就是: 把原有的libjpeg.so.62删除, 命令如下")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" libjpeg.so.62\n//删除libjpeg.so.62后, 再创建链接就可以完美解决, 并不会报任何错误\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s libjpeg.so.8.0.2 libjpeg.so.62\n")])])]),t("p",[s._v("同样, 也要把libtiff.so.5.2.0建立链接")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s libtiff.so.5.2.0 libjpeg.so.3\n")])])]),t("p",[s._v("如果还是报上述错误时, 还是用删除libjpeg.so.3方法, 再创建链接即可")]),s._v(" "),t("p",[s._v("好了, 到这里, 你会发现点击iNodeClient图标, 会弹出一个框出来啦, 哈哈, 你就可以登陆你的学号上网了")]),s._v(" "),t("p",[s._v("另外, 如果使用一段时间后, 双击又没反应了, 这时候你可以选择重新安装, 或者选择重新建立链接都可以解决")])])}),[],!1,null,null,null);a.default=n.exports}}]);