'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy, Target, Users, Calendar, Award, TrendingUp, Star, ExternalLink } from 'lucide-react'

interface SeasonPageProps {
  params: Promise<{
    tournament: string
    season: string
  }>
}

// Mock data - 実際の実装ではデータベースから取得
const getTournamentSeasonData = async (permalink: string, season: string) => {
  // 実際の実装では、permalinkとseasonに基づいてデータベースからデータを取得
  const mockData = {
    'xxxleague': {
      '2024-spring': {
        tournament: {
          id: 1,
          name: '2024春季リーグ戦',
          type: 'league',
          status: 'active',
          description: '2024年春季のリーグ戦です。レギュラーシーズンとプレーオフを実施します。',
          isPublic: true,
          publicPageSettings: {
            primaryColor: '#1e40af',
            secondaryColor: '#3b82f6',
            accentColor: '#f59e0b',
            fontFamily: 'Inter',
            headerText: '2024春季リーグ戦 - BaskEdge',
            footerText: '© 2024 BaskEdge. All rights reserved.',
            customCSS: ''
          }
        },
        season: {
          name: '2024春季',
          startDate: '2024-03-01',
          endDate: '2024-05-31',
          status: 'active',
          teams: 12,
          games: 60
        },
        standings: [
          { position: 1, team: 'レイカーズ', wins: 15, losses: 5, winPercentage: 0.750 },
          { position: 2, team: 'ウォリアーズ', wins: 14, losses: 6, winPercentage: 0.700 },
          { position: 3, team: 'セルティックス', wins: 13, losses: 7, winPercentage: 0.650 },
          { position: 4, team: 'ヒート', wins: 12, losses: 8, winPercentage: 0.600 },
          { position: 5, team: 'バックス', wins: 11, losses: 9, winPercentage: 0.550 },
          { position: 6, team: 'ナゲッツ', wins: 10, losses: 10, winPercentage: 0.500 },
          { position: 7, team: 'スパーズ', wins: 9, losses: 11, winPercentage: 0.450 },
          { position: 8, team: 'マーベリックス', wins: 8, losses: 12, winPercentage: 0.400 },
          { position: 9, team: 'サンズ', wins: 7, losses: 13, winPercentage: 0.350 },
          { position: 10, team: 'ブレイザーズ', wins: 6, losses: 14, winPercentage: 0.300 },
          { position: 11, team: 'ロケッツ', wins: 5, losses: 15, winPercentage: 0.250 },
          { position: 12, team: 'キングス', wins: 4, losses: 16, winPercentage: 0.200 },
        ],
        playerStats: [
          { position: 1, name: '田中 太郎', team: 'レイカーズ', points: 28.5, threePointers: 3.2, fg: 12.1, ft: 8.7 },
          { position: 2, name: '佐藤 次郎', team: 'ウォリアーズ', points: 26.8, threePointers: 4.1, fg: 10.8, ft: 7.2 },
          { position: 3, name: '鈴木 三郎', team: 'セルティックス', points: 24.3, threePointers: 2.8, fg: 9.9, ft: 6.8 },
          { position: 4, name: '高橋 四郎', team: 'ヒート', points: 22.7, threePointers: 3.5, fg: 9.2, ft: 5.9 },
          { position: 5, name: '山田 五郎', team: 'バックス', points: 21.9, threePointers: 2.1, fg: 8.7, ft: 7.4 },
          { position: 6, name: '伊藤 六郎', team: 'ナゲッツ', points: 20.4, threePointers: 3.8, fg: 8.1, ft: 5.2 },
          { position: 7, name: '渡辺 七郎', team: 'スパーズ', points: 19.8, threePointers: 2.9, fg: 7.9, ft: 6.1 },
          { position: 8, name: '中村 八郎', team: 'マーベリックス', points: 18.6, threePointers: 3.1, fg: 7.4, ft: 4.8 },
          { position: 9, name: '小林 九郎', team: 'サンズ', points: 17.9, threePointers: 2.4, fg: 7.1, ft: 5.3 },
          { position: 10, name: '加藤 十郎', team: 'ブレイザーズ', points: 16.7, threePointers: 2.7, fg: 6.6, ft: 4.1 },
        ],
        gameResults: [
          { date: '2024-05-15', home: 'レイカーズ', away: 'ウォリアーズ', homeScore: 108, awayScore: 102, status: 'completed' },
          { date: '2024-05-14', home: 'セルティックス', away: 'ヒート', homeScore: 95, awayScore: 88, status: 'completed' },
          { date: '2024-05-13', home: 'バックス', away: 'ナゲッツ', homeScore: 112, awayScore: 105, status: 'completed' },
          { date: '2024-05-12', home: 'スパーズ', away: 'マーベリックス', homeScore: 89, awayScore: 92, status: 'completed' },
          { date: '2024-05-11', home: 'サンズ', away: 'ブレイザーズ', homeScore: 101, awayScore: 97, status: 'completed' },
          { date: '2024-05-10', home: 'ロケッツ', away: 'キングス', homeScore: 85, awayScore: 78, status: 'completed' },
        ],
        upcomingGames: [
          { date: '2024-05-20', home: 'ウォリアーズ', away: 'セルティックス', time: '19:00', venue: 'アリーナA' },
          { date: '2024-05-21', home: 'ヒート', away: 'バックス', time: '20:00', venue: 'アリーナB' },
          { date: '2024-05-22', home: 'ナゲッツ', away: 'スパーズ', time: '19:30', venue: 'アリーナC' },
          { date: '2024-05-23', home: 'マーベリックス', away: 'サンズ', time: '18:30', venue: 'アリーナA' },
          { date: '2024-05-24', home: 'ブレイザーズ', away: 'ロケッツ', time: '20:30', venue: 'アリーナB' },
          { date: '2024-05-25', home: 'キングス', away: 'レイカーズ', time: '19:00', venue: 'アリーナC' },
        ],
        threePointLeaders: [
          { position: 1, name: '佐藤 次郎', team: 'ウォリアーズ', threePointers: 4.1, attempts: 8.2, percentage: 50.0 },
          { position: 2, name: '伊藤 六郎', team: 'ナゲッツ', threePointers: 3.8, attempts: 7.5, percentage: 50.7 },
          { position: 3, name: '高橋 四郎', team: 'ヒート', threePointers: 3.5, attempts: 7.8, percentage: 44.9 },
          { position: 4, name: '中村 八郎', team: 'マーベリックス', threePointers: 3.1, attempts: 6.9, percentage: 44.9 },
          { position: 5, name: '田中 太郎', team: 'レイカーズ', threePointers: 3.2, attempts: 7.3, percentage: 43.8 },
        ],
        fgLeaders: [
          { position: 1, name: '田中 太郎', team: 'レイカーズ', fg: 12.1, attempts: 20.3, percentage: 59.6 },
          { position: 2, name: '佐藤 次郎', team: 'ウォリアーズ', fg: 10.8, attempts: 18.7, percentage: 57.8 },
          { position: 3, name: '鈴木 三郎', team: 'セルティックス', fg: 9.9, attempts: 17.2, percentage: 57.6 },
          { position: 4, name: '高橋 四郎', team: 'ヒート', fg: 9.2, attempts: 16.8, percentage: 54.8 },
          { position: 5, name: '山田 五郎', team: 'バックス', fg: 8.7, attempts: 16.1, percentage: 54.0 },
        ],
        ftLeaders: [
          { position: 1, name: '田中 太郎', team: 'レイカーズ', ft: 8.7, attempts: 9.2, percentage: 94.6 },
          { position: 2, name: '山田 五郎', team: 'バックス', ft: 7.4, attempts: 8.1, percentage: 91.4 },
          { position: 3, name: '佐藤 次郎', team: 'ウォリアーズ', ft: 7.2, attempts: 8.0, percentage: 90.0 },
          { position: 4, name: '渡辺 七郎', team: 'スパーズ', ft: 6.1, attempts: 6.8, percentage: 89.7 },
          { position: 5, name: '鈴木 三郎', team: 'セルティックス', ft: 6.8, attempts: 7.6, percentage: 89.5 },
        ],
        sponsors: [
          { name: 'スポーツ用品店A', category: 'スポンサー', website: 'https://example.com' },
          { name: '飲料メーカーB', category: '飲料', website: 'https://example.com' },
          { name: '銀行C', category: '金融', website: 'https://example.com' },
          { name: '自動車メーカーD', category: '自動車', website: 'https://example.com' },
          { name: '保険会社E', category: '保険', website: 'https://example.com' },
        ]
      },
      '2025-spring': {
        tournament: {
          id: 2,
          name: '2025春季リーグ戦',
          type: 'league',
          status: 'draft',
          description: '2025年春季のリーグ戦です。',
          isPublic: true,
          publicPageSettings: {
            primaryColor: '#dc2626',
            secondaryColor: '#ef4444',
            accentColor: '#f59e0b',
            fontFamily: 'Inter',
            headerText: '2025春季リーグ戦 - BaskEdge',
            footerText: '© 2025 BaskEdge. All rights reserved.',
            customCSS: ''
          }
        },
        season: {
          name: '2025春季',
          startDate: '2025-03-01',
          endDate: '2025-05-31',
          status: 'draft',
          teams: 0,
          games: 0
        },
        standings: [],
        playerStats: [],
        gameResults: [],
        upcomingGames: [],
        threePointLeaders: [],
        fgLeaders: [],
        ftLeaders: [],
        sponsors: []
      }
    }
  }

  const tournamentData = mockData[permalink as keyof typeof mockData]
  if (!tournamentData) return null

  const seasonData = tournamentData[season as keyof typeof tournamentData]
  if (!seasonData) return null

  return seasonData
}

export default function SeasonPublicPage({ params }: SeasonPageProps) {
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [resolvedParams, setResolvedParams] = React.useState<{ tournament: string; season: string } | null>(null)

  React.useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  React.useEffect(() => {
    if (resolvedParams) {
      const fetchData = async () => {
        const result = await getTournamentSeasonData(resolvedParams.tournament, resolvedParams.season)
        setData(result)
        setLoading(false)
      }
      fetchData()
    }
  }, [resolvedParams])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data || !data.tournament.isPublic) {
    notFound()
  }

  const { tournament, season, standings, playerStats, gameResults, upcomingGames, threePointLeaders, fgLeaders, ftLeaders, sponsors } = data

  return (
    <div 
      className="min-h-screen"
      style={{
        '--primary-color': tournament.publicPageSettings.primaryColor,
        '--secondary-color': tournament.publicPageSettings.secondaryColor,
        '--accent-color': tournament.publicPageSettings.accentColor,
        fontFamily: tournament.publicPageSettings.fontFamily
      } as React.CSSProperties}
    >
      {/* Custom CSS */}
      {tournament.publicPageSettings.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: tournament.publicPageSettings.customCSS }} />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center py-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <motion.h1 
                className="text-3xl font-bold" 
                style={{ color: 'var(--primary-color)' }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {tournament.publicPageSettings.headerText}
              </motion.h1>
              <motion.p 
                className="mt-2 text-lg text-gray-600"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {season.name} - {tournament.description}
              </motion.p>
            </div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--accent-color)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {season.name}
              </motion.div>
              <motion.div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--secondary-color)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tournament.type === 'league' ? 'リーグ戦' : 'トーナメント'}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Standings and Player Stats - 2列表示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Trophy className="inline h-6 w-6 mr-2" />
                順位表
              </h2>
              {standings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">順位</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">チーム</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">勝</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">負</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">勝率</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {standings.map((team: any, index: number) => (
                        <motion.tr 
                          key={team.team} 
                          className={index < 3 ? 'bg-yellow-50' : ''}
                          whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                          transition={{ duration: 0.2 }}
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.position}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.team}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {team.wins}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {team.losses}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(team.winPercentage * 100).toFixed(1)}%
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>順位表データは準備中です</p>
                </div>
              )}
            </div>

            {/* Player Stats Ranking */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Target className="inline h-6 w-6 mr-2" />
                プレイヤースコアランキング
              </h2>
              {playerStats.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">順位</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">選手名</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">チーム</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">得点</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3P</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FG</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FT</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {playerStats.map((player: any, index: number) => (
                        <tr key={player.name} className={index < 3 ? 'bg-yellow-50' : ''}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {player.position}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {player.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.team}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                            {player.points}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.threePointers}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.fg}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {player.ft}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>プレイヤー統計データは準備中です</p>
                </div>
              )}
            </div>
          </div>

          {/* Game Results and Upcoming Games - 2列表示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Game Results */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Calendar className="inline h-6 w-6 mr-2" />
                試合結果一覧
              </h2>
              {gameResults.length > 0 ? (
                <div className="space-y-4">
                  {gameResults.map((game: any, index: number) => (
                    <motion.a 
                      key={index} 
                      href={`/${resolvedParams?.tournament}/${resolvedParams?.season}/games/game-${index + 1}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{game.date}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{game.home}</span>
                          <span className="text-gray-500">vs</span>
                          <span className="font-medium">{game.away}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span 
                          className="px-2 py-1 rounded text-sm font-medium"
                          style={{ 
                            backgroundColor: game.homeScore > game.awayScore ? 'var(--accent-color)' : '#6b7280',
                            color: 'white'
                          }}
                        >
                          {game.homeScore}
                        </span>
                        <span className="text-gray-500">-</span>
                        <span 
                          className="px-2 py-1 rounded text-sm font-medium"
                          style={{ 
                            backgroundColor: game.awayScore > game.homeScore ? 'var(--accent-color)' : '#6b7280',
                            color: 'white'
                          }}
                        >
                          {game.awayScore}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>試合結果は準備中です</p>
                </div>
              )}
            </div>

            {/* Upcoming Games */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Award className="inline h-6 w-6 mr-2" />
                次の試合予定一覧
              </h2>
              {upcomingGames.length > 0 ? (
                <div className="space-y-4">
                  {upcomingGames.map((game: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{game.date}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{game.home}</span>
                          <span className="text-gray-500">vs</span>
                          <span className="font-medium">{game.away}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{game.time}</div>
                        <div className="text-xs text-gray-500">{game.venue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>予定されている試合はありません</p>
                </div>
              )}
            </div>
          </div>

          {/* Goal Leaders - 3列表示 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
              <TrendingUp className="inline h-6 w-6 mr-2" />
              ゴール別ランキング
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 3P Leaders */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: 'var(--secondary-color)' }}>
                  3ポイント
                </h3>
                <div className="space-y-3">
                  {threePointLeaders.map((player: any, index: number) => (
                    <div key={player.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">#{player.position}</span>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-gray-500">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">{player.threePointers}</div>
                        <div className="text-xs text-gray-500">{player.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FG Leaders */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: 'var(--secondary-color)' }}>
                  フィールドゴール
                </h3>
                <div className="space-y-3">
                  {fgLeaders.map((player: any, index: number) => (
                    <div key={player.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">#{player.position}</span>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-gray-500">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">{player.fg}</div>
                        <div className="text-xs text-gray-500">{player.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FT Leaders */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: 'var(--secondary-color)' }}>
                  フリースロー
                </h3>
                <div className="space-y-3">
                  {ftLeaders.map((player: any, index: number) => (
                    <div key={player.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">#{player.position}</span>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-gray-500">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">{player.ft}</div>
                        <div className="text-xs text-gray-500">{player.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sponsors - 1列表示 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
              <Star className="inline h-6 w-6 mr-2" />
              スポンサー
            </h2>
            {sponsors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {sponsors.map((sponsor: any, index: number) => (
                  <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">{sponsor.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{sponsor.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{sponsor.category}</p>
                    <a 
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs"
                      style={{ color: 'var(--secondary-color)' }}
                    >
                      ウェブサイト
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>スポンサー情報は準備中です</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            {tournament.publicPageSettings.footerText}
          </p>
        </div>
      </footer>
    </div>
  )
}

// メタデータはクライアントコンポーネントでは使用できません