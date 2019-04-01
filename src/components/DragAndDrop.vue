<template>
  <div>
    <input id="file-upload" ref="fileInput" type="file" name="fileUpload" @change="fileSelectHandler"/>
    <label for="file-upload" id="file-drag" :class="{'hover': dragAreaSelected, 'modal-body file-upload': !dragAreaSelected}">
      <div id="start">
        <v-icon v-if="!loading && !success && !badFormat">mdi-file-upload</v-icon>
        <v-icon color="green" v-if="!loading && success">mdi-check-circle</v-icon>
        <v-icon color="orange darken-1" v-if="!loading && badFormat">mdi-alert-circle</v-icon>
        <div id="notimage" v-if="!loading && badFormat" class="font-weight-bold">Please select a .txt file</div>
        <div v-if="!loading && success" class="font-weight-bold">Yay! Everything went OK!</div>
        <div v-if="!loading && !success">Select a file or drag here</div>
        <v-btn v-if="!loading" id="file-upload-btn" color="success" class="white--text" :outline="success" @click="$refs.fileInput.click()">
          {{ (success || badFormat) ? 'Select another file' : 'Select a file' }}
        </v-btn>
        <v-btn to="/dashboard" v-if="success" color="success">
          Go to dashboard
        </v-btn>
      </div>
      <div id="response" v-if="loading">
        Loading...
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragArea: null,
      dragAreaSelected: false,
      badFormat: false,
      success: false,
      loading: false,
      startUpload: false,
      fileSelect: null,
    };
  },
  mounted() {
    this.dragArea = document.getElementById('file-drag');
    this.fileSelect = document.getElementById('file-upload');
    this.dragArea.addEventListener('dragover', this.fileDragHandler, false);
    this.dragArea.addEventListener('dragleave', this.fileDragHandler, false);
    this.dragArea.addEventListener('drop', this.fileSelectHandler, false);
  },
  methods: {
    fileDragHandler(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dragAreaSelected = e.type === 'dragover';
    },
    fileSelectHandler(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.fileDragHandler(e);
      this.parseFile(files[0]);
    },
    async parseFile(file) {
      const isGood = (/\.(?=txt)/gi).test(file.name);
      this.loading = true;
      this.badFormat = !isGood;
      this.startUpload = isGood;
      try {
        if (isGood) {
          const content = await this.getContent(file);
          this.$emit('change', content);
          this.success = isGood;
        }
      } catch(e) {
        console.log(e);
        this.badFormat = true;
      }
      this.loading = false;
    },
    getContent(file) {
      return new Promise((resolve) => {
        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          resolve(text);
        };
        reader.readAsText(file);
      })
    },
  },
};
</script>

<style lang="scss">
$theme:       #4CAF50;
$dark-text:   #5f6982;
#file-upload-form {
  margin: 0 auto;
  width: 600px;
}
.uploader {
  display: block;
  clear: both;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  label {
    float: left;
    clear: both;
    width: 100%;
    padding: 5px 3px;
    text-align: center;
    background: #fff;
    border-radius: 2px;
    //border: 3px solid #eee;
    transition: all .2s ease;
    user-select: none;
    -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

    &:hover {
      border-color: $theme;
    }
    &.hover {
      border: 3px solid $theme;
      padding: 2px 0px;
      #start {
        i.mdi {
          transform: scale(0.8);
          opacity: 0.3;
        }
      }
    }
  }

  #start {
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
    i.mdi {
      font-size: 50px;
      margin-bottom: 1rem;
      transition: all .2s ease-in-out;
    }
  }
  #response {
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
    #messages {
      margin-bottom: .5rem;
    }
  }

  #file-image {
    display: inline;
    margin: 0 auto .5rem auto;
    width: auto;
    height: auto;
    max-width: 180px;
    &.hidden {
      display: none;
    }
  }

  #notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
  }

  progress,
  .progress {
    // appearance: none;
    display: inline;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    height: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
  }

  .progress[value]::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #eee;
  }

  .progress[value]::-webkit-progress-value {
    background: linear-gradient(to right, darken($theme,8%) 0%, $theme 50%);
    border-radius: 4px;
  }
  .progress[value]::-moz-progress-bar {
    background: linear-gradient(to right, darken($theme,8%) 0%, $theme 50%);
    border-radius: 4px;
  }

  input[type="file"] {
    display: none;
  }

  .btn {
    display: inline-block;
    margin: .5rem .5rem 1rem .5rem;
    clear: both;
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    text-transform: initial;
    border: none;
    border-radius: .2rem;
    outline: none;
    padding: 0 1rem;
    height: 36px;
    line-height: 36px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    background: $theme;
    border-color: $theme;
    cursor: pointer;
  }
}
</style>
