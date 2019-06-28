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
import { value, onCreated, onMounted, onUpdated } from "vue-function-api";
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

    // 生命周期
    onCreated(() => {
      console.log(props.list, "onCreated"); // 拿不到异步props数据
    });

    onMounted(() => {
      console.log(props.list, "onMounted"); // 拿不到异步props数据
    });

    onUpdated(() => {
      console.log(props.list, "onUpdated"); // 可以拿到异步props数据
    });

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
