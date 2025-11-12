import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MarkdownDocsLayout } from '@/components/docs/markdown-docs-layout'
import type { Metadata } from 'next'

interface DocPageProps {
  params: Promise<{ slug: string[] }>
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), 'docs')

  // Helper function to recursively get all .md files
  function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[] {
    const files: string[] = []

    if (!fs.existsSync(dir)) {
      return files
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        files.push(...getAllMarkdownFiles(fullPath, baseDir))
      } else if (entry.name.endsWith('.md')) {
        const relativePath = path.relative(baseDir, fullPath)
        files.push(relativePath)
      }
    }

    return files
  }

  const markdownFiles = getAllMarkdownFiles(docsDirectory)

  return markdownFiles.map((file) => {
    // Remove .md extension and split into segments
    const slug = file.replace(/\.md$/, '').split(path.sep)
    return { slug }
  })
}

// Generate metadata for each doc page
export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'docs', ...slug) + '.md'

  if (!fs.existsSync(filePath)) {
    return {
      title: 'Not Found',
    }
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(fileContent)

  return {
    title: `${frontmatter.title || 'Documentation'} - CRUDKit`,
    description: frontmatter.description || 'CRUDKit documentation',
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'docs', ...slug) + '.md'

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound()
  }

  // Read and parse markdown file
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContent)

  return (
    <MarkdownDocsLayout
      title={frontmatter.title || 'Documentation'}
      description={frontmatter.description}
      markdown={content}
    />
  )
}
