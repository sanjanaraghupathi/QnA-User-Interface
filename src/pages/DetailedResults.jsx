import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  Target,
  Download,
  Share2
} from 'lucide-react'
import { getResultById } from '../data/results'
import ResultHeader from '../components/results/ResultHeader'
import CheckpointCard from '../components/results/CheckpointCard'
import InsightsPanel from '../components/results/InsightsPanel'
import KnowledgeSourceTabs from '../components/results/KnowledgeSourceTabs'

const DetailedResults = () => {
  const { resultId } = useParams()
  
  // Get result details
  const result = getResultById(resultId)

  if (!result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <h2 className="text-xl font-medium text-surface-300 mb-4">Result not found</h2>
        <p className="text-surface-500 mb-6">The result "{resultId}" could not be found.</p>
        <Link to="/" className="text-electric-400 hover:text-electric-300 transition-colors">
          Return to catalog
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Back Link */}
      <Link to={`/history/${result.projectId}`}>
        <motion.div
          className="inline-flex items-center gap-2 text-surface-400 hover:text-white mb-6 transition-colors"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to History</span>
        </motion.div>
      </Link>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </motion.button>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </motion.button>
      </div>

      {/* Result Header */}
      <ResultHeader result={result} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Checkpoints */}
        <div className="lg:col-span-2 space-y-6">
          {/* Checkpoint Outcomes Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg text-white">
                  Checkpoint Outcomes
                </h2>
                <p className="text-sm text-surface-400">
                  {result.checkpoints.length} checkpoints evaluated
                </p>
              </div>
            </div>

            {/* Checkpoint Summary Bar */}
            <div className="glass rounded-xl p-4 mb-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-surface-300">
                    Pass: {result.checkpoints.filter(c => c.outcome === 'PASS').length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-surface-300">
                    Fail: {result.checkpoints.filter(c => c.outcome === 'FAIL').length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-surface-300">
                    NR: {result.checkpoints.filter(c => c.outcome === 'NR').length}
                  </span>
                </div>
              </div>
              {/* Visual Progress */}
              <div className="flex mt-3 h-2 rounded-full overflow-hidden bg-surface-700/50">
                {result.checkpoints.map((checkpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex-1 ${
                      checkpoint.outcome === 'PASS' ? 'bg-emerald-500' :
                      checkpoint.outcome === 'FAIL' ? 'bg-red-500' :
                      checkpoint.outcome === 'NR' ? 'bg-indigo-500' :
                      'bg-surface-500'
                    }`}
                    style={{ originX: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Checkpoint Cards */}
            <div className="space-y-4">
              {result.checkpoints.map((checkpoint, index) => (
                <CheckpointCard 
                  key={checkpoint.id} 
                  checkpoint={checkpoint} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Insights & Knowledge Sources */}
        <div className="space-y-6">
          {/* Insights Panel */}
          <InsightsPanel insights={result.insights} />

          {/* Knowledge Sources */}
          <div>
            <h2 className="font-heading font-semibold text-lg text-white mb-4">
              Knowledge Sources
            </h2>
            <KnowledgeSourceTabs knowledgeSources={result.knowledgeSources} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DetailedResults

