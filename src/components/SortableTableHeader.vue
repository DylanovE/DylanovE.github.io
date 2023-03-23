<template>
  <th class="sortable" @click="$emit('sort')">
    <span v-if="sortColumn == type">{{ sortDirection === 1 ? `${ type }&#x25b4;` : `${ type }&#x25be;` }}</span>
    <span v-else>{{ type }}&#x25b4;&#x25be;</span>
  </th>
</template>

<script setup>
defineEmits(['sort']);

defineProps({
  sortDirection: {
    type: Number,
    default: undefined,
  },
  sortColumn: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});
</script>
