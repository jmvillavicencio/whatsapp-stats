<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <form id="file-upload-form">
      <v-text-field
        label="Whatsapp Group Name"
        single-line
        solo
        :value="groupName"
        @input="setGroupName"
        autofocus
      />
      <div class="uploader">
        <drag-and-drop @change="fileSelected" />
      </div>
    </form>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import DragAndDrop from '../components/DragAndDrop';

export default {
  components: { DragAndDrop },
  computed: {
    ...mapState(['groupName']),
  },
  methods: {
    ...mapActions(['setGroupName', 'setChat']),
    fileSelected(file) {
      this.setChat(file);
    },
  },
};
</script>
