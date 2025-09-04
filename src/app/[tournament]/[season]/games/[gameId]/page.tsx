import React from 'react'
import { notFound } from 'next/navigation'
import { Calendar, Clock, MapPin, Trophy, Target, BarChart3, MessageCircle, ExternalLink, Play, Share2, Bookmark } from 'lucide-react'

interface GameDetailPageProps {
  params: {
    tournament: string
    season: string
    gameId: string
  }
}

// Mock data - 実際の実装ではデータベースから取得
const getGameDetailData = async (permalink: string, season: string, gameId: string) => {
  const mockData = {
    'xxxleague': {
      '2024-spring': {
        'game-1': {
          game: {
            id: 'game-1',
            date: '2024-05-15',
            time: '18:40',
            venue: '吉川市総合体育館 コートA',
            venueAddress: '〒342-0017 埼玉県吉川市上笹塚1丁目58-1 吉川市総合体育館',
            league: 'Micro League',
            season: '2025',
            status: 'completed',
            youtubeVideoId: 'dQw4w9WgXcQ', // 実際の動画IDに置き換え
            youtubeTitle: '2025 MLRS 第12節 IRIS vs HILTON'
          },
          homeTeam: {
            name: 'IRIS',
            score: 30,
            quarters: { q1: 10, q2: 3, q3: 9, q4: 9, total: 30 },
            result: 'Loss'
          },
          awayTeam: {
            name: 'HILTON',
            score: 60,
            quarters: { q1: 19, q2: 10, q3: 16, q4: 15, total: 60 },
            result: 'Win'
          },
          homeTeamStats: [
            { number: 1, name: '田中 太郎', pts: 8, threePointers: 2, fgm: 3, ftm: 0, pf: 2, minutes: 25 },
            { number: 2, name: '佐藤 次郎', pts: 6, threePointers: 1, fgm: 2, ftm: 1, pf: 1, minutes: 20 },
            { number: 3, name: '鈴木 三郎', pts: 5, threePointers: 1, fgm: 2, ftm: 0, pf: 2, minutes: 18 },
            { number: 4, name: '高橋 四郎', pts: 4, threePointers: 0, fgm: 1, ftm: 2, pf: 1, minutes: 15 },
            { number: 5, name: '山田 五郎', pts: 3, threePointers: 0, fgm: 1, ftm: 1, pf: 2, minutes: 12 },
            { number: 6, name: '伊藤 六郎', pts: 2, threePointers: 0, fgm: 1, ftm: 0, pf: 1, minutes: 8 },
            { number: 7, name: '渡辺 七郎', pts: 1, threePointers: 0, fgm: 0, ftm: 1, pf: 1, minutes: 5 },
            { number: 8, name: '中村 八郎', pts: 0, threePointers: 0, fgm: 0, ftm: 0, pf: 0, minutes: 3 }
          ],
          awayTeamStats: [
            { number: 10, name: '加藤 十郎', pts: 15, threePointers: 2, fgm: 6, ftm: 1, pf: 1, minutes: 28 },
            { number: 11, name: '小林 十一郎', pts: 12, threePointers: 1, fgm: 5, ftm: 1, pf: 2, minutes: 25 },
            { number: 12, name: '松本 十二郎', pts: 10, threePointers: 1, fgm: 4, ftm: 1, pf: 1, minutes: 22 },
            { number: 13, name: '井上 十三郎', pts: 8, threePointers: 1, fgm: 3, ftm: 1, pf: 1, minutes: 20 },
            { number: 14, name: '木村 十四郎', pts: 6, threePointers: 0, fgm: 3, ftm: 0, pf: 1, minutes: 18 },
            { number: 15, name: '林 十五郎', pts: 5, threePointers: 0, fgm: 2, ftm: 1, pf: 1, minutes: 15 },
            { number: 16, name: '森 十六郎', pts: 3, threePointers: 0, fgm: 1, ftm: 1, pf: 1, minutes: 12 },
            { number: 17, name: '原田 十七郎', pts: 1, threePointers: 0, fgm: 0, ftm: 1, pf: 0, minutes: 5 }
          ],
          teamTotals: {
            home: { pts: 31, threePointers: 4, fgm: 8, ftm: 3, pf: 10, minutes: 7 },
            away: { pts: 60, threePointers: 5, fgm: 20, ftm: 5, pf: 8, minutes: 10 }
          },
          comments: [
            {
              id: 1,
              author: 'microadmin',
              content: '素晴らしい試合でした！両チームとも頑張りました。',
              timestamp: '2024-05-15 20:30',
              isAdmin: true
            },
            {
              id: 2,
              author: 'fan123',
              content: 'HILTONの連携プレーが印象的でした。',
              timestamp: '2024-05-15 21:15',
              isAdmin: false
            }
          ],
          sponsors: [
            { name: 'N 成本歯科医院', logo: '/sponsors/narimoto.png' },
            { name: 'FLOOR SEAL', logo: '/sponsors/floor-seal.png' },
            { name: 'マイホームカラー', logo: '/sponsors/myhome-color.png' }
          ]
        }
      }
    }
  }

  const tournamentData = mockData[permalink as keyof typeof mockData]
  if (!tournamentData) return null

  const seasonData = tournamentData[season as keyof typeof tournamentData]
  if (!seasonData) return null

  const gameData = seasonData[gameId as keyof typeof seasonData]
  if (!gameData) return null

  return gameData
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const data = await getGameDetailData(params.tournament, params.season, params.gameId)

  if (!data) {
    notFound()
  }

  const { game, homeTeam, awayTeam, homeTeamStats, awayTeamStats, teamTotals, comments, sponsors } = data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {homeTeam.name} {homeTeam.score} VS {awayTeam.score} {awayTeam.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {game.date} {game.time} - {game.venue}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Play className="h-4 w-4 mr-2" />
                後で見る
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                共有
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Video Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">結果</h2>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">{game.youtubeTitle}</p>
                <p className="text-sm text-gray-400 mt-2">7:29</p>
              </div>
            </div>
          </div>

          {/* Game Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Game Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">詳細</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{game.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{game.time}</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{game.league}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">シーズン: {game.season}</span>
                </div>
              </div>
            </div>

            {/* Court Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">コート</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{game.venue}</p>
                    <p className="text-xs text-gray-500 mt-1">{game.venueAddress}</p>
                  </div>
                </div>
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Google Map</span>
                </div>
              </div>
            </div>

            {/* Score Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">全体結果</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {homeTeam.score} - {awayTeam.score}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={`px-2 py-1 rounded ${homeTeam.result === 'Win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {homeTeam.result}
                    </span>
                    <span className={`px-2 py-1 rounded ${awayTeam.result === 'Win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {awayTeam.result}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quarter Scores */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">クォーター別スコア</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">チーム</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">1Q</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">2Q</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">3Q</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">4Q</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">合計</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{homeTeam.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{homeTeam.quarters.q1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{homeTeam.quarters.q2}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{homeTeam.quarters.q3}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{homeTeam.quarters.q4}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900">{homeTeam.quarters.total}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{awayTeam.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{awayTeam.quarters.q1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{awayTeam.quarters.q2}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{awayTeam.quarters.q3}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{awayTeam.quarters.q4}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900">{awayTeam.quarters.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Player Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Home Team Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">{homeTeam.name}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">選手</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PTS</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">3PM</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">FGM</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">FTM</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PF</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">MR</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {homeTeamStats.map((player, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.number}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.pts}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.threePointers}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.fgm}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.ftm}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.pf}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.minutes}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">合計</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"></td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.home.pts}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.home.threePointers}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.home.fgm}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.home.ftm}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.home.pf}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.home.minutes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Away Team Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">{awayTeam.name}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">選手</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PTS</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">3PM</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">FGM</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">FTM</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PF</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">MR</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {awayTeamStats.map((player, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.number}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.pts}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.threePointers}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.fgm}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.ftm}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.pf}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{player.minutes}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">合計</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"></td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.away.pts}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.away.threePointers}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.away.fgm}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.away.ftm}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.away.pf}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900">{teamTotals.away.minutes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Statistics Comparison Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              統計比較
            </h3>
            <div className="space-y-4">
              {[
                { label: 'PTS', home: teamTotals.home.pts, away: teamTotals.away.pts },
                { label: '3PM', home: teamTotals.home.threePointers, away: teamTotals.away.threePointers },
                { label: 'FGM', home: teamTotals.home.fgm, away: teamTotals.away.fgm },
                { label: 'FTM', home: teamTotals.home.ftm, away: teamTotals.away.ftm },
                { label: 'PF', home: teamTotals.home.pf, away: teamTotals.away.pf },
                { label: 'MR', home: teamTotals.home.minutes, away: teamTotals.away.minutes }
              ].map((stat, index) => {
                const maxValue = Math.max(stat.home, stat.away)
                const homePercentage = maxValue > 0 ? (stat.home / maxValue) * 100 : 0
                const awayPercentage = maxValue > 0 ? (stat.away / maxValue) * 100 : 0
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{stat.label}</span>
                      <div className="flex space-x-4">
                        <span>{stat.home}</span>
                        <span>{stat.away}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                        <div 
                          className="bg-blue-400 h-2 rounded-full" 
                          style={{ width: `${homePercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${awayPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              START A CONVERSATION
            </h3>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                microadmin としてログインしています。プロフィールを編集します。ログアウトしますか？ ※が付いている欄は必須項目です
              </p>
            </div>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                    {comment.isAdmin && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">管理者</span>
                    )}
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              ))}
              <div className="mt-6">
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="コメントを入力してください..."
                ></textarea>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  コメントを送信
                </button>
              </div>
            </div>
          </div>

          {/* Sponsors */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">協賛企業</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sponsors.map((sponsor, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{sponsor.name}</span>
                  </div>
                  <p className="text-sm text-gray-700">{sponsor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// メタデータ生成
export async function generateMetadata({ params }: GameDetailPageProps) {
  const data = await getGameDetailData(params.tournament, params.season, params.gameId)

  if (!data) {
    return {
      title: '試合が見つかりません',
    }
  }

  const { game, homeTeam, awayTeam } = data

  return {
    title: `${homeTeam.name} vs ${awayTeam.name} - ${game.date}`,
    description: `${game.date} ${game.time}の${homeTeam.name} vs ${awayTeam.name}の試合詳細`,
  }
}
