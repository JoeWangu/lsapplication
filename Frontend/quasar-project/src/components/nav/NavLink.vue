<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    class="text-white"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'NavLink'
});

export interface NavLinkProps {
  // title: string;
  // caption?: string;
  icon?: string;
  label: string;
  separator: boolean;
  link?: string;
};

withDefaults(defineProps<NavLinkProps>(), {
  // caption: '',
  icon: 'school',
  label: 'menuItem',
  separator: false,
  link: '#',
});
</script>
