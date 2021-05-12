/*!
 * jVectorMap version 0.1
 *
 * Copyright 2011, Kirill Lebedev
 * Licensed under the MIT license.
 *
 */
(function ($) {
  var hy_dataMap = {
    /*
     * getLinearColor
     * colorvalue在0到1之间的数值
    */
    getLinearColor: function (colormin, colormax, colorvalue) {
      if (!colorvalue) colorvalue = 0;
      colorvalue = Math.min(1, Math.max(0, colorvalue));
      var min_rgba = parseInt(colormin.substr(1, 2), 16),
        max_rgba = parseInt(colormax.substr(1, 2), 16),
        min_rgbb = parseInt(colormin.substr(3, 2), 16),
        max_rgbb = parseInt(colormax.substr(3, 2), 16),
        min_rgbc = parseInt(colormin.substr(5, 2), 16),
        max_rgbc = parseInt(colormax.substr(5, 2), 16),
        colorArr = ['#'],
        colorStr = null;
      colorStr = parseInt(min_rgba + (max_rgba - min_rgba) * colorvalue).toString(16);
      colorArr.push(colorStr.length == 1 ? '0' + colorStr : colorStr);

      colorStr = parseInt(min_rgbb + (max_rgbb - min_rgbb) * colorvalue).toString(16);
      colorArr.push(colorStr.length == 1 ? '0' + colorStr : colorStr);

      colorStr = parseInt(min_rgbc + (max_rgbc - min_rgbc) * colorvalue).toString(16);
      colorArr.push(colorStr.length == 1 ? '0' + colorStr : colorStr);
      return colorArr.join('');
    }
  },
    pvn = {
      'TIB': { 'bgcolor': '#806040', 'hover': '#FF6767', 'percent': '0', 'content': '西藏自治区位于中华人民共和国西南边陲，青藏高原的西南部，东经78°25′至99°06′，北纬26°44′至36°32′之间。它北临新疆维吾尔自治区，东北连接青海省，东连四川省，东南与云南省相连；南边和西部与缅甸、印度、不丹、锡金和克什米尔等国家和地区接壤，形成了中国与上述国家和地区边境线的全部或一部分，全长近4000公里。西藏以其雄伟壮观、神奇瑰丽的自然风光闻名。她地域辽阔，地貌壮观、资源丰富。自古以来，这片土地上的人们创造了丰富灿烂的民族文化。' },//西藏
      'XIN': { 'bgcolor': '#E6DFCF', 'hover': '#FF6767', 'percent': '0.01', 'content': '新疆维吾尔自治区，简称“新”，位于亚欧大陆中部，地处中国西北边陲，总面积166.49万平方公里，占中国陆地总面积的六分之一，周边与俄罗斯、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、巴基斯坦、蒙古、印度、阿富汗等8个国家接壤；陆地边境线长达5600多公里，占中国陆地边境线的四分之一，是中国面积最大、陆地边境线最长、毗邻国家最多的省区。境内与甘肃、青海、西藏相邻。地形以山地与盆地为主，地形特征为“三山夹两盆”。新疆沙漠广布，石油、天然气丰富，是西气东输的起点、我国西部大开发的主要阵地。' },//新疆
      'QIH': { 'bgcolor': '#E6C373', 'hover': '#FF6767', 'percent': '0.02', 'content': '青海省为我国青藏高原上的重要省份之一，因境内有全国最大的内陆咸水湖——青海湖，而得省名。青海位于我国西北地区，面积72.23万平方公里，东西长1200多公里，南北宽800多公里，辖6州、1地、1市、51个县级行政单位，与甘肃、四川、西藏、新疆接壤。青海东部素有“天河锁钥”、“海藏咽喉”、“金城屏障”、“西域之冲”和“玉塞咽喉”等称谓，可见地理位置之重要。2008年末全省常住人口554.3万人，有汉、藏、回、土、撒拉、维族、蒙古、哈萨克等民族。青海省简称青，是长江、黄河、澜沧江的发源地，被誉为“江河源头”、“中华水塔”。' },//青海
      'GAN': { 'bgcolor': '#BF7830', 'hover': '#FF6767', 'percent': '0.03', 'content': '甘肃省为中华人民共和国省级行政区，地处黄河上游，地理坐标位于北纬32°31′~42°57′、东经92°13′~108°46′之间。东接陕西，南控巴蜀、青海，西倚新疆，北扼内蒙古、宁夏。甘肃省因甘州（今张掖）与肃州（今酒泉）而得名，又因省境大部分在陇山（六盘山）以西，唐代曾在此设置陇右道，故又简称甘或陇。辖12个地级市和2个自治州，省会兰州。古属雍州，是丝绸之路的锁匙之地和黄金路段，与蒙古接壤，像一块瑰丽的宝玉，镶嵌在中国中部的黄土高原、青藏高原和内蒙古高原上，东西蜿蜒1600多千米，纵横45.37万平方千米，占全国总面积的4.72%。' },//甘肃
      'NMG': { 'bgcolor': '#E6C373', 'hover': '#FF6767', 'percent': '0.04', 'content': '内蒙古自治区简称内蒙古，首府为呼和浩特。位于中国北部边疆，西北紧邻蒙古和俄罗斯，面积118万平方公里。以蒙古族和汉族为主，还有朝鲜、回、满、达斡尔、鄂温克、鄂伦春等民族。全区分设9个辖地级市，3个盟；其下又辖12县级市、17县、49旗、3自治旗。包头市 、巴彦淖尔、赤峰、乌兰浩特、乌兰察布、乌海、呼伦贝尔、通辽、鄂尔多斯等为自治区内主要城市。主要山脉有大兴安岭、贺兰山、乌拉山和大青山。东部草原辽阔，西部沙漠广布。年均气温-1～10℃，全年降水量约50～450毫米。已探明矿藏60余种，稀土、煤、银等储量巨大。' },//内蒙古
      'NXA': { 'bgcolor': '#806C40', 'hover': '#FF6767', 'percent': '0.05', 'content': '宁夏全称宁夏回族自治区（Ningxia Hui Autonomous Region），简称宁，是我国五大自治区之一。宁夏自治区首府银川。处在中国西部的黄河上游地区。宁夏东邻陕西省，西部、北部接内蒙古自治区，南部与甘肃省相连。自古以来就是内接中原，西通西域，北连大漠，各民族南来北往频繁的地区。' },//宁夏
      'SHA': { 'bgcolor': '#E6DACF', 'hover': '#FF6767', 'percent': '0.06', 'content': '陕西，简称陕或秦，也称“三秦”，中国西北地区的一个省，省会西安市，位于中国内陆的腹地，属于黄河中游和长江上游，地理坐标处于东经105°29′~111°15′，北纬31°42′～39°35′之间。面积约21万平方千米，人口3733万，下辖10个地级市。东邻山西、河南，西连宁夏、甘肃，南抵四川、重庆、湖北，北接内蒙古，居于连接中国东、中部地区和西北、西南的重要枢纽。西周初年，周成王以陕原为界，原西由召公管辖，后人遂称陕原以西为“陕西”。陕西省历史悠久，文化底蕴深厚，在历史上较长时期一直简称为“秦”。' },//陕西
      'SHX': { 'bgcolor': '#BF7830', 'hover': '#FF6767', 'percent': '0.07', 'content': '山西（Shanxi）位于太行山之西，黄河以东。山西省地理坐标为北纬34°34\'-40°43\'、东经110°14\'-114°33\'。东西宽约290公里，南北长约550公里，总面积15.6万平方公里，约占全国总面积的1.6%。山西之名，因居太行山之西而得名。自古被称为“表里山河”。春秋时期，大部分地区为晋国所有，所以简称“晋”；战国初期，韩、赵、魏三家分晋，因而又称“三晋”。现辖太原、大同、朔州、阳泉、长治、忻州、吕梁、晋中、临汾、运城、晋城等11个地级市，共85个县，11个县级市，23个市辖区。省会太原，省政府驻地太原市府东街，名胜古迹历史名人众多。' },//山西
      'HEB': { 'bgcolor': '#E6DACF', 'hover': '#FF6767', 'percent': '0.08', 'content': '河北，简称冀，向来为京畿重地，河北在战国时期大部分属于赵国和燕国，所以河北又被称为燕赵之地。河北位于东经113°04\'至119°53\'，北纬36°01\'至42°37\'之间，地处华北，漳河以北，东临渤海、内环京津，西为太行山地，北为燕山山地，燕山以北为张北高原，其余为河北平原，面积为18.88万平方千米。东南部、南部衔山东、河南两省，西倚太行山与山西省为邻，西北与内蒙古自治区交界，东北部与辽宁接壤。辖石家庄、唐山、邯郸、保定、沧州、邢台、廊坊、承德、张家口、衡水、秦皇岛等11个地级市，省会为石家庄。' },//河北
      'BEJ': { 'bgcolor': '#e6ac73', 'hover': '#FF6767', 'percent': '0.09', 'content': '北京，中华人民共和国首都、中央直辖市、中国国家中心城市，中国政治、文化、教育和国际交流中心，同时是中国经济金融的决策中心和管理中心。北京位于华北平原北端，东南与天津相连，其余为河北省所环绕。北京有着3000余年的建城史和850余年的建都史，是“中国四大古都”之一，具有一定的国际影响力，其最早见于文献的名称为“蓟”。北京荟萃了自元明清以来的中华文化，拥有众多名胜古迹和人文景观，是全球拥有世界文化遗产最多的城市。北京也为华北地区降雨最多的地区之一。历史悠久的国际高等大学北京大学、清华大学也坐落于北京。' },//北京
      'HEN': { 'bgcolor': '#bf7830', 'hover': '#FF6767', 'percent': '0.1', 'content': '河南位于中国中东部，黄河中下游，简称“豫”，因其大部分位于黄河以南而得名，省会郑州，东与江苏、山东、安徽相邻，南连湖北，西接陕西，北与山西、河北结合，承东启西、联南望北。河南是中华文明和中华民族的发源地，中原河洛、三商文化源远流长，汉字文化、姓氏文化、根亲文化、诗词文化、功夫文化等博大精深；省内文物古迹、风景名胜众多，少林寺、龙门石窟、殷墟、清明上河园、商丘古城、嵩山、云台山等闻名海内外。河南是中国经济大省，2011年GDP总量列全国第五位、中西部第一位，以河南为主体的中原经济区为中国第四大经济区。' },//河南
      'SHD': { 'bgcolor': '#e6dacf', 'hover': '#FF6767', 'percent': '0.2', 'content': '山东，古为齐鲁之地，位于中国东部沿海、黄河下游、京杭大运河的中北段，西部连接内陆，从北向南分别与河北、河南、安徽、江苏四省接壤；中部高突，泰山是全境最高点；东部山东半岛伸入黄海，北隔渤海海峡与辽东半岛相对、拱卫京津与渤海湾，东隔黄海与朝鲜半岛相望，东南则临靠较宽阔的黄海、遥望东海及日本南部列岛。山东历史悠久，是中国文化的源头和中华民族的重要发祥地之一。世界十大文化名人之首的孔子及其儒家思想就诞生在这里。山东经济发达，对中国内地经济的贡献有九分之一强，综合经济实力居全国省份前三位。' },//山东
      'JSU': { 'bgcolor': '#804d40', 'hover': '#FF6767', 'percent': '0.3', 'content': '江苏，中华人民共和国东部沿海省份，简称“苏”，位于华东地区。公元1667年因江南布政使司（今安徽、江苏、上海）东西分置而建省。省名为“江南江淮扬徐海通等处承宣布政使司”与“江南苏松常镇太等处承宣布政使司”合称之简称。辖江临海，扼淮控湖，经济发达，文化昌盛。拥有汉、淮扬、金陵、吴四大多元文化及地域特征。' },//江苏
      'ANH': { 'bgcolor': '#bf4d30', 'hover': '#FF6767', 'percent': '0.4', 'content': '安徽省，中国东部拥江近海的内陆省份，简称“皖”，位于华东地区，省会合肥市。公元1667年因江南布政使司（今安徽、江苏、上海）东西分置而建省，初称江南左布政使司，驻地南京。1667年改为安徽布政使司，省名为“安徽宁池太庐凤滁和广等处承宣布政使司”简称。坐拥淮河、长江、新安江三大流域，形成淮北、江淮、江南多元的地域、文化特征。' },//安徽
      'SHH': { 'bgcolor': '#e68a73', 'hover': '#FF6767', 'percent': '0.5', 'content': '上海，中国第一大城市，又称“上海滩”，四大直辖市之一，中国国家中心城市，国际经济中心、国际金融中心、国际贸易中心和国际航运中心。上海位于中国大陆海岸线中部长江口，拥有中国最大外贸港口和最大工业基地；隔海与日本九州岛相望，南濒杭州湾，西部与江苏、浙江两省相接；上海港货物吞吐量和集装箱吞吐量居世界第一。上海是一座新兴的旅游城市，有深厚近代城市文化底蕴和众多历史古迹，举办过世博会。江南的传统与移民带入的文化融合，逐渐形成了特有的海派文化。上海已成为国际大都市。' },//上海
      'ZHJ': { 'bgcolor': '#e6d3cf', 'hover': '#FF6767', 'percent': '0.6', 'content': '浙江省，地处中国东南沿海、长江三角洲南翼，东临东海，南接福建，西与安徽 、江西相连，北与上海、江苏接壤。境内最大的河流钱塘江，因江流曲折，称之江，又称浙江，省以江名，简称“浙”。浙江省是中国面积最小、人口密度最大的省份之一，人口绝大部分属江浙民系，其中吴语人口占全省总人口的98%以上，部分江浙民系人口使用徽语方言，另有闽南语、蛮话、蛮讲、畲话、官话等方言人口分布在省内个别县市。浙江经济规模在中国仅次于广东、江苏、山东位列第四。' },//浙江
      'FUJ': { 'bgcolor': '#e6ac73', 'hover': '#FF6767', 'percent': '0.7', 'content': '福建省，简称“闽”，省会福州，位于中国东南沿海，东隔台湾海峡与台湾省相望。公元前221年，秦朝置闽中郡，治东冶（今福州），从此福建作为一个行政区划出现在中国的版图上。福建省陆地平面形状似一斜长方形，东西最大间距约480千米，南北最大间距约530千米。全省大部分属中亚热带，闽东南部分地区属南亚热带。全省土地总面积为12.4万平方千米，海域面积达13.6万平方千米。福建气候温和，雨量充沛，森林覆盖率居全国首位。全省拥有较丰富的矿产资源和旅游资源。' },//福建
      'GUD': { 'bgcolor': '#e6dfcf', 'hover': '#FF6767', 'percent': '0.8', 'content': '广东省，简称“粤”，省会广州，辖21个省辖市，其中副省级城市2个（广州、深圳），地级市19个。汉语拼音GuǎngDōng。广东是中国大陆南端沿海的一个省份，位于南岭以南，南海之滨，与香港、澳门、广西、湖南、江西和福建接壤，与海南隔海相望。广东在语言风俗、历史文化等方面都有着独特一面，内部有三大民系，思想和文化与中国北方地区有很大的不同。广东人口超过一亿多人，其中外国人士已达上百万，经济实力占全国的八分之一，并超越新加坡、台湾和香港。广东已成为我国人口最多，外国人士最多，经济实力最强，文化最开放的省份。' },//广东
      'HKG': { 'bgcolor': '#bf7830', 'hover': '#FF6767', 'percent': '0.9', 'content': '香港，繁华的国际化大都市。1842年至1997年，香港是英国的殖民地；1997年7月1日，中国对香港行使主权。地处珠江以东，与广东省深圳市相接。香港是中西方文化交融的地方，香港把华人智慧与西方社会制度优势合二为一，以廉洁的政府、良好的治安、自由的经济体系及完善的法治闻名于世。香港是中西方文化交融的地方，为全球最安全、富裕、繁荣和生活高水平城市之一。香港为全球最有竞争力的经济体系，经济自由度居世界首位。香港是国际重要金融、服务业及航运中心，继纽约、伦敦后世界第三大金融中心。有“东方之珠”、“购物天堂”等美誉。' },//香港
      'MAC': { 'bgcolor': '#E6C373', 'hover': '#FF6767', 'percent': '0.91', 'content': '澳门是中国的一个特别行政区。1553年，葡萄牙人取得澳门居住权，经过五百多年欧洲文明的洗礼，东西文化的融和共存使澳门成为一个风貌独特的城市，留下大量的历史文化遗迹。澳门北邻珠海，西与珠海市的湾仔和横琴对望，东与香港相距60公里，中间以珠江口相隔。澳门是一个自由港，也是世界四大赌城之一。1999年12月20日澳门回归中国之后，经济迅速增长，比往日更繁荣，是一国两制的成功典范。其著名的轻工业、美食、旅游业、酒店和娱乐场使澳门长盛不衰，澳门成为亚洲最发达、最富裕的地区。澳门亦是世界上人口密度最高的地区。' },// 澳门
      'TAI': { 'bgcolor': '#bf9430', 'hover': '#FF6767', 'percent': '0.11', 'content': '台湾是中国神圣领土不可分割的一部分。历史上，台湾曾被西班牙、荷兰、日本先后占领过。抗日战争胜利后，台湾重归中国的版图。1949年后，由于众所周知的原因，台湾与祖国大陆处于分离的状态。50多年来，台湾的政治、经济、文化、社会等发生了巨大变化。台湾岛是中国的第一大岛，位于祖国东南沿海的大陆架上。台湾扼西太平洋航道的中心，是中国与太平洋地区各国海上联系的重要交通枢纽。' }, //台湾
      'HAI': { 'bgcolor': '#e68a73', 'hover': '#FF6767', 'percent': '0.12', 'content': '海南省，省会：海口，1988年4月13日，第七届全国人民代表大会第一次会议通过《关于设立海南省的决定》和《关于建立海南经济特区的决议》；1988年4月26日，中共海南省委、海南省人民政府正式挂牌。从此，海南成为中国第五个经济特区，海南的发展进入了一个崭新的历史时期。海南岛是中国南海上的一颗璀璨的明珠，是仅次于台湾的全国第2大岛。海南省是中国陆地面积最小，海洋面积最大的省。' },//海南
      'JXI': { 'bgcolor': '#806040', 'hover': '#FF6767', 'percent': '0.13', 'content': '江西省（Jiangxi Province），简称赣(gàn)，位于中华人民共和国东南部，长江中下游南岸。属于江南地带，因公元733年唐玄宗设江南西道而得省名，又因境内主要河流赣江而得简称（赣）。自古以来物产富饶、人文荟萃，素有“物华天宝、人杰地灵”之誉，文物古迹、风景名胜众多，庐山、滕王阁、三清山、婺源、龙虎山、井冈山等闻名海内外。江西总面积16.69万平方公里，人口4456.75万（2010年），由11个地级市组成，省会南昌市。古时江西属移民之地，故方言较多，主要通行赣语、吴语、客家话、闽南语、徽语和官话。' }, //江西
      'HUN': { 'bgcolor': '#806c40', 'hover': '#FF6767', 'percent': '0.14', 'content': '湖南位于长江中游江南地区，由于大部分地处洞庭湖之南而成为湖南。湖南境内湘江贯穿南北，所以简称为湘。湖南东临江西，西接渝贵，南毗两广，北连湖北。湖南依江畔湖，风景秀丽，是海内外闻名的旅游胜地。湖南历史悠久，人文荟萃，英才辈出，“惟楚有才，于斯为盛”。湖南物产富饶，素有“湖广熟，天下足”之誉，是著名的“鱼米之乡”。全省辖14个地州市、122个县（市、区），省会长沙市。设有国家级湘南承接产业转移示范区（郴州、衡阳、永州）和国家两型社会综合配套改革试验区--长株潭城市群，另设有长江经济带的环洞庭湖生态经济圈。' },//湖南
      'GXI': { 'bgcolor': '#bf9430', 'hover': '#FF6767', 'percent': '0.15', 'content': '广西壮族自治区（壮语：Gvangjsih Bouxcuengh Swcigih；1958年建立自治区至1965年名为广西僮族自治区），简称桂，下文通称广西，是中华人民共和国的一个自治区，首府南宁市。位于华南地区西部，南濒北部湾，与越南接壤。广西有全中国最多的少数民族，语言使用粤语、桂柳官话、平话、壮语及各种本地少数民族语言。' },//广西
      'GUI': { 'bgcolor': '#bf4d30', 'hover': '#FF6767', 'percent': '0.16', 'content': '贵州省位于中国西南的东南部，辖6个地级市和3个自治州，省会贵阳市。东毗湖南、南邻广西、西连云南、北接四川和重庆市，地理坐标介于东经103°36′~109°35′、北纬24°37′~29°13′之间，全省东西长约595千米，南北相距约509千米，面积约17.6万平方千米，占全国国土面积的1.8%，人口约3474万。截至2011年11月，贵州省共有9个地级行政区划单位（其中：6个地级市、3个自治州），88个县级行政区划单位（其中：13个市辖区、7个县级市、56个县、11个自治县、1个特区）。贵州是一个山川秀丽、气候宜人、民族众多、资源富集、发展潜力巨大的省份。' },//贵州
      'YUN': { 'bgcolor': '#e6ac73', 'hover': '#FF6767', 'percent': '0.17', 'content': '云南省位于中国西南边陲，省会昆明。战国时期，这里是滇族部落的生息之地。云南，即“彩云之南”，另一说法是因位于“云岭之南”而得名。总面积约39万平方千米，占全国面积4.11%，在全国各省级行政区中面积排名第8。总人口4596万（2010年），占全国人口3.35%，人口排名为第12名。与云南省相邻的省区有四川、贵州、广西、西藏，云南省的3个邻国是缅甸、老挝和越南。北回归线从该省南部横穿而过。' },//云南
      'SCH': { 'bgcolor': '#e6d3cf', 'hover': '#FF6767', 'percent': '0.18', 'content': '四川简称“川”或“蜀”，1952年9月1日正式成立。位于中国西南腹地，地处长江上游，东西长1075公里，南北宽921公里。四川历史悠久、风光秀丽、物产丰富，享有“天府之国”美誉；省会城市是成都。与7个省（区、市）接壤，北连青海、甘肃、陕西，东邻重庆，南接云南、贵州，西衔西藏。西部是山地和高原，东部是土壤肥沃的四川盆地。有金沙江、雅砻江、岷江、嘉陵江流经。四川人口密集，城市众多，经济发展较快，交通干线密集。现系“西部综合交通枢纽”、“西部经济发展高地”。' },//四川
      'CHQ': { 'bgcolor': '#804d40', 'hover': '#FF6767', 'percent': '0.19', 'content': '重庆，别称山城、渝都、雾都、桥都，中华人民共和国直辖市，国家中心城市，长江上游地区经济中心和金融中心，及航运、文化、教育、科技中心，全国综合交通枢纽之一，内陆出口商品加工基地和扩大对外开放先行区，国家重要的现代制造业基地、高新技术产业基地，长江上游科研成果产业化基地、生态文明示范区，中西部地区发展循环经济示范区，中国政府实行西部大开发的开发地区及国家统筹城乡综合配套改革试验区，国家历史文化名城。曾为战时陪都，远东反法西斯指挥中心。2011年国务院批复《成渝经济区区域规划》，把重庆定位建设国际大都市。' },//重庆
      'HUB': { 'bgcolor': '#e6c373', 'hover': '#FF6767', 'percent': '0.21', 'content': '湖北省，简称“鄂”，为中华人民共和国省级行政区。湖北在中国中部、长江中游、洞庭湖以北，介于北纬29°05′至33°20′，东经108°21′至116°07′；北接河南省，东连安徽省，东南和南邻江西、湖南两省，西靠重庆市，西北与陕西省为邻。东西长约740公里，南北宽约470公里，面积18.59万平方公里，占全国总面积的1.95%，居全国第14位。湖北以在洞庭湖之北而得名。省会是中部地区唯一的副省级城市、中部地区龙头城市——武汉市。宜昌市、襄阳市为省域副中心城市，黄石市为武汉城市圈副中心城市。' },//湖北
      'LIA': { 'bgcolor': '#806c40', 'hover': '#FF6767', 'percent': '0.22', 'content': '辽宁省（Liaoning Province）简称“辽”，省会沈阳，辖14个省辖市，其中副省级城市2个（沈阳、大连）。辽宁位于中国东北地区，南频渤海与黄海，背幅广袤的工业腹地，沿海城市众多，港口密集，交通发达，公路密度居全国之首，是我国东北唯一的沿海省份，也是我国近代开埠最早的省份之一，也是中华民族和中华文明的发源地之一，新中国工业崛起的摇篮，被誉为“共和国长子”、“东方鲁尔“。2011年辽宁经济保持平稳较快增长，GDP突破2万亿元，达到22025.9亿元，比上年增长12.1%，增幅高于全国平均水平2.9个百分点，经济总量稳居全国第7位。' }, //辽宁
      'JIL': { 'bgcolor': '#e6dfcf', 'hover': '#FF6767', 'percent': '0.23', 'content': '吉林省简称“吉”，省名源于吉林市，省会长春市。地处东经122-131度、北纬41-46度之间，面积18.74万平方公里，占全国面积2%。位于中国东北中部，处于日本、俄罗斯、朝鲜、韩国、蒙古与中国东北部组成的东北亚腹心地带。北接黑龙江省，南接辽宁省，西邻内蒙古自治区，东与俄罗斯接壤，东南部以图们江、鸭绿江为界，与朝鲜民主主义人民共和国隔江相望。东西长650公里，南北宽300公里。东南部高，西北部低，中西部是广阔的平原。辖长春市1个副省级市、吉林市1个较大的市、四平、通化、白山、辽源、白城、松原6个地级市和延边朝鲜族自治州。' },//吉林
      'HLJ': { 'bgcolor': '#bf9430', 'hover': '#FF6767', 'percent': '0.24', 'content': '黑龙江省是中国最东北的省份，面积为45万多平方公里，约占全国总面积的4.7%。省会哈尔滨。位于东经121°11′-135°05′，北纬43°25′-53°33′。北部、东部以黑龙江、乌苏里江为界，与俄罗斯相望；西部与内蒙古自治区毗邻；南部与吉林省接壤。有长10公里以上的河流1700多条，多处平原海拔50－200米。西部属松嫩平原，东北部为三江平原，北部、东南部为山地。' }, //黑龙江
      'TAJ': { 'bgcolor': '#806040', 'hover': '#FF6767', 'percent': '0.25', 'content': '天津，简称津，中国第三大城市，中华人民共和国直辖市，中国国家中心城市，中国北方经济中心、环渤海地区经济中心、中国北方国际航运中心、中国北方国际物流中心、国际港口城市和生态城市，中国中医药研发中心。天津位于环渤海经济圈的中心，是中国北方最大的沿海开放城市、近代北方最早对外开放的沿海城市。天津位于华北平原海河五大支流汇流处，东临渤海，北依燕山，海河在城中蜿蜒而过，海河是天津的母亲河。天津是中国近代工业的发源地。天津滨海新区被誉为“中国经济第三增长极”。天津是夏季达沃斯论坛常驻举办城市。' } //天津		
    },
    apiParams = {
      colors: 1,
      values: 1,
      backgroundColor: 1,
      scaleColors: 1,
      normalizeFunction: 1
    },
    apiEvents = {
      onLabelShow: 'labelShow',
      onRegionOver: 'regionMouseOver',
      onRegionOut: 'regionMouseOut',
      onRegionClick: 'regionClick'
    };

  $.fn.vectorMap = function (options) {
    var defaultParams = {
      map: 'world_en',
      backgroundColor: '#F0FFFF',//背景色
      color: '#ffffff',
      hoverColor: '#00CCFF',//鼠标放上去颜色#00CCFF
      scaleColors: ['#b6d6ff', '#005ace'],
      normalizeFunction: 'linear'
    }, map;

    if (options === 'addMap') {
      WorldMap.maps[arguments[1]] = arguments[2];
    } else if (options === 'set' && apiParams[arguments[1]]) {
      this.data('mapObject')['set' + arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)].apply(this.data('mapObject'), Array.prototype.slice.call(arguments, 2));
    } else {
      $.extend(defaultParams, options);
      defaultParams.container = this;
      this.css({
        position: 'relative',
        overflow: 'hidden'
      });
      map = new WorldMap(defaultParams);
      this.data('mapObject', map);
      for (var e in apiEvents) {
        if (defaultParams[e]) {
          this.bind(apiEvents[e] + '.jvectormap', defaultParams[e]);
        }
      }
    }
  };

  var VectorCanvas = function (width, height) {
    this.mode = window.SVGAngle ? 'svg' : 'vml';
    if (this.mode == 'svg') {
      this.createSvgNode = function (nodeName) {
        return document.createElementNS(this.svgns, nodeName);
      }
    } else {
      try {
        if (!document.namespaces.rvml) {
          document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
        }
        this.createVmlNode = function (tagName) {
          return document.createElement('<rvml:' + tagName + ' class="rvml">');
        };
      } catch (e) {
        this.createVmlNode = function (tagName) {
          return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
        };
      }
      document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    }
    if (this.mode == 'svg') {
      this.canvas = this.createSvgNode('svg');
    } else {
      this.canvas = this.createVmlNode('group');
      this.canvas.style.position = 'absolute';
    }
    this.setSize(width, height);
  }

  VectorCanvas.prototype = {
    svgns: "http://www.w3.org/2000/svg",
    mode: 'svg',
    width: 0,
    height: 0,
    canvas: null,

    setSize: function (width, height) {
      if (this.mode == 'svg') {
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
      } else {
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.coordsize = width + ' ' + height;
        this.canvas.coordorigin = "0 0";
        if (this.rootGroup) {
          var pathes = this.rootGroup.getElementsByTagName('shape');
          for (var i = 0, l = pathes.length; i < l; i++) {
            pathes[i].coordsize = width + ' ' + height;
            pathes[i].style.width = width + 'px';
            pathes[i].style.height = height + 'px';
          }
          this.rootGroup.coordsize = width + ' ' + height;
          this.rootGroup.style.width = width + 'px';
          this.rootGroup.style.height = height + 'px';
        }
      }
      this.width = width;
      this.height = height;
    },

    createPath: function (config) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('path');
        node.setAttribute('d', config.path);
        node.setFill = function (color) {
          this.setAttribute("fill", color);
        };
        node.getFill = function (color) {
          return this.getAttribute("fill");
        };
        node.setOpacity = function (opacity) {
          this.setAttribute('fill-opacity', opacity);
        };
      } else {
        node = this.createVmlNode('shape');
        node.coordorigin = "0 0";
        node.coordsize = this.width + ' ' + this.height;
        node.style.width = this.width + 'px';
        node.style.height = this.height + 'px';
        node.fillcolor = WorldMap.defaultFillColor;
        node.stroked = false;
        node.path = VectorCanvas.pathSvgToVml(config.path);
        var scale = this.createVmlNode('skew');
        scale.on = true;
        scale.matrix = '0.01,0,0,0.01,0,0';
        scale.offset = '0,0';
        node.appendChild(scale);
        var fill = this.createVmlNode('fill');
        node.appendChild(fill);
        node.setFill = function (color) {
          this.getElementsByTagName('fill')[0].color = color;
        };
        node.getFill = function (color) {
          return this.getElementsByTagName('fill')[0].color;
        };
        node.setOpacity = function (opacity) {
          this.getElementsByTagName('fill')[0].opacity = parseInt(opacity * 100) + '%';
        };
      }
      return node;
    },

    createGroup: function (isRoot) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('g');
      } else {
        node = this.createVmlNode('group');
        node.style.width = this.width + 'px';
        node.style.height = this.height + 'px';
        node.style.left = '0px';
        node.style.top = '0px';
        node.coordorigin = "0 0";
        node.coordsize = this.width + ' ' + this.height;
      }
      if (isRoot) {
        this.rootGroup = node;
      }
      return node;
    },

    applyTransformParams: function (scale, transX, transY) {
      if (this.mode == 'svg') {
        this.rootGroup.setAttribute('transform', 'scale(' + scale + ') translate(' + transX + ', ' + transY + ')');
      } else {
        this.rootGroup.coordorigin = (this.width - transX) + ',' + (this.height - transY);
        this.rootGroup.coordsize = this.width / scale + ',' + this.height / scale;
      }
    }
  }

  VectorCanvas.pathSvgToVml = function (path) {
    var result = '';
    var cx = 0, cy = 0, ctrlx, ctrly;
    return path.replace(/([MmLlHhVvCcSs])((?:-?(?:\d+)?(?:\.\d+)?,?\s?)+)/g, function (segment, letter, coords, index) {
      coords = coords.replace(/(\d)-/g, '$1,-').replace(/\s+/g, ',').split(',');
      if (!coords[0]) coords.shift();
      for (var i = 0, l = coords.length; i < l; i++) {
        coords[i] = Math.round(100 * coords[i]);
      }
      switch (letter) {
        case 'm':
          cx += coords[0];
          cy += coords[1];
          return 't' + coords.join(',');
          break;
        case 'M':
          cx = coords[0];
          cy = coords[1];
          return 'm' + coords.join(',');
          break;
        case 'l':
          cx += coords[0];
          cy += coords[1];
          return 'r' + coords.join(',');
          break;
        case 'L':
          cx = coords[0];
          cy = coords[1];
          return 'l' + coords.join(',');
          break;
        case 'h':
          cx += coords[0];
          return 'r' + coords[0] + ',0';
          break;
        case 'H':
          cx = coords[0];
          return 'l' + cx + ',' + cy;
          break;
        case 'v':
          cy += coords[0];
          return 'r0,' + coords[0];
          break;
        case 'V':
          cy = coords[0];
          return 'l' + cx + ',' + cy;
          break;
        case 'c':
          ctrlx = cx + coords[coords.length - 4];
          ctrly = cy + coords[coords.length - 3];
          cx += coords[coords.length - 2];
          cy += coords[coords.length - 1];
          return 'v' + coords.join(',');
          break;
        case 'C':
          ctrlx = coords[coords.length - 4];
          ctrly = coords[coords.length - 3];
          cx = coords[coords.length - 2];
          cy = coords[coords.length - 1];
          return 'c' + coords.join(',');
          break;
        case 's':
          coords.unshift(cy - ctrly);
          coords.unshift(cx - ctrlx);
          ctrlx = cx + coords[coords.length - 4];
          ctrly = cy + coords[coords.length - 3];
          cx += coords[coords.length - 2];
          cy += coords[coords.length - 1];
          return 'v' + coords.join(',');
          break;
        case 'S':
          coords.unshift(cy + cy - ctrly);
          coords.unshift(cx + cx - ctrlx);
          ctrlx = coords[coords.length - 4];
          ctrly = coords[coords.length - 3];
          cx = coords[coords.length - 2];
          cy = coords[coords.length - 1];
          return 'c' + coords.join(',');
          break;
      }
      return '';
    }).replace(/z/g, '');
  }

  var WorldMap = function (params) {
    params = params || {};
    var map = this,
      mapData = WorldMap.maps[params.map],
      province = map.provinces;

    this.container = params.container;

    this.defaultWidth = mapData.width;
    this.defaultHeight = mapData.height;

    this.color = params.color;
    this.hoverColor = params.hoverColor;
    this.setBackgroundColor(params.backgroundColor);

    this.width = params.container.width();
    this.height = params.container.height();

    this.resize();

    $(window).resize(function () {
      map.width = params.container.width();
      map.height = params.container.height();
      map.resize();
      map.canvas.setSize(map.width, map.height);
      map.applyTransform();
    });

    this.canvas = new VectorCanvas(this.width, this.height);
    params.container.append(this.canvas.canvas);

    this.makeDraggable();

    this.rootGroup = this.canvas.createGroup(true);

    this.index = WorldMap.mapIndex;
    this.label = $('<div/>').addClass('jvectormap-label').appendTo($('body'));
    $('<div/>').addClass('jvectormap-zoomin').text('+').appendTo(params.container);
    $('<div/>').addClass('jvectormap-zoomout').html('&#x2212;').appendTo(params.container);
    $('<div/>').addClass('jvectormap-up').text('↑').appendTo(params.container);
    $('<div/>').addClass('jvectormap-down').text('↓').appendTo(params.container);
    $('<div/>').addClass('jvectormap-left').text('←').appendTo(params.container);
    $('<div/>').addClass('jvectormap-right').text('→').appendTo(params.container);

    for (var key in mapData.pathes) {
      var path = this.canvas.createPath({ path: mapData.pathes[key].path });
      path.setFill(hy_dataMap.getLinearColor('#d0e9f2', '#324b7b', province[key]['percent']));
      //path.setFill(province[key]['bgcolor']);

      //path.setFill(this.color);
      path.id = 'jvectormap' + map.index + '_' + key;
      map.countries[key] = path;
      $(this.rootGroup).append(path);
    }

    $(params.container).delegate(this.canvas.mode == 'svg' ? 'path' : 'shape', 'mouseover mouseout', function (e) {
      var path = e.target,
        code = e.target.id.split('_').pop(),//省份简称 eg:HAI
        labelShowEvent = $.Event('labelShow.jvectormap'),
        regionMouseOverEvent = $.Event('regionMouseOver.jvectormap');

      if (e.type == 'mouseover') {
        $(params.container).trigger(regionMouseOverEvent, [code]);
        if (!regionMouseOverEvent.isDefaultPrevented()) {
          if (params.hoverOpacity) {
            path.setOpacity(params.hoverOpacity);
          }
          if (params.hoverColor) {
            path.currentFillColor = path.getFill() + '';
            path.setFill(params.hoverColor);
          }
        }

        //map.label.html(mapData.pathes[code].name+'人口1000万');//鼠标移上去显示内容
        map.label.html(province[code]['content']);
        $(params.container).trigger(labelShowEvent, [map.label, code]);
        if (!labelShowEvent.isDefaultPrevented()) {
          map.label.show();
          map.labelWidth = map.label.width();
          map.labelHeight = map.label.height();
        }
      } else {
        path.setOpacity(1);
        if (path.currentFillColor) {
          path.setFill(path.currentFillColor);
        }
        map.label.hide();
        $(params.container).trigger('regionMouseOut.jvectormap', [code]);
      }
    });

    $(params.container).delegate(this.canvas.mode == 'svg' ? 'path' : 'shape', 'click', function (e) {
      var path = e.target;
      var code = e.target.id.split('_').pop();
      $(params.container).trigger('regionClick.jvectormap', [code]);
    });

    params.container.mousemove(function (e) {
      if (map.label.is(':visible')) {
        map.label.css({
          left: e.pageX - 30 - map.labelWidth,
          top: e.pageY - 15 - map.labelHeight
        })
      }
    });

    this.setColors(params.colors);

    this.canvas.canvas.appendChild(this.rootGroup);

    this.applyTransform();

    this.colorScale = new ColorScale(params.scaleColors, params.normalizeFunction, params.valueMin, params.valueMax);
    if (params.values) {
      this.values = params.values;
      this.setValues(params.values);
    }

    this.bindZoomButtons();

    WorldMap.mapIndex++;
  }

  WorldMap.prototype = {
    transX: 0,
    transY: 0,
    scale: 1,
    baseTransX: 0,
    baseTransY: 0,
    baseScale: 1,

    width: 0,
    height: 0,
    countries: {},
    countriesColors: {},
    countriesData: {},
    zoomStep: 1.4,
    zoomMaxStep: 4,
    zoomCurStep: 1,
    provinces: pvn,

    setColors: function (key, color) {
      if (typeof key == 'string') {
        this.countries[key].setFill(color);
      } else {
        var colors = key;
        for (var code in colors) {
          if (this.countries[code]) {
            this.countries[code].setFill(colors[code]);
          }
        }
      }
    },

    setValues: function (values) {
      var max = 0,
        min = Number.MAX_VALUE,
        val;

      for (var cc in values) {
        val = parseFloat(values[cc]);
        if (val > max) max = values[cc];
        if (val && val < min) min = val;
      }
      this.colorScale.setMin(min);
      this.colorScale.setMax(max);

      var colors = {};
      for (cc in values) {
        val = parseFloat(values[cc]);
        if (val) {
          colors[cc] = this.colorScale.getColor(val);
        } else {
          colors[cc] = this.color;
        }
      }
      this.setColors(colors);
      this.values = values;
    },

    setBackgroundColor: function (backgroundColor) {
      this.container.css('background-color', backgroundColor);
    },

    setScaleColors: function (colors) {
      this.colorScale.setColors(colors);
      if (this.values) {
        this.setValues(this.values);
      }
    },

    setNormalizeFunction: function (f) {
      this.colorScale.setNormalizeFunction(f);
      if (this.values) {
        this.setValues(this.values);
      }
    },

    resize: function () {
      var curBaseScale = this.baseScale;
      if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
        this.baseScale = this.height / this.defaultHeight;
        this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale);
      } else {
        this.baseScale = this.width / this.defaultWidth;
        this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale);
      }
      this.scale *= this.baseScale / curBaseScale;
      this.transX *= this.baseScale / curBaseScale;
      this.transY *= this.baseScale / curBaseScale;
    },

    reset: function () {
      this.countryTitle.reset();
      for (var key in this.countries) {
        this.countries[key].setFill(WorldMap.defaultColor);
      }
      this.scale = this.baseScale;
      this.transX = this.baseTransX;
      this.transY = this.baseTransY;
      this.applyTransform();
    },

    applyTransform: function () {
      var maxTransX, maxTransY, minTransX, maxTransY;
      if (this.defaultWidth * this.scale <= this.width) {
        maxTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
        minTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
      } else {
        maxTransX = 0;
        minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
      }

      if (this.defaultHeight * this.scale <= this.height) {
        maxTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
        minTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
      } else {
        maxTransY = 0;
        minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
      }

      if (this.transY > maxTransY) {
        this.transY = maxTransY;
      } else if (this.transY < minTransY) {
        this.transY = minTransY;
      }
      if (this.transX > maxTransX) {
        this.transX = maxTransX;
      } else if (this.transX < minTransX) {
        this.transX = minTransX;
      }

      this.canvas.applyTransformParams(this.scale, this.transX, this.transY);
    },

    makeDraggable: function () {
      var mouseDown = false;
      var oldPageX, oldPageY;
      var self = this;
      this.container.mousemove(function (e) {
        if (mouseDown) {
          var curTransX = self.transX;
          var curTransY = self.transY;

          self.transX -= (oldPageX - e.pageX) / self.scale;
          self.transY -= (oldPageY - e.pageY) / self.scale;

          self.applyTransform();

          oldPageX = e.pageX;
          oldPageY = e.pageY;
        }
        return false;
      }).mousedown(function (e) {
        mouseDown = true;
        oldPageX = e.pageX;
        oldPageY = e.pageY;
        return false;
      }).mouseup(function () {
        mouseDown = false;
        return false;
      });
    },

    bindZoomButtons: function () {
      var map = this;
      var sliderDelta = ($('#zoom').innerHeight() - 6 * 2 - 15 * 2 - 3 * 2 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
      this.container.find('.jvectormap-zoomin').click(function () {
        if (map.zoomCurStep < map.zoomMaxStep) {
          var curTransX = map.transX;
          var curTransY = map.transY;
          var curScale = map.scale;
          map.transX -= (map.width / map.scale - map.width / (map.scale * map.zoomStep)) / 2;
          map.transY -= (map.height / map.scale - map.height / (map.scale * map.zoomStep)) / 2;
          map.setScale(map.scale * map.zoomStep);
          map.zoomCurStep++;
          $('#zoomSlider').css('top', parseInt($('#zoomSlider').css('top')) - sliderDelta);
        }
      });
      this.container.find('.jvectormap-zoomout').click(function () {
        if (map.zoomCurStep > 1) {
          var curTransX = map.transX;
          var curTransY = map.transY;
          var curScale = map.scale;
          map.transX += (map.width / (map.scale / map.zoomStep) - map.width / map.scale) / 2;
          map.transY += (map.height / (map.scale / map.zoomStep) - map.height / map.scale) / 2;
          map.setScale(map.scale / map.zoomStep);
          map.zoomCurStep--;
          $('#zoomSlider').css('top', parseInt($('#zoomSlider').css('top')) + sliderDelta);
        }
      });
      this.container.find('.jvectormap-up').click(function () {
        map.transY -= 20;
        map.applyTransform();
      });
      this.container.find('.jvectormap-down').click(function () {
        map.transY += 20;
        map.applyTransform();
      });
      this.container.find('.jvectormap-left').click(function () {
        map.transX -= 20;
        map.applyTransform();
      });
      this.container.find('.jvectormap-right').click(function () {
        map.transX += 20;
        map.applyTransform();
      });
    },

    setScale: function (scale) {
      this.scale = scale;
      this.applyTransform();
    },

    getCountryPath: function (cc) {
      return $('#' + cc)[0];
    }
  }

  WorldMap.xlink = "http://www.w3.org/1999/xlink";
  WorldMap.mapIndex = 1;
  WorldMap.maps = {};

  var ColorScale = function (colors, normalizeFunction, minValue, maxValue) {
    if (colors) this.setColors(colors);
    if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
    if (minValue) this.setMin(minValue);
    if (minValue) this.setMax(maxValue);
  }

  ColorScale.prototype = {
    colors: [],

    setMin: function (min) {
      this.clearMinValue = min;
      if (typeof this.normalize === 'function') {
        this.minValue = this.normalize(min);
      } else {
        this.minValue = min;
      }
    },

    setMax: function (max) {
      this.clearMaxValue = max;
      if (typeof this.normalize === 'function') {
        this.maxValue = this.normalize(max);
      } else {
        this.maxValue = max;
      }
    },

    setColors: function (colors) {
      for (var i = 0; i < colors.length; i++) {
        colors[i] = ColorScale.rgbToArray(colors[i]);
      }
      this.colors = colors;
    },

    setNormalizeFunction: function (f) {
      if (f === 'polynomial') {
        this.normalize = function (value) {
          return Math.pow(value, 0.2);
        }
      } else if (f === 'linear') {
        delete this.normalize;
      } else {
        this.normalize = f;
      }
      this.setMin(this.clearMinValue);
      this.setMax(this.clearMaxValue);
    },

    getColor: function (value) {
      if (typeof this.normalize === 'function') {
        value = this.normalize(value);
      }
      var lengthes = [];
      var fullLength = 0;
      var l;
      for (var i = 0; i < this.colors.length - 1; i++) {
        l = this.vectorLength(this.vectorSubtract(this.colors[i + 1], this.colors[i]));
        lengthes.push(l);
        fullLength += l;
      }
      var c = (this.maxValue - this.minValue) / fullLength;
      for (i = 0; i < lengthes.length; i++) {
        lengthes[i] *= c;
      }
      i = 0;
      value -= this.minValue;
      while (value - lengthes[i] >= 0) {
        value -= lengthes[i];
        i++;
      }
      var color;
      if (i == this.colors.length - 1) {
        color = this.vectorToNum(this.colors[i]).toString(16);
      } else {
        color = (
          this.vectorToNum(
            this.vectorAdd(this.colors[i],
              this.vectorMult(
                this.vectorSubtract(this.colors[i + 1], this.colors[i]),
                (value) / (lengthes[i])
              )
            )
          )
        ).toString(16);
      }

      while (color.length < 6) {
        color = '0' + color;
      }
      return '#' + color;
    },

    vectorToNum: function (vector) {
      var num = 0;
      for (var i = 0; i < vector.length; i++) {
        num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1);
      }
      return num;
    },

    vectorSubtract: function (vector1, vector2) {
      var vector = [];
      for (var i = 0; i < vector1.length; i++) {
        vector[i] = vector1[i] - vector2[i];
      }
      return vector;
    },

    vectorAdd: function (vector1, vector2) {
      var vector = [];
      for (var i = 0; i < vector1.length; i++) {
        vector[i] = vector1[i] + vector2[i];
      }
      return vector;
    },

    vectorMult: function (vector, num) {
      var result = [];
      for (var i = 0; i < vector.length; i++) {
        result[i] = vector[i] * num;
      }
      return result;
    },

    vectorLength: function (vector) {
      var result = 0;
      for (var i = 0; i < vector.length; i++) {
        result += vector[i] * vector[i];
      }
      return Math.sqrt(result);
    }
  }

  ColorScale.arrayToRgb = function (ar) {
    var rgb = '#';
    var d;
    for (var i = 0; i < ar.length; i++) {
      d = ar[i].toString(16);
      rgb += d.length == 1 ? '0' + d : d;
    }
    return rgb;
  }

  ColorScale.rgbToArray = function (rgb) {
    rgb = rgb.substr(1);
    return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
  }
})(jQuery);
