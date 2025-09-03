'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, MapPin, Users } from 'lucide-react'

export default function GamesPage() {
  const games = [
    {
      id: 1,
      homeTeam: 'レイカーズ',
      awayTeam: 'ウォリアーズ',
      date: '2024-01-15',
      time: '19:00',
      venue: 'クリプト・コム・アリーナ',
      status: 'completed',
      homeScore: 98,
      awayScore: 102,
    },
    {
      id: 2,
      homeTeam: 'セルティックス',
      awayTeam: 'ヒート',
      date: '2024-01-16',
      time: '20:30',
      venue: 'TDガーデン',
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
    },
    {
      id: 3,
      homeTeam: 'バックス',
      awayTeam: 'ネッツ',
      date: '2024-01-14',
      time: '19:30',
      venue: 'フィセル・フォーラム',
      status: 'completed',
      homeScore: 115,
      awayScore: 108,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">試合管理</h1>
          <p className="text-muted-foreground">
            試合の作成、編集、結果入力を行えます
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新しい試合
        </Button>
      </div>

      <div className="grid gap-6">
        {games.map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {game.homeTeam} vs {game.awayTeam}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {game.date} {game.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {game.venue}
                      </div>
                    </div>
                  </CardDescription>
                </div>
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
              </div>
            </CardHeader>
            <CardContent>
              {game.status === 'completed' ? (
                <div className="flex items-center justify-center space-x-8 py-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{game.homeScore}</div>
                    <div className="text-sm text-muted-foreground">
                      {game.homeTeam}
                    </div>
                  </div>
                  <div className="text-muted-foreground">vs</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{game.awayScore}</div>
                    <div className="text-sm text-muted-foreground">
                      {game.awayTeam}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  試合開始までお待ちください
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  詳細
                </Button>
                {game.status === 'scheduled' && (
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                )}
                {game.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    結果編集
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
