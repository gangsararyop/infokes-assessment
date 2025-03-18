<script setup lang="ts">
import type { Folder } from "../../types";
import Item from "./components/Item.vue";

interface SidebarProps {
  folders: Folder[];
  selectedFolderId: number | null;
}

const { folders } = defineProps<SidebarProps>();

const emit = defineEmits<{
  (e: "select-folder", id: number): void;
}>();
</script>

<template>
  <div
    class="w-full max-w-[250px] min-h-screen p-[16px_12px] bg-white shadow-[1px_0px_0px_0px_rgba(229,231,235,1)] overflow-scroll"
  >
    <div class="w-auto">
      <Item
        v-for="folder in folders"
        :key="folder.id"
        :id="folder.id"
        :name="folder.name"
        :folders="folder.folders"
        :child-count="0"
        :selected-folder-id="selectedFolderId"
        @select-folder="emit('select-folder', $event)"
      />
    </div>
  </div>
</template>
