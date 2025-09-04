'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Gamepad2,
  Users,
  Trophy,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  Plus,
  ArrowRight,
} from 'lucide-react'

export default function DashboardPage() {
  // ダミーデータ
  const stats = [
    {
      title: '今シーズンの試合数',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Gamepad2,
    },
    {
      title: '登録チーム数',
      value: '8',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: '今月の勝率',
      value: '75%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Trophy,
    },
    {
      title: '今週の試合',
      value: '3',
      change: '明日2試合',
      changeType: 'positive' as const,
      icon: Calendar,
    },
  ]

  const recentGames = [
    {
      id: 1,
      homeTeam: 'レイカーズ',
      awayTeam: 'ウォリアーズ',
      homeScore: 98,
      awayScore: 102,
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 2,
      homeTeam: 'セルティックス',
      awayTeam: 'ヒート',
      homeScore: null,
      awayScore: null,
      date: '2024-01-16',
      status: 'scheduled',
    },
    {
      id: 3,
      homeTeam: 'バックス',
      awayTeam: 'ネッツ',
      homeScore: 115,
      awayScore: 108,
      date: '2024-01-14',
      status: 'completed',
    },
  ]

  const upcomingGames = [
    {
      id: 1,
      homeTeam: 'セルティックス',
      awayTeam: 'ヒート',
      date: '2024-01-16',
      time: '19:00',
      venue: 'TDガーデン',
    },
    {
      id: 2,
      homeTeam: 'レイカーズ',
      awayTeam: 'サンズ',
      date: '2024-01-17',
      time: '20:30',
      venue: 'クリプト・コム・アリーナ',
    },
  ]

  const topPlayers = [
    {
      name: '田中太郎',
      team: 'レイカーズ',
      points: 28.5,
      rebounds: 8.2,
      assists: 6.8,
    },
    {
      name: '佐藤花子',
      team: 'ウォリアーズ',
      points: 24.3,
      rebounds: 7.1,
      assists: 8.5,
    },
    {
      name: '鈴木一郎',
      team: 'セルティックス',
      points: 22.8,
      rebounds: 9.4,
      assists: 5.2,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
          <p className="text-muted-foreground">
            リーグ運営の概要と最新情報を確認できます
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新しい試合
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-muted-foreground'
                  }
                >
                  {stat.change}
                </span>
                {' 前月比'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Games */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>最近の試合結果</CardTitle>
            <CardDescription>
              最新の試合結果とスコアを確認できます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="font-semibold">{game.homeTeam}</div>
                      <div className="text-sm text-muted-foreground">ホーム</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {game.homeScore !== null ? game.homeScore : '-'}
                      </div>
                    </div>
                    <div className="text-muted-foreground">vs</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {game.awayScore !== null ? game.awayScore : '-'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{game.awayTeam}</div>
                      <div className="text-sm text-muted-foreground">アウェイ</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        game.status === 'completed'
                          ? 'default'
                          : game.status === 'live'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {game.status === 'completed'
                        ? '完了'
                        : game.status === 'live'
                        ? 'ライブ'
                        : '予定'}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {game.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                すべての試合を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Games */}
        <Card>
          <CardHeader>
            <CardTitle>今後の試合</CardTitle>
            <CardDescription>
              予定されている試合の一覧
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingGames.map((game) => (
                <div key={game.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{game.homeTeam}</div>
                    <div className="text-sm text-muted-foreground">vs</div>
                    <div className="font-semibold">{game.awayTeam}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {game.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {game.time}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {game.venue}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                スケジュールを見る
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Players */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>トッププレイヤー</CardTitle>
            <CardDescription>
              今シーズンの個人成績ランキング
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.team}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">{player.points}</div>
                      <div className="text-muted-foreground">PTS</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{player.rebounds}</div>
                      <div className="text-muted-foreground">REB</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{player.assists}</div>
                      <div className="text-muted-foreground">AST</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                詳細ランキングを見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
