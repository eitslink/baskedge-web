import { notFound } from 'next/navigation'

interface TournamentPageProps {
  params: {
    tournament: string
  }
}

// Mock data - 実際の実装ではデータベースから取得
const getTournamentData = async (permalink: string) => {
  // 実際の実装では、permalinkに基づいてデータベースから大会データを取得
  const mockTournaments = {
    'xxxleague': {
      id: 1,
      name: '2024春季リーグ戦',
      type: 'league',
      status: 'active',
      description: '2024年春季のリーグ戦です。レギュラーシーズンとプレーオフを実施します。',
      rules: 'FIBAルールに準拠。各チーム20試合のレギュラーシーズン後、上位8チームがプレーオフに進出。',
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
    }
  }

  return mockTournaments[permalink as keyof typeof mockTournaments] || null
}

export default async function TournamentPublicPage({ params }: TournamentPageProps) {
  const tournament = await getTournamentData(params.tournament)

  if (!tournament || !tournament.isPublic) {
    notFound()
  }

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
                {tournament.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--accent-color)' }}
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
          {/* Tournament Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
                大会情報
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">大会名</h3>
                  <p className="text-gray-600">{tournament.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">大会形式</h3>
                  <p className="text-gray-600">
                    {tournament.type === 'league' ? 'リーグ戦' : 'トーナメント'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">大会ルール</h3>
                  <p className="text-gray-600 whitespace-pre-line">{tournament.rules}</p>
                </div>
              </div>
            </div>

            {/* Standings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
                順位表
              </h2>
              <div className="text-center text-gray-500 py-8">
                <p>順位表は準備中です</p>
              </div>
            </div>

            {/* Recent Games */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
                最近の試合
              </h2>
              <div className="text-center text-gray-500 py-8">
                <p>試合結果は準備中です</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tournament Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-color)' }}>
                大会状況
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ステータス</span>
                  <span 
                    className="px-2 py-1 rounded text-sm font-medium text-white"
                    style={{ backgroundColor: 'var(--secondary-color)' }}
                  >
                    {tournament.status === 'active' ? '開催中' : '準備中'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">参加チーム</span>
                  <span className="font-semibold">12チーム</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">試合数</span>
                  <span className="font-semibold">120試合</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-color)' }}>
                クイックリンク
              </h3>
              <div className="space-y-2">
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
                <a 
                  href="#teams" 
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  参加チーム一覧
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
export async function generateMetadata({ params }: TournamentPageProps) {
  const tournament = await getTournamentData(params.tournament)

  if (!tournament || !tournament.isPublic) {
    return {
      title: '大会が見つかりません',
    }
  }

  return {
    title: tournament.name,
    description: tournament.description,
  }
}
