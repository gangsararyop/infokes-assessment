<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from "vue";
import type { File, Folder } from "../../types";
import AddFileModal from "./components/AddFileModal.vue";
import AddFolderModal from "./components/AddFolderModal.vue";

interface ContentProps {
  fetchFolders: () => Promise<void>;
  selectedFolderId: number | null;
}

const { fetchFolders, selectedFolderId } = defineProps<ContentProps>();

const files = ref<File[]>([]);
const folder = ref<Folder | null>(null);

const fetchFiles = async () => {
  try {
    // Fetch files from the local API endpoint (no environment variable used for simplicity)
    const response = await fetch(
      `http://localhost:3000/v1/files?folderId=${selectedFolderId}`
    );

    const data = await response.json();

    files.value = data;
  } catch (error) {
    console.error(error);
  }
};

const fetchFolder = async () => {
  try {
    // Fetch folder from the local API endpoint (no environment variable used for simplicity)
    const response = await fetch(
      `http://localhost:3000/v1/folders/${selectedFolderId}`
    );

    const data = await response.json();

    folder.value = data;
  } catch (error) {
    console.error(error);
  }
};

onUpdated;

onMounted(() => {
  fetchFiles();
});

onMounted(() => {
  fetchFolder();
});

watch(() => selectedFolderId, fetchFiles);
watch(() => selectedFolderId, fetchFolder);

const emit = defineEmits<{
  (e: "select-folder", id: number): void;
}>();

const handleFolderClick = (id: number) => {
  emit("select-folder", id);
};
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="container">
        <div class="p-4 w-full">
          <div
            class="p-8 bg-white rounded-[16px] shadow-[0px_1px_3px_0px_#0000001A]"
          >
            <div v-if="selectedFolderId">
              <div class="flex flex-row items-center space-x-4 mb-12">
                <AddFolderModal
                  :fetch-folder="fetchFolder"
                  :fetch-folders="fetchFolders"
                  :selected-folder-id="selectedFolderId"
                />

                <AddFileModal
                  :fetch-files="fetchFiles"
                  :selected-folder-id="selectedFolderId"
                />
              </div>

              <div
                v-if="folder?.folders.length"
                class="grid grid-cols-8 gap-4 mb-8"
              >
                <div v-for="folder of folder?.folders" class="w-full">
                  <div
                    class="flex flex-col items-center space-y-2 cursor-pointer"
                    @click="() => handleFolderClick(folder.id)"
                  >
                    <div class="w-[50px] h-[50px] shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                      </svg>
                    </div>

                    <p class="text-center">{{ folder.name }}</p>
                  </div>
                </div>
              </div>

              <div v-if="files.length" class="grid grid-cols-8 gap-4">
                <div v-for="file of files" class="w-full">
                  <div class="flex flex-col items-center space-y-2">
                    <div class="w-[50px] h-[50px] shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </div>

                    <p class="text-center">{{ file.name }}</p>
                  </div>
                </div>
              </div>

              <div v-if="!files.length && !folder?.folders.length">
                <div class="h-[400px] flex items-center justify-center">
                  <h1 class="text-xl text-black">No Folder/File Exist</h1>
                </div>
              </div>
            </div>

            <div v-if="!selectedFolderId" class="w-full h-[500px]">
              <AddFolderModal
                :fetch-folder="fetchFolder"
                :fetch-folders="fetchFolders"
                :selected-folder-id="selectedFolderId"
              />

              <div class="h-full flex items-center justify-center">
                <h1 class="text-xl text-black">No Folder Selected</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
