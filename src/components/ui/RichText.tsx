import type { ReactNode } from 'react'

/* ─── Lexical node types ──────────────────────────────────────────────────── */

type TextNode = {
  type:      'text'
  text:      string
  format?:   number   // bitmask: 1=bold 2=italic 4=strikethrough 8=underline 16=code
  detail?:   number
  mode?:     string
  style?:    string
}

type LineBreakNode = { type: 'linebreak' }

type BaseParent = {
  children: LexicalNode[]
  direction?: string
  format?:    string | number
  indent?:    number
  version?:   number
}

type ParagraphNode  = BaseParent & { type: 'paragraph' }
type HeadingNode    = BaseParent & { type: 'heading'; tag: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6' }
type QuoteNode      = BaseParent & { type: 'quote' }
type ListNode       = BaseParent & { type: 'list'; listType: 'bullet'|'number'|'check'; start?: number }
type ListItemNode   = BaseParent & { type: 'listitem'; value?: number; checked?: boolean }
type LinkNode       = BaseParent & { type: 'link'; fields?: { url?: string; newTab?: boolean } }
type UploadNode     = { type: 'upload'; value?: { url?: string; alt?: string; width?: number; height?: number } }

type LexicalNode =
  | TextNode
  | LineBreakNode
  | ParagraphNode
  | HeadingNode
  | QuoteNode
  | ListNode
  | ListItemNode
  | LinkNode
  | UploadNode

type RootNode = BaseParent & { type: 'root' }

export type LexicalContent = { root: RootNode }

/* ─── Text format bitmask ─────────────────────────────────────────────────── */

function applyFormat(text: string, format: number): ReactNode {
  if (!format) return text
  let node: ReactNode = text
  if (format & 16) node = <code className="bg-[var(--color-gray-100)] px-1.5 py-0.5 rounded text-[0.875em] font-mono">{node}</code>
  if (format & 1)  node = <strong className="font-[500]">{node}</strong>
  if (format & 2)  node = <em>{node}</em>
  if (format & 4)  node = <s>{node}</s>
  if (format & 8)  node = <u>{node}</u>
  return node
}

/* ─── Node serialiser ─────────────────────────────────────────────────────── */

function serializeNode(node: LexicalNode, index: number): ReactNode {
  switch (node.type) {
    case 'text':
      return <span key={index}>{applyFormat(node.text, node.format ?? 0)}</span>

    case 'linebreak':
      return <br key={index} />

    case 'paragraph':
      return (
        <p key={index} className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75] mb-5 last:mb-0">
          {node.children.map((child, i) => serializeNode(child, i))}
        </p>
      )

    case 'heading': {
      const Tag = node.tag
      const headingClass: Record<string, string> = {
        h2: 'text-[var(--color-ink)] font-[400] leading-tight mb-4 mt-10 first:mt-0',
        h3: 'text-[var(--color-ink)] font-[500] leading-snug  mb-3 mt-8 first:mt-0',
        h4: 'text-[var(--color-ink)] font-[500] leading-snug  mb-2 mt-6 first:mt-0',
      }
      return (
        <Tag
          key={index}
          className={headingClass[node.tag] ?? 'mb-3 mt-6 first:mt-0'}
          style={node.tag === 'h2' ? { fontSize: 'var(--text-h2)' } : undefined}
        >
          {node.children.map((child, i) => serializeNode(child, i))}
        </Tag>
      )
    }

    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-2 border-[var(--color-accent)] pl-6 my-8 text-[1.125rem] italic text-[var(--color-ink)]/75 leading-[1.75]"
        >
          {node.children.map((child, i) => serializeNode(child, i))}
        </blockquote>
      )

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <Tag
          key={index}
          className={`mb-5 pl-5 flex flex-col gap-2 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}
        >
          {node.children.map((child, i) => serializeNode(child, i))}
        </Tag>
      )
    }

    case 'listitem':
      return (
        <li key={index} className="text-[var(--color-ink)]/80 text-[1.0625rem] leading-[1.75] pl-1">
          {node.children.map((child, i) => serializeNode(child, i))}
        </li>
      )

    case 'link': {
      const href = node.fields?.url ?? '#'
      const external = node.fields?.newTab
      return (
        <a
          key={index}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
        >
          {node.children.map((child, i) => serializeNode(child, i))}
        </a>
      )
    }

    case 'upload':
      if (!node.value?.url) return null
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          src={node.value.url}
          alt={node.value.alt ?? ''}
          width={node.value.width}
          height={node.value.height}
          className="rounded-card w-full my-8"
          loading="lazy"
        />
      )

    default:
      return null
  }
}

/* ─── Component ───────────────────────────────────────────────────────────── */

type Props = {
  content:   LexicalContent | null | undefined
  className?: string
}

export default function RichText({ content, className = '' }: Props) {
  if (!content?.root?.children?.length) return null

  return (
    <div className={`richtext ${className}`}>
      {content.root.children.map((node, i) => serializeNode(node as LexicalNode, i))}
    </div>
  )
}
