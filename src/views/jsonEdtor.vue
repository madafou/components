<template>
  <v-jsoneditor class="change-layout" v-model="value" :options="options" :plus="true" :height="'height'"
    @error="onError" />
</template>
<script>
import VJsoneditor from 'v-jsoneditor/src/index'
export default {
  components: {
    VJsoneditor
  },
  props: {
    value: '',
    height: '',
    options: {
      type: Object,
      default: () => { }
    },
    plus: {
      type: Boolean,
      default: false
    },

  },
  methods: {
    onError(ev) {
      this.$emit('error', ev)
    }
  }
}
</script>
<style>
.change-layout .jsoneditor-menu,
.change-layout .jsoneditor-statusbar {
  display: none;
}

.change-layout div.jsoneditor-outer.has-main-menu-bar {
  margin-top: 0;
}
</style>