<template>
    <div class="searcher">
      <input
        :placeholder="placeholder"
        @keyup="onInputChange"
        @focus="setIsOptionsListVisible(true)"
        @blur="setIsOptionsListVisible(false)"
      />
      <ul v-show="Boolean(isOptionsListVisible && options.length)">
        <li
          v-bind:key="option.name"
          v-for="(option) in options"
          @mousedown="onSelect(option)"
        ><span>{{option.name}}</span></li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: 'Searcher',
        props: ['options', 'placeholder', 'onSelect', 'onInputChange'],
        data() {
          return {
            isOptionsListVisible: false
          }
        },
        methods: {
          setIsOptionsListVisible: function(status) {
            this.isOptionsListVisible = status;
          }
        }
    }
</script>
