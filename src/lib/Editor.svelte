<script lang="ts">
  import { Editor, EditorContent, createEditor } from 'svelte-tiptap';
  import { onMount } from 'svelte';
  import StarterKit from '@tiptap/starter-kit';
  import Underline from '@tiptap/extension-underline';
  import { writable, type Readable } from 'svelte/store';
  import { 
    Bold, 
    ChevronDown, 
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
    SquareCode, 
    Strikethrough, 
    Undo 
  } from 'lucide-svelte';

  const store = writable();
  let editor: Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
        Underline,
      ],
      content: '',
      // onUpdate: () => {
      //   store.set($editor.getJSON());
      // },
    });
  });

  const chainer = () => $editor.chain().focus();
  
  const toggleBold = () => chainer().toggleBold().run();
  const toggleItalic = () => chainer().toggleItalic().run();
  const toggleUnderline = () => chainer().toggleUnderline().run();
  const toggleStrike = () => chainer().toggleStrike().run();
  const setParagraph = () => chainer().setParagraph().run();
  
  const toggleHeading = (level: 1 | 2 | 3) => {
    return () => chainer().toggleHeading({ level }).run();
  }
  const toggleBlockquote = () => chainer().toggleBlockquote().run();
  const toggleCodeblock = () => chainer().toggleCodeBlock().run();
  const setHorizontalRule = () => chainer().setHorizontalRule().run();

  const toggleBullet = () => chainer().toggleBulletList().run();
  const toggleOrdered = () => chainer().toggleOrderedList().run();
  const indentListItem = () => chainer().sinkListItem('listItem').run();
  const outdentListItem = () => chainer().liftListItem('listItem').run();
  
  const undo = () => chainer().undo().run();
  const redo = () => chainer().redo().run();
  const reset = () => chainer().clearNodes().unsetAllMarks().run();

  $: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
  $: headingItems = [
    {
      name: 'heading-1',
      command: toggleHeading(1),
      label: 'Heading 1',
      icon: Heading1,
      active: () => isActive('heading', { level: 1 }),
    },
    {
      name: 'heading-2',
      command: toggleHeading(2),
      label: 'Heading 2',
      icon: Heading2,
      active: () => isActive('heading', { level: 2 }),
    },
    {
      name: 'heading-3',
      command: toggleHeading(3),
      label: 'Heading 3',
      icon: Heading3,
      active: () => isActive('heading', { level: 3 }),
    },
    {
      name: 'paragraph',
      command: setParagraph,
      label: 'Paragraph',
      icon: Pilcrow,
      active: () => isActive('paragraph'),
    },
  ];
  $: textStyleItems = [
    {
      name: 'bold',
      command: toggleBold,
      label: 'Bold',
      icon: Bold,
      active: () => isActive('bold'),
    },
    {
      name: 'italic',
      command: toggleItalic,
      label: 'Italic',
      icon: Italic,
      active: () => isActive('italic'),
    },
    {
      name: 'underline',
      command: toggleUnderline,
      label: 'Underline',
      icon: Underline,
      active: () => isActive('underline'),
    },
    {
      name: 'strike',
      command: toggleStrike,
      label: 'Strikethrough',
      icon: Strikethrough,
      active: () => isActive('strike'),
    },
  ];
  $: listItems = [
    {
      name: 'bullet',
      command: toggleBullet,
      label: 'Unordered List',
      icon: List,
      active: () => isActive('bulletList'),
    },
    {
      name: 'ordered',
      command: toggleOrdered,
      label: 'Ordered List',
      icon: ListOrdered,
      active: () => isActive('orderedList'),
    },
    {
      name: 'indent-list',
      command: indentListItem,
      label: 'Indent List Item',
      icon: Indent,
    },
    {
      name: 'outdent-list',
      command: outdentListItem,
      label: 'Outdent List Item',
      icon: Outdent,
    },
  ];
  $: nodeItems = [
    {
      name: 'blockquote',
      command: toggleBlockquote,
      label: 'Blockquote',
      icon: Quote,
      active: () => isActive('blockquote'),
    },
    {
      name: 'codeblock',
      command: toggleCodeblock,
      label: 'Code Block',
      icon: SquareCode,
      active: () => isActive('codeBlock'),
    },
    {
      name: 'hr',
      command: setHorizontalRule,
      label: 'Horizontal Rule',
      icon: Minus,
    },
  ];
  $: controls = [
    {
      name: 'undo',
      command: undo,
      label: 'Undo',
      icon: Undo,
    },
    {
      name: 'redo',
      command: redo,
      label: 'Redo',
      icon: Redo,
    },
    {
      name: 'reset',
      command: reset,
      label: 'Remove Formatting',
      icon: RemoveFormatting,
    },
  ];

  let selectedHeading: any;
</script>
{#if editor}
<nav>
  <button>test</button>
</nav>
{/if}

<EditorContent editor={$editor} />