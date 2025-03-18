<script setup lang="ts">
import { ref } from "vue";

interface AddFolderModalProps {
  fetchFiles: () => Promise<void>;
  selectedFolderId: number | null;
}

const { fetchFiles, selectedFolderId } = defineProps<AddFolderModalProps>();

const fileName = ref("");
const loading = ref(false);

const createFolder = async () => {
  if (!fileName.value.trim() || !selectedFolderId) return; // Prevent empty input

  loading.value = true;

  try {
    await fetch("http://localhost:3000/v1/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fileName.value,
        folderId: selectedFolderId,
      }),
    });

    fileName.value = "";

    const modal = document.getElementById(
      "add_file"
    ) as HTMLDialogElement | null;

    modal?.close();

    await fetchFiles();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const onAddNewFile = async () => {
  await createFolder();
};
</script>

<template>
  <button class="btn btn-circle bg-transparent" onclick="add_file.showModal()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#000000"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  </button>

  <dialog id="add_file" class="modal">
    <div class="modal-box">
      <fieldset
        class="fieldset bg-base-200 border border-base-300 p-4 rounded-box"
      >
        <legend class="fieldset-legend">File Name</legend>
        <div class="join">
          <input
            v-model="fileName"
            type="text"
            class="input join-item"
            placeholder="File Name"
          />
          <button class="btn join-item" @click="onAddNewFile">
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-if="!loading">Add</span>
          </button>
        </div>
      </fieldset>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
