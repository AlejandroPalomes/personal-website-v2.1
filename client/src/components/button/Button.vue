<template>
    <button :class="`button__primary ${this.active && 'button__primary__active'}`">
      <slot/>
    </button>
</template>

<script>
    export default {
        name: 'Card',
        props: {
          active: Boolean
        }
    }
</script>
