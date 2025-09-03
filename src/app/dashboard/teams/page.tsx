'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  Users, 
  Trophy, 
  MapPin, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Target
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [leagueFilter, setLeagueFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')

  const teams = [
    {
      id: 1,
      name: 'レイカーズ',
      logo: null,
      wins: 15,
      losses: 9,
      winPercentage: 62.5,
      homeTown: 'ロサンゼルス',
      region: 'カリフォルニア州',
      foundedYear: 1947,
      status: 'active',
      league: 'NBA',
      playerCount: 15,
      coach: 'ダービン・ハム',
    },
    {
      id: 2,
      name: 'ウォリアーズ',
      logo: null,
      wins: 18,
      losses: 6,
      winPercentage: 75.0,
      homeTown: 'サンフランシスコ',
      region: 'カリフォルニア州',
      foundedYear: 1946,
      status: 'active',
      league: 'NBA',
      playerCount: 14,
      coach: 'スティーブ・カー',
    },
    {
      id: 3,
      name: 'セルティックス',
      logo: null,
      wins: 16,
      losses: 8,
      winPercentage: 66.7,
      homeTown: 'ボストン',
      region: 'マサチューセッツ州',
      foundedYear: 1946,
      status: 'active',
      league: 'NBA',
      playerCount: 16,
      coach: 'ジョー・マズーラ',
    },
    {
      id: 4,
      name: 'ヒート',
      logo: null,
      wins: 12,
      losses: 12,
      winPercentage: 50.0,
      homeTown: 'マイアミ',
      region: 'フロリダ州',
      foundedYear: 1988,
      status: 'active',
      league: 'NBA',
      playerCount: 15,
      coach: 'エリック・スポルストラ',
    },
    {
      id: 5,
      name: 'ネッツ',
      logo: null,
      wins: 8,
      losses: 16,
      winPercentage: 33.3,
      homeTown: 'ブルックリン',
      region: 'ニューヨーク州',
      foundedYear: 1976,
      status: 'inactive',
      league: 'NBA',
      playerCount: 13,
      coach: 'ジャック・ヴォーン',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">活動中</Badge>
      case 'inactive':
        return <Badge variant="secondary">非活動</Badge>
      case 'pending':
        return <Badge variant="outline">承認待ち</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getWinPercentageColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600'
    if (percentage >= 50) return 'text-blue-600'
    return 'text-red-600'
  }

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.homeTown.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.coach.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter
    const matchesLeague = leagueFilter === 'all' || team.league === leagueFilter
    const matchesRegion = regionFilter === 'all' || team.region === regionFilter

    return matchesSearch && matchesStatus && matchesLeague && matchesRegion
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">チーム管理</h1>
          <p className="text-muted-foreground">
            チーム情報の管理と選手登録を行えます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新しいチーム
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">フィルタ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="チーム名、地域、コーチで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="active">活動中</SelectItem>
                <SelectItem value="inactive">非活動</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
              </SelectContent>
            </Select>
            <Select value={leagueFilter} onValueChange={setLeagueFilter}>
              <SelectTrigger>
                <SelectValue placeholder="リーグ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのリーグ</SelectItem>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="Bリーグ">Bリーグ</SelectItem>
                <SelectItem value="Wリーグ">Wリーグ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="地域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての地域</SelectItem>
                <SelectItem value="カリフォルニア州">カリフォルニア州</SelectItem>
                <SelectItem value="マサチューセッツ州">マサチューセッツ州</SelectItem>
                <SelectItem value="フロリダ州">フロリダ州</SelectItem>
                <SelectItem value="ニューヨーク州">ニューヨーク州</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="justify-start">
              <Filter className="mr-2 h-4 w-4" />
              詳細フィルタ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>チーム一覧</CardTitle>
              <CardDescription>
                {filteredTeams.length}件のチームが見つかりました
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>チーム</TableHead>
                  <TableHead>戦績</TableHead>
                  <TableHead>地域</TableHead>
                  <TableHead>リーグ</TableHead>
                  <TableHead>選手数</TableHead>
                  <TableHead>コーチ</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={team.logo} alt={team.name} />
                          <AvatarFallback>
                            {team.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            創設: {team.foundedYear}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <span className="text-green-600 font-medium">{team.wins}</span>
                            <span className="text-muted-foreground">勝</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-red-600 font-medium">{team.losses}</span>
                            <span className="text-muted-foreground">敗</span>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${getWinPercentageColor(team.winPercentage)}`}>
                          {team.winPercentage}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{team.homeTown}</div>
                          <div className="text-xs text-muted-foreground">
                            {team.region}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{team.league}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{team.playerCount}人</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{team.coach}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(team.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            詳細
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            選手一覧
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trophy className="mr-2 h-4 w-4" />
                            戦績
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            複製
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
