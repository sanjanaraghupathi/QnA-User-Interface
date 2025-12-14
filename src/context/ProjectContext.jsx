import { createContext, useContext, useState } from 'react'
import { projects as initialProjects } from '../data/projects'
import { executions as initialExecutions } from '../data/executions'

const ProjectContext = createContext()

export const useProject = () => {
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider')
    }
    return context
}

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(initialProjects)
    const [executions, setExecutions] = useState(initialExecutions)

    const addProject = (project) => {
        setProjects(prev => [...prev, project])
    }

    const addExecution = (projectId, execution) => {
        setExecutions(prev => {
            const currentExecutions = prev[projectId] || []
            // Add new execution to the beginning of the list
            return {
                ...prev,
                [projectId]: [execution, ...currentExecutions]
            }
        })
    }

    const getExecutions = (projectId) => {
        return executions[projectId] || []
    }

    const getResult = (resultId) => {
        // Search through all executions to find the matching resultId
        for (const pid in executions) {
            const found = executions[pid].find(e => e.resultId === resultId)
            if (found) {
                // For now, return the found summary merged with some mock details
                // so the DetailedResults page doesn't crash.
                // In a real app, you'd fetch the full details from an API.

                // Mock data structure based on data/results.js
                return {
                    ...found,
                    projectName: projects.find(p => p.id === found.projectId)?.name || found.projectId,
                    completedDate: found.executionDate,
                    overallConfidence: found.status.toLowerCase() === 'pass'
                        ? (Math.random() * (99.9 - 85.0) + 85.0).toFixed(1)
                        : (Math.random() * (65.0 - 40.0) + 40.0).toFixed(1),
                    checkpoints: [
                        {
                            id: "CP-001",
                            name: "Data Integrity Check",
                            outcome: "PASS",
                            confidence: 99.2,
                            reasoning: "The integrity verification algorithm confirmed that 100% of the primary keys in the ingestion set are unique and valid. Cross-field validation rules showed zero discrepancies across 50,000 records.",
                            evidence: ["Data_Volume_Report.pdf", "Ingestion_Log_v2.txt"]
                        },
                        {
                            id: "CP-002",
                            name: "Compliance Validation",
                            outcome: "PASS",
                            confidence: 97.5,
                            reasoning: "Automated policy scanner verified adherence to ISO 27001 data handling requirements. All sensitive fields were found to be encrypted at rest. Two minor formatting warnings were auto-corrected.",
                            evidence: ["Compliance_Scan_Result.json"]
                        },
                        {
                            id: "CP-003",
                            name: "Performance Metrics",
                            outcome: "PASS",
                            confidence: 98.8,
                            reasoning: "Latency analysis indicates an average response time of 45ms, well below the 200ms SLA threshold. Throughput remained stable at 1,200 req/sec during the load test window.",
                            evidence: ["Load_Test_Summary.csv", "Latency_Distribution_Chart.png"]
                        }
                    ],
                    insights: [
                        {
                            type: "AI Analysis",
                            title: "Data Reliability Assessment",
                            content: "Cross-reference validation confirms 99.8% accuracy across key performance indicators. The model analyzed 15,000 data points and found strong correlation with historical benchmarks, suggesting high reliability for this reporting period."
                        },
                        {
                            type: "Rule Evaluation",
                            title: "Compliance Check",
                            content: "Passed. All examined records meet the FY2025 standard."
                        },
                        {
                            type: "Recommendation",
                            title: "Optimization Opportunity",
                            content: "We detected a potential bottleneck in the data ingestion pipeline during peak hours. While not critical, we recommend scaling the ingestion service or scheduling heavy loads for off-peak times to improve overall processing efficiency by an estimated 15%."
                        }
                    ],
                    knowledgeSources: {
                        executionLogs: [
                            { timestamp: new Date().toISOString(), level: "INFO", message: "QA Run initiated for project" },
                            { timestamp: new Date(Date.now() + 2000).toISOString(), level: "INFO", message: "Loading knowledge base documents" },
                            { timestamp: new Date(Date.now() + 5000).toISOString(), level: "INFO", message: "Starting checkpoint evaluation" },
                            { timestamp: new Date(Date.now() + 10000).toISOString(), level: "INFO", message: "All checkpoints passed successfully" }
                        ],
                        sharepointReferences: [
                            { name: "Compliance Guidelines 2025", type: "PDF", path: "/Compliance/Guidelines.pdf", lastModified: "2025-01-15" },
                            { name: "Risk Assessment Framework", type: "DOCX", path: "/Risk/Framework.docx", lastModified: "2025-02-20" }
                        ]
                    },
                    // Allow overriding with real details if we had them stored separately
                }
            }
        }
        return null
    }

    const updateProject = (projectId, updates) => {
        setProjects(prev => prev.map(p =>
            p.id === projectId ? { ...p, ...updates } : p
        ))
    }

    const value = {
        projects,
        addProject,
        updateProject,
        addExecution,
        getExecutions,
        getResult
    }

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}
