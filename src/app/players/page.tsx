'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Filter, User, Target, TrendingUp } from 'lucide-react'

export default function PlayersPage() {
  const players = [
    {
      id: 1,
      name: '田中太郎',
      team: 'レイカーズ',
      jerseyNumber: 23,
      position: 'SF',
      points: 28.5,
      rebounds: 8.2,
      assists: 6.8,
      photo: null,
      status: 'active',
    },
    {
      id: 2,
      name: '佐藤花子',
      team: 'ウォリアーズ',
      jerseyNumber: 30,
      position: 'PG',
      points: 24.3,
      rebounds: 7.1,
      assists: 8.5,
      photo: null,
      status: 'active',
    },
    {
      id: 3,
      name: '鈴木一郎',
      team: 'セルティックス',
      jerseyNumber: 7,
      position: 'PF',
      points: 22.8,
      rebounds: 9.4,
      assists: 5.2,
      photo: null,
      status: 'active',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">選手管理</h1>
          <p className="text-muted-foreground">
            選手情報の管理と個人成績を確認できます
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新しい選手
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="選手名で検索..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="チームで絞り込み" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのチーム</SelectItem>
            <SelectItem value="lakers">レイカーズ</SelectItem>
            <SelectItem value="warriors">ウォリアーズ</SelectItem>
            <SelectItem value="celtics">セルティックス</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="ポジション" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="PG">PG</SelectItem>
            <SelectItem value="SG">SG</SelectItem>
            <SelectItem value="SF">SF</SelectItem>
            <SelectItem value="PF">PF</SelectItem>
            <SelectItem value="C">C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {players.map((player) => (
          <Card key={player.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={player.photo} alt={player.name} />
                  <AvatarFallback className="text-lg">
                    {player.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-semibold">{player.name}</h3>
                    <Badge variant="outline">
                      #{player.jerseyNumber}
                    </Badge>
                    <Badge variant="secondary">
                      {player.position}
                    </Badge>
                    <Badge variant={player.status === 'active' ? 'default' : 'secondary'}>
                      {player.status === 'active' ? '活動中' : '非活動'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{player.team}</p>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">得点</span>
                      </div>
                      <div className="text-2xl font-bold">{player.points}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">リバウンド</span>
                      </div>
                      <div className="text-2xl font-bold">{player.rebounds}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <User className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">アシスト</span>
                      </div>
                      <div className="text-2xl font-bold">{player.assists}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
