'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Users, Trophy, MapPin } from 'lucide-react'

export default function TeamsPage() {
  const teams = [
    {
      id: 1,
      name: 'レイカーズ',
      logo: null,
      wins: 15,
      losses: 9,
      winPercentage: 62.5,
      homeTown: 'ロサンゼルス',
      foundedYear: 1947,
      status: 'active',
    },
    {
      id: 2,
      name: 'ウォリアーズ',
      logo: null,
      wins: 18,
      losses: 6,
      winPercentage: 75.0,
      homeTown: 'サンフランシスコ',
      foundedYear: 1946,
      status: 'active',
    },
    {
      id: 3,
      name: 'セルティックス',
      logo: null,
      wins: 16,
      losses: 8,
      winPercentage: 66.7,
      homeTown: 'ボストン',
      foundedYear: 1946,
      status: 'active',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">チーム管理</h1>
          <p className="text-muted-foreground">
            チーム情報の管理と選手登録を行えます
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新しいチーム
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={team.logo} alt={team.name} />
                  <AvatarFallback>
                    {team.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {team.homeTown}
                  </CardDescription>
                </div>
                <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                  {team.status === 'active' ? '活動中' : '非活動'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {team.wins}
                    </div>
                    <div className="text-xs text-muted-foreground">勝利</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {team.losses}
                    </div>
                    <div className="text-xs text-muted-foreground">敗北</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {team.winPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">勝率</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">創設年</span>
                    <span>{team.foundedYear}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="mr-1 h-3 w-3" />
                    選手一覧
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trophy className="mr-1 h-3 w-3" />
                    戦績
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
