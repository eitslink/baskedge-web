import { notFound } from 'next/navigation'

interface SeasonPageProps {
  params: {
    tournament: string
    season: string
  }
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
        ],
        recentGames: [
          { date: '2024-05-15', home: 'レイカーズ', away: 'ウォリアーズ', homeScore: 108, awayScore: 102 },
          { date: '2024-05-14', home: 'セルティックス', away: 'ヒート', homeScore: 95, awayScore: 88 },
          { date: '2024-05-13', home: 'バックス', away: 'ナゲッツ', homeScore: 112, awayScore: 105 },
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
        recentGames: []
      }
    }
  }

  const tournamentData = mockData[permalink as keyof typeof mockData]
  if (!tournamentData) return null

  const seasonData = tournamentData[season as keyof typeof tournamentData]
  if (!seasonData) return null

  return seasonData
}

export default async function SeasonPublicPage({ params }: SeasonPageProps) {
  const data = await getTournamentSeasonData(params.tournament, params.season)

  if (!data || !data.tournament.isPublic) {
    notFound()
  }

  const { tournament, season, standings, recentGames } = data

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
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>
                {tournament.publicPageSettings.headerText}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {season.name} - {tournament.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                {season.name}
              </div>
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--secondary-color)' }}
              >
                {tournament.type === 'league' ? 'リーグ戦' : 'トーナメント'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Season Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Standings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
                {season.name} 順位表
              </h2>
              {standings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          順位
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          チーム
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          勝
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          敗
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          勝率
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {standings.map((team, index) => (
                        <tr key={team.team} className={index < 3 ? 'bg-yellow-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.team}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {team.wins}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {team.losses}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(team.winPercentage * 100).toFixed(1)}%
                          </td>
                        </tr>
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

            {/* Recent Games */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
                最近の試合結果
              </h2>
              {recentGames.length > 0 ? (
                <div className="space-y-4">
                  {recentGames.map((game, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>試合結果は準備中です</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Season Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-color)' }}>
                シーズン状況
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">シーズン</span>
                  <span className="font-semibold">{season.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">期間</span>
                  <span className="font-semibold">
                    {season.startDate} 〜 {season.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ステータス</span>
                  <span 
                    className="px-2 py-1 rounded text-sm font-medium text-white"
                    style={{ backgroundColor: 'var(--secondary-color)' }}
                  >
                    {season.status === 'active' ? '開催中' : '準備中'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">参加チーム</span>
                  <span className="font-semibold">{season.teams}チーム</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">試合数</span>
                  <span className="font-semibold">{season.games}試合</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-color)' }}>
                ナビゲーション
              </h3>
              <div className="space-y-2">
                <a 
                  href={`/${params.tournament}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  ← 大会トップに戻る
                </a>
                <a 
                  href="#standings" 
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  順位表を見る
                </a>
                <a 
                  href="#schedule" 
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  試合スケジュール
                </a>
              </div>
            </div>
          </div>
        </div>
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

// メタデータ生成
export async function generateMetadata({ params }: SeasonPageProps) {
  const data = await getTournamentSeasonData(params.tournament, params.season)

  if (!data || !data.tournament.isPublic) {
    return {
      title: 'シーズンが見つかりません',
    }
  }

  return {
    title: `${data.season.name} - ${data.tournament.name}`,
    description: `${data.season.name}の${data.tournament.description}`,
  }
}
