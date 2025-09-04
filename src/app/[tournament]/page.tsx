import { notFound } from 'next/navigation'
import { 
  Calendar, 
  Users, 
  Trophy, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  FileText,
  Clock,
  UserPlus,
  Star,
  Award
} from 'lucide-react'

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
      name: 'BaskEdge リーグ戦',
      type: 'league',
      status: 'active',
      description: 'バスケットボール愛好家のためのリーグ戦です。レギュラーシーズンとプレーオフを実施し、真のチャンピオンを決定します。',
      rules: 'FIBAルールに準拠。各チーム20試合のレギュラーシーズン後、上位8チームがプレーオフに進出。',
      isPublic: true,
      publicPageSettings: {
        primaryColor: '#1e40af',
        secondaryColor: '#3b82f6',
        accentColor: '#f59e0b',
        fontFamily: 'Inter',
        headerText: 'BaskEdge リーグ戦',
        footerText: '© 2024 BaskEdge. All rights reserved.',
        customCSS: ''
      },
      // 大会詳細情報
      tournamentInfo: {
        foundedYear: 2020,
        totalSeasons: 8,
        totalTeams: 48,
        totalGames: 320,
        location: '東京都内各体育館',
        organizer: 'BaskEdge運営委員会',
        contactEmail: 'info@baskedge.com',
        contactPhone: '03-1234-5678'
      },
      // 大会要項・規約
      regulations: {
        eligibility: '18歳以上、健康な男女',
        registrationFee: '¥50,000/チーム',
        registrationDeadline: '2024-02-15',
        maxTeams: 16,
        minPlayers: 8,
        maxPlayers: 15,
        rules: [
          'FIBAルールに準拠',
          '各チーム20試合のレギュラーシーズン',
          '上位8チームがプレーオフに進出',
          'プレーオフはシングルエリミネーション方式',
          '試合時間は40分（10分×4クォーター）',
          'オーバータイムは5分間'
        ],
        penalties: [
          '遅刻15分以上は没収試合',
          '暴力行為は即失格',
          'ドーピング違反は永久出場停止'
        ]
      },
      // 各シーズン情報
      seasons: [
        {
          id: '2024-spring',
          name: '2024春季',
          status: 'active',
          startDate: '2024-03-01',
          endDate: '2024-05-31',
          teams: 12,
          games: 60,
          isPublic: true
        },
        {
          id: '2024-summer',
          name: '2024夏季',
          status: 'draft',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          teams: 0,
          games: 0,
          isPublic: false
        },
        {
          id: '2023-winter',
          name: '2023冬季',
          status: 'completed',
          startDate: '2023-12-01',
          endDate: '2024-02-29',
          teams: 14,
          games: 70,
          isPublic: true
        }
      ],
      // 出場チーム一覧
      participatingTeams: [
        { name: 'レイカーズ', logo: null, city: '渋谷区', founded: 2018, captain: '田中太郎' },
        { name: 'ウォリアーズ', logo: null, city: '新宿区', founded: 2019, captain: '佐藤花子' },
        { name: 'セルティックス', logo: null, city: '港区', founded: 2020, captain: '鈴木一郎' },
        { name: 'ヒート', logo: null, city: '世田谷区', founded: 2017, captain: '高橋美咲' },
        { name: 'バックス', logo: null, city: '目黒区', founded: 2021, captain: '山田健太' },
        { name: 'ナゲッツ', logo: null, city: '品川区', founded: 2019, captain: '伊藤さくら' },
        { name: 'スパーズ', logo: null, city: '大田区', founded: 2018, captain: '中村大輔' },
        { name: 'マーベリックス', logo: null, city: '杉並区', founded: 2020, captain: '小林優香' }
      ],
      // スポンサー一覧
      sponsors: [
        { name: 'スポーツ用品店A', logo: null, category: 'スポーツ用品', website: 'https://example.com' },
        { name: '飲料メーカーB', logo: null, category: '飲料', website: 'https://example.com' },
        { name: '自動車メーカーC', logo: null, category: '自動車', website: 'https://example.com' },
        { name: '金融機関D', logo: null, category: '金融', website: 'https://example.com' }
      ],
      // ソーシャルメディア
      socialMedia: {
        youtube: 'https://youtube.com/@baskedge',
        twitter: 'https://twitter.com/baskedge',
        instagram: 'https://instagram.com/baskedge',
        facebook: 'https://facebook.com/baskedge'
      },
      // 参加申し込み情報
      registration: {
        isOpen: true,
        waitingList: true,
        currentApplications: 12,
        maxApplications: 20,
        nextRegistrationOpen: '2024-06-01'
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
              <h1 className="text-4xl font-bold" style={{ color: 'var(--primary-color)' }}>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tournament Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Trophy className="inline h-6 w-6 mr-2" />
                大会情報
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      設立年
                    </h3>
                    <p className="text-gray-600">{tournament.tournamentInfo.foundedYear}年</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      開催シーズン数
                    </h3>
                    <p className="text-gray-600">{tournament.tournamentInfo.totalSeasons}シーズン</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      累計参加チーム数
                    </h3>
                    <p className="text-gray-600">{tournament.tournamentInfo.totalTeams}チーム</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      開催場所
                    </h3>
                    <p className="text-gray-600">{tournament.tournamentInfo.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      お問い合わせ
                    </h3>
                    <p className="text-gray-600">{tournament.tournamentInfo.contactPhone}</p>
                    <p className="text-gray-600">{tournament.tournamentInfo.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tournament Regulations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <FileText className="inline h-6 w-6 mr-2" />
                大会要項・規約
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">参加資格</h3>
                  <p className="text-gray-600">{tournament.regulations.eligibility}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">参加費</h3>
                    <p className="text-gray-600">{tournament.regulations.registrationFee}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">申込締切</h3>
                    <p className="text-gray-600">{tournament.regulations.registrationDeadline}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">最大チーム数</h3>
                    <p className="text-gray-600">{tournament.regulations.maxTeams}チーム</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">選手数</h3>
                    <p className="text-gray-600">{tournament.regulations.minPlayers}〜{tournament.regulations.maxPlayers}名</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">大会ルール</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {tournament.regulations.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">ペナルティ</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {tournament.regulations.penalties.map((penalty, index) => (
                      <li key={index}>{penalty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Seasons */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Calendar className="inline h-6 w-6 mr-2" />
                各シーズン
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournament.seasons.map((season) => (
                  <div key={season.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{season.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        season.status === 'active' ? 'bg-green-100 text-green-800' :
                        season.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {season.status === 'active' ? '開催中' :
                         season.status === 'completed' ? '完了' : '準備中'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {season.startDate} 〜 {season.endDate}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {season.teams}チーム / {season.games}試合
                    </p>
                    {season.isPublic && season.status === 'active' && (
                      <a 
                        href={`/${params.tournament}/${season.id}`}
                        className="inline-flex items-center text-sm font-medium"
                        style={{ color: 'var(--secondary-color)' }}
                      >
                        詳細を見る
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Participating Teams */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Users className="inline h-6 w-6 mr-2" />
                出場チーム一覧
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournament.participatingTeams.map((team, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
                          {team.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-sm text-gray-600">{team.city}</p>
                        <p className="text-xs text-gray-500">キャプテン: {team.captain}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsors */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <Star className="inline h-6 w-6 mr-2" />
                スポンサー一覧
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tournament.sponsors.map((sponsor, index) => (
                  <div key={index} className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color: 'var(--primary-color)' }}>
                        {sponsor.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm">{sponsor.name}</h3>
                    <p className="text-xs text-gray-600">{sponsor.category}</p>
                    <a 
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs mt-2"
                      style={{ color: 'var(--secondary-color)' }}
                    >
                      ウェブサイト
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                <UserPlus className="inline h-6 w-6 mr-2" />
                参加申し込み
              </h2>
              {tournament.registration.isOpen ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserPlus className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">申し込み受付中</h3>
                        <p className="text-sm text-green-700">
                          現在 {tournament.registration.currentApplications} / {tournament.registration.maxApplications} チームが申し込み済みです
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">チーム名</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="チーム名を入力してください"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">代表者名</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="代表者名を入力してください"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">連絡先メールアドレス</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="メールアドレスを入力してください"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">チーム紹介</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="チームの紹介を入力してください"
                      />
                    </div>
                    <button 
                      className="w-full px-4 py-2 text-white font-medium rounded-md"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      申し込みを送信
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">申し込み受付期間外</h3>
                  <p className="text-gray-600 mb-4">
                    次回の申し込み受付は {tournament.registration.nextRegistrationOpen} から開始予定です
                  </p>
                  {tournament.registration.waitingList && (
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      キャンセル待ちに登録
                    </button>
                  )}
                </div>
              )}
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
                  <span className="text-gray-600">累計試合数</span>
                  <span className="font-semibold">{tournament.tournamentInfo.totalGames}試合</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">開催シーズン数</span>
                  <span className="font-semibold">{tournament.tournamentInfo.totalSeasons}シーズン</span>
                </div>
              </div>
            </div>

            {/* YouTube Channel */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-color)' }}>
                <Youtube className="inline h-5 w-5 mr-2" />
                YouTubeチャンネル
              </h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Youtube className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">試合のハイライトやインタビューを配信中</p>
                <a 
                  href={tournament.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  チャンネルを見る
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-color)' }}>
                公式SNS
              </h3>
              <div className="space-y-3">
                <a 
                  href={tournament.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a 
                  href={tournament.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a 
                  href={tournament.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </a>
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
                <a 
                  href="#registration" 
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--secondary-color)' }}
                >
                  参加申し込み
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {tournament.publicPageSettings.footerText}
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href={tournament.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={tournament.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={tournament.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={tournament.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
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