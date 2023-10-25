import type { Editor } from 'svelte-tiptap';
import {
  toggleBlockquote,
  toggleBold,
  toggleBullet,
  toggleCode,
  toggleCodeBlock,
  toggleHeading,
  toggleItalic,
  toggleOrder,
  toggleStrike,
  setHr,
  setParagraph,
  indentList,
  outdentList,
  undo,
  redo,
  removeFormat,
} from './functions';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Indent,
  Italic,
  List,
  ListOrdered,
  Minus,
  Outdent,
  Pilcrow,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Terminal,
  Undo,
} from 'lucide-svelte';

let isActive = (name: string, attrs = {}) => {
  return (editor: Editor) => editor.isActive(name, attrs);
}

const headingItems = [
  {
    name: 'paragraph',
    label: 'Paragraph',
    icon: Pilcrow,
    command: setParagraph,
    active: isActive('paragraph'),
  },
  {
    name: 'heading-1',
    label: 'Heading 1',
    icon: Heading1,
    command: toggleHeading(1),
    active: isActive('heading', { level: 1 }),
  },
  {
    name: 'heading-2',
    label: 'Heading 2',
    icon: Heading2,
    command: toggleHeading(2),
    active: isActive('heading', { level: 2 }),
  },
  {
    name: 'heading-3',
    label: 'Heading 3',
    icon: Heading3,
    command: toggleHeading(3),
    active: isActive('heading', { level: 3 }),
  },
];

const textStyleItems = [
  {
    name: 'bold',
    label: 'Bold',
    icon: Bold,
    command: toggleBold,
    active: isActive('bold'),
  },
  {
    name: 'italic',
    label: 'Italic',
    icon: Italic,
    command: toggleItalic,
    active: isActive('italic'),
  },
  {
    name: 'strike',
    label: 'Strikethrough',
    icon: Strikethrough,
    command: toggleStrike,
    active: isActive('strike'),
  },
  {
    name: 'code',
    label: 'Code',
    icon: Code,
    command: toggleCode,
    active: isActive('code'),
  },
];

const listItems = [
  {
    name: 'bullet',
    label: 'Bullet List',
    icon: List,
    command: toggleBullet,
    active: isActive('bullet'),
    disabled: () => false,
  },
  {
    name: 'ordered',
    label: 'Ordered List',
    icon: ListOrdered,
    command: toggleOrder,
    active: isActive('ordered'),
    disabled: () => false,
  },
  {
    name: 'indent-list',
    label: 'Indent List Item',
    icon: Indent,
    command: indentList,
    active: () => false,
    disabled: (editor: Editor) => !editor.can().sinkListItem('listItem'),
  },
  {
    name: 'outdent-list',
    label: 'Outdent List Item',
    icon: Outdent,
    command: outdentList,
    active: () => false,
    disabled: (editor: Editor) => !editor.can().liftListItem('listItem'),
  },
];

const blockItems = [
  {
    name: 'blockquote',
    label: 'Blockquote',
    icon: Quote,
    command: toggleBlockquote,
    active: isActive('blockquote'),
  },
  {
    name: 'codeblock',
    label: 'Code Block',
    icon: Terminal,
    command: toggleCodeBlock,
    active: isActive('codeBlock'),
  },
  {
    name: 'hr',
    label: 'Horizontal Rule',
    icon: Minus,
    command: setHr,
    active: () => false,
  }
];

const controlItems = [
  {
    name: 'undo',
    label: 'Undo',
    icon: Undo,
    command: undo,
    disabled: (editor: Editor) => !editor.can().undo(),
  },
  {
    name: 'redo',
    label: 'Redo',
    icon: Redo,
    command: redo,
    disabled: (editor: Editor) => !editor.can().redo(),
  },
  {
    name: 'remove-format',
    label: 'Remove Formatting',
    icon: RemoveFormatting,
    command: removeFormat,
    disabled: () => false,
  }
];

export {
  blockItems,
  controlItems,
  listItems,
  textStyleItems,
  headingItems,
}