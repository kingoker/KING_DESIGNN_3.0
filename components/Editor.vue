<template>
  <client-only>
    <div v-if="editor" class="editor-container">
      <!-- Панель форматирования -->
      <div class="control-group">
        <div class="button-group">
          <!-- Marks -->
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ active: editor.isActive('bold') }"
          >B</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ active: editor.isActive('italic') }"
          >I</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ active: editor.isActive('strike') }"
          >S</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ active: editor.isActive('code') }"
          ><code>Code</code></button>
          <button
            class="format-btn"
            @click="editor.chain().focus().unsetAllMarks().run()"
          >Clear Marks</button>

          <!-- Nodes -->
          <button
            class="format-btn"
            @click="editor.chain().focus().clearNodes().run()"
          >Clear Nodes</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ active: editor.isActive('paragraph') }"
          >Paragraph</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ active: editor.isActive('heading', { level: 1 }) }"
          >H1</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ active: editor.isActive('heading', { level: 2 }) }"
          >H2</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ active: editor.isActive('heading', { level: 3 }) }"
          >H3</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ active: editor.isActive('heading', { level: 4 }) }"
          >H4</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ active: editor.isActive('heading', { level: 5 }) }"
          >H5</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ active: editor.isActive('heading', { level: 6 }) }"
          >H6</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ active: editor.isActive('bulletList') }"
          >Bullet List</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ active: editor.isActive('orderedList') }"
          >Ordered List</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ active: editor.isActive('codeBlock') }"
          >Code Block</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ active: editor.isActive('blockquote') }"
          >Blockquote</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().setHorizontalRule().run()"
          >Horizontal Rule</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().setHardBreak().run()"
          >Hard Break</button>

          <!-- History -->
          <button
            class="format-btn"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >Undo</button>
          <button
            class="format-btn"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
          >Redo</button>

          <!-- Color -->
          <button
            class="format-btn"
            @click="editor.chain().focus().setColor('#958DF1').run()"
            :class="{ active: editor.isActive('textStyle', { color: '#958DF1' }) }"
          >🎨</button>
        </div>
      </div>

      <!-- Контент редактора -->
      <editor-content :editor="editor" class="tiptap" />
    </div>
  </client-only>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit,
      Placeholder.configure({ placeholder: 'Начните вводить текст...' }),
    ],
    content: props.modelValue,
    editorProps: {
      attributes: { class: 'tiptap' },
    },
    onUpdate({ editor }) {
      emit('update:modelValue', editor.getHTML())
    },
  })
})

// Синхронизация v-model
watch(
  () => props.modelValue,
  (val) => {
    if (editor.value && editor.value.getHTML() !== val) {
      editor.value.commands.setContent(val, false)
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>


<style scoped lang="scss">
.editor-container {
  .control-group {
    margin-bottom: 1rem;
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
  .format-btn {
    background: #222;
    color: #fafafa;
    border: 1px solid #444;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;

    &.active { background: #555; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  }
}

.tiptap {
  min-height: 250px;
  padding: 1rem;
  border: 1px solid #444;
  background: #1e1e1e;
  color: #fafafa;
  overflow-y: auto;

  ul, ol { padding: 0 1rem; margin: 1rem 0; }
  h1, h2, h3, h4, h5, h6 { margin: 1.5rem 0 1rem; }
}
.ProseMirror{
  padding: 10px;
}

</style>