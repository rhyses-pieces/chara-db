import type { Editor } from 'svelte-tiptap';
import StarterKit from '@tiptap/starter-kit';

const chainer = (editor: Editor) => editor.chain().focus();

const toggleBold = (editor: Editor) => chainer(editor).toggleBold().run();
const toggleItalic = (editor: Editor) => chainer(editor).toggleItalic().run();
const toggleStrike = (editor: Editor) => chainer(editor).toggleStrike().run();
const toggleCode = (editor: Editor) => chainer(editor).toggleCode().run();

const toggleBullet = (editor: Editor) => chainer(editor).toggleBulletList().run();
const toggleOrder = (editor: Editor) => chainer(editor).toggleOrderedList().run();
const indentList = (editor: Editor) => chainer(editor).sinkListItem('listItem').run();
const outdentList = (editor: Editor) => chainer(editor).liftListItem('listItem').run();

const toggleHeading = (level: 1 | 2 | 3) => {
  return (editor: Editor) => chainer(editor).toggleHeading({ level }).run();
}

const toggleBlockquote = (editor: Editor) => chainer(editor).toggleBlockquote().run();
const toggleCodeBlock = (editor: Editor) => chainer(editor).toggleCodeBlock().run();

const setParagraph = (editor: Editor) => chainer(editor).setParagraph().run();
const setHr = (editor: Editor) => chainer(editor).setHorizontalRule().run();

const undo = (editor: Editor) => chainer(editor).undo().run();
const redo = (editor: Editor) => chainer(editor).redo().run();
const removeFormat = (editor: Editor) => chainer(editor).clearNodes().unsetAllMarks().run();

export {
  toggleBold,
  toggleItalic,
  toggleStrike,
  toggleCode,
  toggleBullet,
  toggleOrder,
  indentList,
  outdentList,
  toggleHeading,
  toggleBlockquote,
  toggleCodeBlock,
  setParagraph,
  setHr,
  undo,
  redo,
  removeFormat,
}