<script setup lang="ts">
import { ref } from "vue";
import type { Folder } from "../../../types";

interface ItemProps {
  id: number;
  name: string;
  folders: Folder[];
  childCount?: number;
  selectedFolderId: number | null;
}

const { id, name, folders, childCount, selectedFolderId } =
  defineProps<ItemProps>();

const open = ref<boolean>(false);

const handleOpen = (e: MouseEvent) => {
  e.stopPropagation();
  open.value = !open.value;
};

const emit = defineEmits<{
  (e: "select-folder", id: number): void;
}>();

const handleFolderClick = () => {
  emit("select-folder", id);
};
</script>

<template>
  <div
    class="relative z-1 px-2 py-1.5 w-full flex flex-row items-center space-x-1 cursor-pointer hover:bg-gray-100"
    :class="selectedFolderId === id ? 'bg-gray-100' : ''"
    @click="handleFolderClick"
  >
    <div class="w-5 h-5 p-0.5 shrink-0">
      <div v-if="folders.length > 0" @click="handleOpen">
        <img
          src="/public/icons/chevron-down-ic.svg"
          :class="`w-full h-full duration-150 ${
            open ? 'rotate-0' : '-rotate-90'
          }`"
        />
      </div>
    </div>

    <div class="flex flex-row items-center space-x-1">
      <div class="shrink-0">
        <img
          :src="`/public/icons/${open ? 'folder-open-ic' : 'folder-ic'}.svg`"
          class="w-6 h-6 p-0.5"
        />
      </div>

      <p class="text-[16px] leading-[16px] text-[#111827] shrink-0">
        {{ name }}
      </p>
    </div>
  </div>

  <!-- Recursive components -->
  <div v-if="folders.length > 0 && open">
    <Item
      v-for="folder in folders"
      :key="folder.id"
      :id="folder.id"
      :name="folder.name"
      :folders="folder.folders"
      :child-count="(childCount ?? 0) + 1"
      :selected-folder-id="selectedFolderId"
      @select-folder="emit('select-folder', $event)"
    />
  </div>
</template>
