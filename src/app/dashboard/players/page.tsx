'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Edit,
  MoreHorizontal,
  User,
  Target,
  TrendingUp,
  Users,
  Calendar,
  MapPin
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function PlayersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [teamFilter, setTeamFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [leagueFilter, setLeagueFilter] = useState('all')

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
      steals: 1.2,
      blocks: 0.8,
      fieldGoalPercentage: 52.3,
      threePointPercentage: 38.7,
      freeThrowPercentage: 85.2,
      photo: null,
      status: 'active',
      league: 'NBA',
      age: 28,
      height: '203cm',
      weight: '98kg',
      experience: 8,
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
      steals: 2.1,
      blocks: 0.3,
      fieldGoalPercentage: 48.9,
      threePointPercentage: 42.1,
      freeThrowPercentage: 91.5,
      photo: null,
      status: 'active',
      league: 'NBA',
      age: 26,
      height: '191cm',
      weight: '86kg',
      experience: 6,
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
      steals: 0.9,
      blocks: 1.8,
      fieldGoalPercentage: 55.7,
      threePointPercentage: 35.2,
      freeThrowPercentage: 78.9,
      photo: null,
      status: 'active',
      league: 'NBA',
      age: 30,
      height: '208cm',
      weight: '112kg',
      experience: 10,
    },
    {
      id: 4,
      name: '山田次郎',
      team: 'ヒート',
      jerseyNumber: 6,
      position: 'SG',
      points: 19.7,
      rebounds: 4.8,
      assists: 3.9,
      steals: 1.5,
      blocks: 0.4,
      fieldGoalPercentage: 46.8,
      threePointPercentage: 40.3,
      freeThrowPercentage: 88.1,
      photo: null,
      status: 'active',
      league: 'NBA',
      age: 24,
      height: '196cm',
      weight: '92kg',
      experience: 4,
    },
    {
      id: 5,
      name: '高橋三郎',
      team: 'ネッツ',
      jerseyNumber: 11,
      position: 'C',
      points: 16.2,
      rebounds: 12.1,
      assists: 2.3,
      steals: 0.7,
      blocks: 2.4,
      fieldGoalPercentage: 58.9,
      threePointPercentage: 28.5,
      freeThrowPercentage: 72.3,
      photo: null,
      status: 'injured',
      league: 'NBA',
      age: 32,
      height: '213cm',
      weight: '125kg',
      experience: 12,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">活動中</Badge>
      case 'inactive':
        return <Badge variant="secondary">非活動</Badge>
      case 'injured':
        return <Badge variant="destructive">怪我中</Badge>
      case 'suspended':
        return <Badge variant="outline">出場停止</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPositionBadge = (position: string) => {
    const colors = {
      'PG': 'bg-blue-100 text-blue-800',
      'SG': 'bg-green-100 text-green-800',
      'SF': 'bg-purple-100 text-purple-800',
      'PF': 'bg-orange-100 text-orange-800',
      'C': 'bg-red-100 text-red-800',
    }
    return (
      <Badge className={colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {position}
      </Badge>
    )
  }

  const handleEditPlayer = (player: any) => {
    router.push(`/dashboard/players/${player.id}/edit`)
  }

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = teamFilter === 'all' || player.team === teamFilter
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter
    const matchesStatus = statusFilter === 'all' || player.status === statusFilter
    const matchesLeague = leagueFilter === 'all' || player.league === leagueFilter

    return matchesSearch && matchesTeam && matchesPosition && matchesStatus && matchesLeague
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">選手管理</h1>
          <p className="text-muted-foreground">
            選手情報の管理と個人成績を確認できます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新しい選手
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
                placeholder="選手名、チームで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="チーム" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのチーム</SelectItem>
                <SelectItem value="レイカーズ">レイカーズ</SelectItem>
                <SelectItem value="ウォリアーズ">ウォリアーズ</SelectItem>
                <SelectItem value="セルティックス">セルティックス</SelectItem>
                <SelectItem value="ヒート">ヒート</SelectItem>
                <SelectItem value="ネッツ">ネッツ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ポジション" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのポジション</SelectItem>
                <SelectItem value="PG">PG</SelectItem>
                <SelectItem value="SG">SG</SelectItem>
                <SelectItem value="SF">SF</SelectItem>
                <SelectItem value="PF">PF</SelectItem>
                <SelectItem value="C">C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="active">活動中</SelectItem>
                <SelectItem value="injured">怪我中</SelectItem>
                <SelectItem value="inactive">非活動</SelectItem>
                <SelectItem value="suspended">出場停止</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="justify-start">
              <Filter className="mr-2 h-4 w-4" />
              詳細フィルタ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Players Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>選手一覧</CardTitle>
              <CardDescription>
                {filteredPlayers.length}件の選手が見つかりました
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>選手</TableHead>
                  <TableHead>チーム</TableHead>
                  <TableHead>ポジション</TableHead>
                  <TableHead>基本統計</TableHead>
                  <TableHead>シュート成功率</TableHead>
                  <TableHead>身体情報</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={player.photo || undefined} alt={player.name} />
                          <AvatarFallback>
                            {player.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            #{player.jerseyNumber} • {player.age}歳
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{player.team}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getPositionBadge(player.position)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Target className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{player.points}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{player.rebounds}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{player.assists}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          STL: {player.steals} • BLK: {player.blocks}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>FG: {player.fieldGoalPercentage}%</div>
                        <div>3P: {player.threePointPercentage}%</div>
                        <div>FT: {player.freeThrowPercentage}%</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>{player.height}</div>
                        <div>{player.weight}</div>
                        <div className="text-xs text-muted-foreground">
                          {player.experience}年目
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(player.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditPlayer(player)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            出場履歴
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Target className="mr-2 h-4 w-4" />
                            成績詳細
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
