## LESS

### 变量

```less
/* Less */
@color: #999;
@bgColor: skyblue; //不要添加引号
@width: 50%;
#wrap {
  color: @color;
  background: @bgColor;
  width: @width;
}

/* 生成后的 CSS */
#wrap {
  color: #999;
  background: skyblue;
  width: 50%;
}
```

### 嵌套

```less
/* Less */
#header {
  &:after {
    content: "Less is more!";
  }
  .title {
    font-weight: bold;
  }
  &_content {
    //理解方式：直接把 & 替换成 #header
    margin: 20px;
  }
}
/* 生成的 CSS */
#header::after {
  content: "Less is more!";
}
#header .title {
  //嵌套了
  font-weight: bold;
}
#header_content {
  //没有嵌套！
  margin: 20px;
}
```

### 导入

```less
import "main";
//等价于
import "main.less";

// =====@import 的位置可随意放置=============

#main{
  font-size:15px;
}
@import "style";

```

### 函数

判断类型： isnumber，iscolor，isurl
数学函数：ceil，floor，abs，pow
