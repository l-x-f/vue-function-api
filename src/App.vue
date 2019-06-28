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
    const list = value([0, 1, 2]);

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

