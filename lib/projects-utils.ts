interface Project {
  id: string
  title: string
  description: string
  url?: string
  icon?: string
  category?: string
}

export function getAllProjects(): Project[] {
  // You can move this to a JSON file or database later
  return [
    {
      id: 'release-automation',
      title: 'Release Automation Examples',
      description: 'Examples and best practices for automating software releases and deployment workflows.',
      url: 'https://github.com/berTrindade/release-automation-examples',
      category: 'DevOps'
    },
    {
      id: 'bullmq-report',
      title: 'BullMQ Report Generator',
      description: 'A scalable report generation system built with BullMQ for handling background jobs efficiently.',
      url: 'https://github.com/berTrindade/bullmq-report-generator',
      category: 'Development'
    },
    {
      id: 'otel-poc',
      title: 'OpenTelemetry POC',
      description: 'Proof of concept for implementing observability and distributed tracing with OpenTelemetry.',
      url: 'https://github.com/berTrindade/otel-poc',
      category: 'Development'
    },
  ]
}
