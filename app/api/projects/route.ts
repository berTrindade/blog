import { NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/projects-utils'

export async function GET() {
  const projects = getAllProjects()
  return NextResponse.json(projects)
}
