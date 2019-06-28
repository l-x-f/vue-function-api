# 尝鲜 vue3.0 新特性 Vue Function API 实现 todo list 

Vue Function API 已经公布半个多月了，今天尝鲜了一下

主要依赖： vue: 2.6.10 vue-function-api: 2.0.6

1.父组件

```js

<template>
  <div>
    <Children
      :list="list"
      @subAddItem="addItem"
      @subRemoveItem="removeItem"
      @subRemoveAll="removeAll"
    />
  </div>
</template>

<script>
import { value, onCreated } from "vue-function-api";
import Children from "./Children";
export default {
  components: {
    Children
  },

  setup(props, context) {
    const list = value([]);

    // 异步数据
    const getList = () => {
      return new Promise((resolve, reject) => {
        const defaultList = [
          "开会",
          "开完会写代码",
          "和产品沟通",
          "沟通完写代码",
          "和设计沟通",
          "写代码"
        ];
        setTimeout(() => {
          resolve(defaultList);
        }, 100);
      });
    };

    // 获取数据，初始化list数据
    onCreated(async () => {
      try {
        const defaultList = await getList();
        list.value = defaultList;
      } catch (error) {
        console.log(error);
      }
    });

    // 添加单个
    const addItem = inputValue => {
      list.value.push(inputValue);
    };

    // 删除单个
    const removeItem = item => {
      const result = confirm("确定要删除此项？");
      if (result) {
        list.value = list.value.filter(val => val !== item);
      }
    };

    // 删除所有
    const removeAll = item => {
      const result = confirm("确定要删除全部？");
      result ? (list.value = []) : "";
    };

    return {
      list,
      addItem,
      removeItem,
      removeAll
    };
  }
};
</script>




```

2.子组件

```js
<template>
  <div class="container">
    <h3>vue-function-api 实现todo list</h3>

    <div>
      <input type="text" v-model="inputValue">
      <button @click="subAddItem">新增</button>
    </div>

    <ul class="wrapper">
      <li class="item" v-for="(item,index) in list" :key="index">
        {{item}}
        <button class="delete-button" @click="subRemoveItem(item)">删除</button>
      </li>
      <li class="item" v-if="list.length>1">
        <button class="delete-button" @click="subRemoveAll">删除全部</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { value } from "vue-function-api";
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  setup(props, context) {
    const { emit } = context;
    const inputValue = value("");

    // 添加单个
    const subAddItem = () => {
      const { value } = inputValue;
      const { list } = props;
      if (!value) {
        alert("请输入内容");
        return;
      }
      if (list.includes(value)) {
        alert("已存在此项");
      } else {
        // 分发事件
        emit("subAddItem", value);
      }
      inputValue.value = "";
    };

    // 删除单个
    const subRemoveItem = item => {
      // 分发事件
      emit("subRemoveItem", item);
    };

    // 删除所有
    const subRemoveAll = () => {
      // 分发事件
      emit("subRemoveAll");
    };

    return {
      inputValue,
      subAddItem,
      subRemoveItem,
      subRemoveAll
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 400px;
  margin: 200px auto;
  padding: 20px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  .wrapper {
    box-sizing: border-box;
    width: 200px;
    margin: 0;
    padding: 0;
    .item {
      box-sizing: border-box;
      list-style: none;
      overflow: hidden;
      margin: 0;
      margin-top: 20px;
      color: #373737;
      cursor: pointer;
      .delete-button {
        float: right;
      }
    }
  }
}
</style>


```
3.实现效果


