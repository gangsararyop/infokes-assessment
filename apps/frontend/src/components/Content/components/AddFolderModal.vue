<script setup lang="ts">
import { ref } from "vue";

interface AddFolderModalProps {
  fetchFolder: () => Promise<void>;
  fetchFolders: () => Promise<void>;
  selectedFolderId: number | null;
}

const { fetchFolder, fetchFolders, selectedFolderId } =
  defineProps<AddFolderModalProps>();

const folderName = ref("");
const loading = ref(false);

const createFolder = async () => {
  if (!folderName.value.trim()) return; // Prevent empty input

  loading.value = true;

  try {
    await fetch("http://localhost:3000/v1/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName.value,
        parentId: selectedFolderId || null,
      }),
    });

    folderName.value = "";

    const modal = document.getElementById(
      "add_modal"
    ) as HTMLDialogElement | null;

    modal?.close();

    await fetchFolders();
    await fetchFolder();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const onAddNewFolder = async () => {
  await createFolder();
};
</script>

<template>
  <button class="btn btn-circle bg-transparent" onclick="add_modal.showModal()">
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
        d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
      />
    </svg>
  </button>

  <dialog id="add_modal" class="modal">
    <div class="modal-box">
      <fieldset
        class="fieldset bg-base-200 border border-base-300 p-4 rounded-box"
      >
        <legend class="fieldset-legend">Folder Name</legend>
        <div class="join">
          <input
            v-model="folderName"
            type="text"
            class="input join-item"
            placeholder="Folder Name"
          />
          <button class="btn join-item" @click="onAddNewFolder">
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
