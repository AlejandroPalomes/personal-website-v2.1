<template>
    <button :class="`button__secondary ${this.active && 'button__secondary__active'}`">
      <slot/>
    </button>
</template>

<script>
    export default {
        name: 'SecondaryButton',
        props: {
          active: Boolean
        }
    }
</script>
