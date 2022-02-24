// import { getLodop } from './lodop' //这块就是引用的上面一大坨暴露出来的方法喽
let createTime = new Date().format("yyyy-MM-dd");
// let LODOP = getLodop();
const PrintBig = ({ daNumber, staName, termOfValidity, specifications, deptName, userName, phone }) => {
  let code = `${daNumber},${staName},${termOfValidity},${specifications},${deptName},${userName},${phone},${createTime}`
  console.log('这里打印大号纸张100*80')


  
LODOP.PRINT_INITA(0,0,378,302,"打印条码1");
LODOP.SET_PRINT_PAGESIZE(1,1000,800,"");
LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE",1);
LODOP.ADD_PRINT_BARCODE(69,8,158,158,"QRCode",code);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","code");
LODOP.ADD_PRINT_TEXT(42,225,176,24,daNumber);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","daNumber");
LODOP.ADD_PRINT_TEXT(67,210,176,24,staName);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","staName");
LODOP.ADD_PRINT_TEXT(94,224,176,24,termOfValidity);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","termOfValidity");
LODOP.ADD_PRINT_TEXT(120,210,176,24,specifications);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","specifications");
LODOP.ADD_PRINT_TEXT(146,238,176,24,deptName);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","deptName");
LODOP.ADD_PRINT_TEXT(172,224,176,24,userName);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","userName");
LODOP.ADD_PRINT_TEXT(200,238,176,24,phone);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","phone");
LODOP.ADD_PRINT_TEXT(229,238,176,24,createTime);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","createTime");
LODOP.ADD_PRINT_TEXT(94,161,100,24,"有效期：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(42,162,100,24,"编码号：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(68,161,100,24,"品名：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(146,161,100,24,"二级单位：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(120,161,100,24,"规格：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(173,161,100,24,"联系人：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(201,161,100,24,"联系方式：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(229,161,100,24,"入库日期：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);


  LODOP.NewPage();

  /**
   * 单条打印时使用
    // LODOP.PRINT_DESIGN(); //设计模式
    // LODOP.PREVIEW(); //打印前预览
    // LODOP.PRINT(); //直接打印
   */
}
// 左右结构
// const PrintMiddle = ({ daNumber, staName, termOfValidity, specifications, deptName, userName, phone }) => {
//   console.log('这里打印中等纸张80*80')
//   let code = `${daNumber},${staName},${termOfValidity},${specifications},${deptName},${userName},${phone},${createTime}`


// LODOP.PRINT_INITA(0,0,302,302,"打印条码2");
// LODOP.SET_PRINT_PAGESIZE(1,800,800,"");
// LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
// LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE",1);
// LODOP.ADD_PRINT_BARCODE(90,7,120,120,"QRCode",code);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","code");
// LODOP.ADD_PRINT_TEXT(73,159,176,18,daNumber);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","daNumber");
// LODOP.ADD_PRINT_TEXT(93,145,176,18,staName);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","staName");
// LODOP.ADD_PRINT_TEXT(109,158,176,18,termOfValidity);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","termOfValidity");
// LODOP.ADD_PRINT_TEXT(128,145,176,18,specifications);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","specifications");
// LODOP.ADD_PRINT_TEXT(148,171,176,18,deptName);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","deptName");
// LODOP.ADD_PRINT_TEXT(167,158,176,18,userName);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","userName");
// LODOP.ADD_PRINT_TEXT(187,170,176,18,phone);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","phone");
// LODOP.ADD_PRINT_TEXT(207,173,176,18,createTime);
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.SET_PRINT_STYLEA(0,"ContentVName","createTime");
// LODOP.ADD_PRINT_TEXT(109,120,79,18,"有效期：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(73,121,79,18,"编码号：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(93,120,79,18,"品名：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(148,120,79,18,"二级单位：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(128,120,79,18,"规格：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(168,120,79,18,"联系人：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(188,120,79,18,"联系方式：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT(207,120,79,18,"入库日期：");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);



//   LODOP.NewPage();

//   /**
//    * 单条打印时使用
//     // LODOP.PRINT_DESIGN(); //设计模式
//     // LODOP.PREVIEW(); //打印前预览
//     // LODOP.PRINT(); //直接打印
//    */
// }
// 上下结构
const PrintMiddle = ({ daNumber, staName, termOfValidity, specifications, deptName, userName, phone }) => {
  console.log('这里打印中等纸张80*80')
  let code = `${daNumber},${staName},${termOfValidity},${specifications},${deptName},${userName},${phone},${createTime}`


  
LODOP.PRINT_INITA(0,0,302,302,"打印条码2");
LODOP.SET_PRINT_PAGESIZE(1,800,800,"");
LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE",1);
LODOP.ADD_PRINT_BARCODE(-2,100,120,120,"QRCode",code);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","code");
LODOP.ADD_PRINT_TEXT(111,115,176,24,daNumber);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","daNumber");
LODOP.ADD_PRINT_TEXT(135,115,176,24,staName);
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","staName");
LODOP.ADD_PRINT_TEXT(158,115,176,24,termOfValidity);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","termOfValidity");
LODOP.ADD_PRINT_TEXT(182,115,176,24,specifications);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","specifications");
LODOP.ADD_PRINT_TEXT(206,115,176,24,deptName);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","deptName");
LODOP.ADD_PRINT_TEXT(230,115,176,24,userName);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","userName");
LODOP.ADD_PRINT_TEXT(254,115,176,24,phone);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","phone");
LODOP.ADD_PRINT_TEXT(277,115,176,24,createTime);
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.SET_PRINT_STYLEA(0,"ContentVName","createTime");
LODOP.ADD_PRINT_TEXT(158,32,100,24,"有效期：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(111,33,100,24,"编码号：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(135,32,100,24,"品名：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(206,32,100,24,"二级单位：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(182,32,100,24,"规格：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(231,32,100,24,"联系人：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(255,32,100,24,"联系方式：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(277,32,100,24,"入库日期：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);




  LODOP.NewPage();

  /**
   * 单条打印时使用
    // LODOP.PRINT_DESIGN(); //设计模式
    // LODOP.PREVIEW(); //打印前预览
    // LODOP.PRINT(); //直接打印
   */
}
const PrintSmall = ({ daNumber, staName, termOfValidity, specifications, deptName, userName, phone }) => {
  console.log('这里打印中等纸张50*30')
  let code = `${daNumber},${staName},${termOfValidity},${specifications},${deptName},${userName},${phone},${createTime}`
  LODOP.PRINT_INITA(0, 0, 189, 113, "打印条码3");
  LODOP.SET_PRINT_PAGESIZE(1, 500, 300, "");
  LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true);
  LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE", 1);
  LODOP.ADD_PRINT_BARCODE(37, 11, 36, 36, "QRCode", code);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "code");
  LODOP.ADD_PRINT_TEXT(33, 56, 49, 15, "有效期：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(6, 56, 49, 15, "编码号：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(19, 56, 49, 15, "品名：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(58, 56, 54, 15, "二级单位：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(47, 56, 49, 15, "规格：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(71, 56, 54, 15, "联系人：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(85, 56, 54, 15, "联系方式：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(100, 56, 56, 15, "入库日期：");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(5, 90, 176, 15, daNumber);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "daNumber");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(17, 81, 176, 15, staName);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "staName");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(32, 89, 176, 15, termOfValidity);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "termOfValidity");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(46, 80, 176, 15, specifications);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "specifications");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(100, 98, 176, 15, createTime);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "createTime");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(58, 98, 176, 15, deptName);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "deptName");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(71, 89, 176, 15, userName);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "userName");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  LODOP.ADD_PRINT_TEXT(84, 98, 176, 15, phone);
  LODOP.SET_PRINT_STYLEA(0, "ContentVName", "phone");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);

  LODOP.NewPage();
}

export { PrintBig, PrintMiddle, PrintSmall }
