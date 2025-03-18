<script setup lang="ts">
import { onMounted, ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";
import Content from "./components/Content/index.vue";
import type { Folder } from "./types";

const folders = ref<Folder[]>([]);

const fetchFolders = async () => {
  try {
    // Fetch folders from the local API endpoint (no environment variable used for simplicity)
    const response = await fetch("http://localhost:3000/v1/folders");

    const data = await response.json();

    folders.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchFolders();
});

const selectedFolderId = ref<number | null>(null);

const handleFolderSelect = (id: number) => {
  selectedFolderId.value = id;
};
</script>

<template>
  <div class="font-inter">
    <Navbar />

    <div class="flex flex-row">
      <Sidebar
        :folders="folders"
        :selected-folder-id="selectedFolderId"
        @select-folder="handleFolderSelect"
      />

      <Content
        :fetch-folders="fetchFolders"
        :selected-folder-id="selectedFolderId"
        @select-folder="handleFolderSelect"
      />
    </div>
  </div>
</template>
