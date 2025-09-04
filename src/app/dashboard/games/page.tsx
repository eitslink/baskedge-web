'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Edit,
  MoreHorizontal,
  X
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [leagueFilter, setLeagueFilter] = useState('all')
  const [seasonFilter, setSeasonFilter] = useState('all')
  const [editingGame, setEditingGame] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const games = [
    {
      id: 1,
      homeTeam: 'レイカーズ',
      awayTeam: 'ウォリアーズ',
      date: '2024-01-15',
      time: '19:00',
      venue: 'クリプト・コム・アリーナ',
      court: 'Aコート',
      status: 'completed',
      homeScore: 98,
      awayScore: 102,
      league: 'NBA',
      season: '2024',
    },
    {
      id: 2,
      homeTeam: 'セルティックス',
      awayTeam: 'ヒート',
      date: '2024-01-16',
      time: '20:30',
      venue: 'TDガーデン',
      court: 'メインコート',
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      league: 'NBA',
      season: '2024',
    },
    {
      id: 3,
      homeTeam: 'バックス',
      awayTeam: 'ネッツ',
      date: '2024-01-14',
      time: '19:30',
      venue: 'フィセル・フォーラム',
      court: 'Bコート',
      status: 'completed',
      homeScore: 115,
      awayScore: 108,
      league: 'NBA',
      season: '2024',
    },
    {
      id: 4,
      homeTeam: 'レイカーズ',
      awayTeam: 'セルティックス',
      date: '2024-01-18',
      time: '19:00',
      venue: 'クリプト・コム・アリーナ',
      court: 'Aコート',
      status: 'live',
      homeScore: 45,
      awayScore: 42,
      league: 'NBA',
      season: '2024',
    },
    {
      id: 5,
      homeTeam: 'ウォリアーズ',
      awayTeam: 'バックス',
      date: '2024-01-19',
      time: '20:00',
      venue: 'チェイス・センター',
      court: 'メインコート',
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      league: 'NBA',
      season: '2024',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">完了</Badge>
      case 'live':
        return <Badge variant="destructive">ライブ</Badge>
      case 'scheduled':
        return <Badge variant="secondary">予定</Badge>
      case 'cancelled':
        return <Badge variant="outline">中止</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getScoreDisplay = (game: any) => {
    if (game.status === 'completed' || game.status === 'live') {
      const isHomeWinner = game.homeScore > game.awayScore
      return (
        <div className="flex items-center space-x-2">
          <span className={isHomeWinner ? 'font-bold text-primary' : ''}>
            {game.homeScore}
          </span>
          <span className="text-muted-foreground">-</span>
          <span className={!isHomeWinner ? 'font-bold text-primary' : ''}>
            {game.awayScore}
          </span>
        </div>
      )
    }
    return <span className="text-muted-foreground">-</span>
  }

  const handleEditGame = (game: any) => {
    setEditingGame(game)
    setIsEditDialogOpen(true)
  }

  const handleSaveGame = () => {
    // ここで実際の保存処理を行う
    console.log('Saving game:', editingGame)
    setIsEditDialogOpen(false)
    setEditingGame(null)
  }

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false)
    setEditingGame(null)
  }

  const filteredGames = games.filter(game => {
    const matchesSearch = game.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || game.status === statusFilter
    const matchesLeague = leagueFilter === 'all' || game.league === leagueFilter
    const matchesSeason = seasonFilter === 'all' || game.season === seasonFilter

    return matchesSearch && matchesStatus && matchesLeague && matchesSeason
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">試合管理</h1>
          <p className="text-muted-foreground">
            試合の作成、編集、結果入力を行えます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSVインポート
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新しい試合
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
                placeholder="チーム名、会場で検索..."
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
                <SelectItem value="scheduled">予定</SelectItem>
                <SelectItem value="live">ライブ</SelectItem>
                <SelectItem value="completed">完了</SelectItem>
                <SelectItem value="cancelled">中止</SelectItem>
              </SelectContent>
            </Select>
            <Select value={leagueFilter} onValueChange={setLeagueFilter}>
              <SelectTrigger>
                <SelectValue placeholder="大会" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての大会</SelectItem>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="Bリーグ">Bリーグ</SelectItem>
                <SelectItem value="Wリーグ">Wリーグ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={seasonFilter} onValueChange={setSeasonFilter}>
              <SelectTrigger>
                <SelectValue placeholder="シーズン" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのシーズン</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="justify-start">
              <Filter className="mr-2 h-4 w-4" />
              詳細フィルタ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Games Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>試合一覧</CardTitle>
              <CardDescription>
                {filteredGames.length}件の試合が見つかりました
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ゲーム名</TableHead>
                  <TableHead>日付/時間</TableHead>
                  <TableHead>スコア</TableHead>
                  <TableHead>大会/シーズン</TableHead>
                  <TableHead>会場/コート</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">
                          {game.homeTeam} vs {game.awayTeam}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{game.date}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {game.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getScoreDisplay(game)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{game.league}</div>
                        <div className="text-sm text-muted-foreground">
                          {game.season}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{game.venue}</div>
                          <div className="text-xs text-muted-foreground">
                            {game.court}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(game.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditGame(game)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
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

      {/* Edit Game Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>試合編集</DialogTitle>
            <DialogDescription>
              試合の詳細情報を編集できます
            </DialogDescription>
          </DialogHeader>
          {editingGame && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeTeam">ホームチーム</Label>
                  <Input
                    id="homeTeam"
                    value={editingGame.homeTeam}
                    onChange={(e) => setEditingGame({...editingGame, homeTeam: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="awayTeam">アウェイチーム</Label>
                  <Input
                    id="awayTeam"
                    value={editingGame.awayTeam}
                    onChange={(e) => setEditingGame({...editingGame, awayTeam: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">日付</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingGame.date}
                    onChange={(e) => setEditingGame({...editingGame, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">時間</Label>
                  <Input
                    id="time"
                    type="time"
                    value={editingGame.time}
                    onChange={(e) => setEditingGame({...editingGame, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue">会場</Label>
                  <Input
                    id="venue"
                    value={editingGame.venue}
                    onChange={(e) => setEditingGame({...editingGame, venue: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="court">コート</Label>
                  <Input
                    id="court"
                    value={editingGame.court}
                    onChange={(e) => setEditingGame({...editingGame, court: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select
                    value={editingGame.status}
                    onValueChange={(value) => setEditingGame({...editingGame, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">予定</SelectItem>
                      <SelectItem value="live">ライブ</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="cancelled">中止</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="league">大会</Label>
                  <Select
                    value={editingGame.league}
                    onValueChange={(value) => setEditingGame({...editingGame, league: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NBA">NBA</SelectItem>
                      <SelectItem value="Bリーグ">Bリーグ</SelectItem>
                      <SelectItem value="Wリーグ">Wリーグ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">シーズン</Label>
                  <Input
                    id="season"
                    value={editingGame.season}
                    onChange={(e) => setEditingGame({...editingGame, season: e.target.value})}
                  />
                </div>
              </div>

              {(editingGame.status === 'completed' || editingGame.status === 'live') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeScore">ホームスコア</Label>
                    <Input
                      id="homeScore"
                      type="number"
                      value={editingGame.homeScore || ''}
                      onChange={(e) => setEditingGame({...editingGame, homeScore: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="awayScore">アウェイスコア</Label>
                    <Input
                      id="awayScore"
                      type="number"
                      value={editingGame.awayScore || ''}
                      onChange={(e) => setEditingGame({...editingGame, awayScore: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              キャンセル
            </Button>
            <Button onClick={handleSaveGame}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
