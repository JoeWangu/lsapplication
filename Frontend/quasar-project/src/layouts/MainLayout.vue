<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary'">

      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="school" />
            LS Application
          </div>
        </q-toolbar-title>
        <!-- <q-btn to="/" label="Home" flat />
        <q-btn to="customers" label="Customers" flat />
        <q-btn to="projects" label="Projects" flat /> -->
      </q-toolbar>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" :breakpoint="500" overlay bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'">
      <q-scroll-area class="fit">

        <q-list>
          <br>
          <q-item-label class="text-white" style="font-size: 1.5em;">Navigation</q-item-label>
          <br>
          <!-- <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable tag="a" class="text-white"
              :active="menuItem.label === 'Inbox'" v-ripple>

              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>

              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>

            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template> -->
          <NavLink v-for="link in navLinks" :key="link.label" v-bind="link" />
        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavLink from 'components/nav/NavLink.vue';

defineOptions({
  name: 'MainLayout'
});

const navLinks = [
  {
    icon: 'home',
    label: 'Home',
    separator: false,
    link: '/'
  },
  {
    icon: 'lightbulb',
    label: 'Projects',
    separator: false,
    link: '/projects'
  },
  // {
  //   icon: 'person',
  //   label: 'Customers',
  //   separator: false,
  //   link: '/customers'
  // },
  // {
  //   icon: 'delete',
  //   label: 'Trash',
  //   separator: false
  // },
  // {
  //   icon: 'error',
  //   label: 'Spam',
  //   separator: true
  // },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    link: '/settings'
  },
  // {
  //   icon: 'feedback',
  //   label: 'Send Feedback',
  //   separator: false
  // },
  // {
  //   icon: 'help',
  //   iconColor: 'primary',
  //   label: 'Help',
  //   separator: false
  // }
]

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>
