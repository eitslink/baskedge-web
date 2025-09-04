'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Save, 
  Users, 
  Trophy, 
  MapPin, 
  Calendar,
  Target,
  Plus,
  Trash2
} from 'lucide-react'

interface Player {
  id: number
  name: string
  jerseyNumber: number
  position: string
  age: number
  height: string
  weight: string
  status: string
  season: string
}

interface GameHistory {
  id: number
  date: string
  opponent: string
  homeAway: 'home' | 'away'
  result: 'win' | 'loss'
  score: string
  season: string
}

export default function TeamEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [team, setTeam] = useState<any>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])
  const [selectedSeason, setSelectedSeason] = useState('2024')
  const [isLoading, setIsLoading] = useState(true)

  // ダミーデータ
  const mockTeam = {
    id: parseInt(params.id),
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
    description: 'ロサンゼルスを拠点とするプロバスケットボールチーム。1947年創設。',
    website: 'https://www.nba.com/lakers',
    email: 'info@lakers.com',
    phone: '+1-213-742-7100',
    address: '1111 S Figueroa St, Los Angeles, CA 90015',
  }

  const mockPlayers = [
    { id: 1, name: '田中太郎', jerseyNumber: 23, position: 'SF', age: 28, height: '203cm', weight: '98kg', status: 'active', season: '2024' },
    { id: 2, name: '佐藤花子', jerseyNumber: 30, position: 'PG', age: 26, height: '191cm', weight: '86kg', status: 'active', season: '2024' },
    { id: 3, name: '鈴木一郎', jerseyNumber: 7, position: 'PF', age: 30, height: '208cm', weight: '112kg', status: 'active', season: '2024' },
    { id: 4, name: '山田次郎', jerseyNumber: 6, position: 'SG', age: 24, height: '196cm', weight: '92kg', status: 'active', season: '2024' },
    { id: 5, name: '高橋三郎', jerseyNumber: 11, position: 'C', age: 32, height: '213cm', weight: '125kg', status: 'injured', season: '2024' },
    { id: 6, name: '伊藤四郎', jerseyNumber: 8, position: 'SG', age: 25, height: '194cm', weight: '90kg', status: 'active', season: '2023' },
    { id: 7, name: '中村五郎', jerseyNumber: 15, position: 'PF', age: 29, height: '206cm', weight: '110kg', status: 'active', season: '2023' },
  ]

  const mockGameHistory = [
    { id: 1, date: '2024-01-15', opponent: 'ウォリアーズ', homeAway: 'home', result: 'win', score: '98-102', season: '2024' },
    { id: 2, date: '2024-01-12', opponent: 'セルティックス', homeAway: 'away', result: 'loss', score: '115-108', season: '2024' },
    { id: 3, date: '2024-01-10', opponent: 'ヒート', homeAway: 'home', result: 'win', score: '112-105', season: '2024' },
    { id: 4, date: '2024-01-08', opponent: 'ネッツ', homeAway: 'away', result: 'win', score: '95-88', season: '2024' },
    { id: 5, date: '2024-01-05', opponent: 'バックス', homeAway: 'home', result: 'loss', score: '120-115', season: '2024' },
    { id: 6, date: '2023-12-28', opponent: 'ウォリアーズ', homeAway: 'away', result: 'win', score: '105-98', season: '2023' },
    { id: 7, date: '2023-12-25', opponent: 'セルティックス', homeAway: 'home', result: 'loss', score: '110-108', season: '2023' },
  ]

  useEffect(() => {
    setTeam(mockTeam)
    setPlayers(mockPlayers)
    setGameHistory(mockGameHistory)
    setIsLoading(false)
  }, [params.id])

  const filteredPlayers = players.filter(player => player.season === selectedSeason)
  const filteredGameHistory = gameHistory.filter(game => game.season === selectedSeason)

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

  const handleSave = () => {
    // ここで実際の保存処理を行う
    console.log('Saving team:', team)
    console.log('Players:', players)
    router.push('/dashboard/teams')
  }

  if (isLoading) {
    return <div className="p-6">読み込み中...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">チーム編集</h1>
            <p className="text-muted-foreground">
              {team?.name} の情報を編集
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          保存
        </Button>
      </div>

      {/* Team Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>基本情報</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={team?.logo} alt={team?.name} />
                  <AvatarFallback className="text-2xl">
                    {team?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{team?.name}</h3>
                  <p className="text-muted-foreground">{team?.league}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">チーム名</Label>
                  <Input
                    id="name"
                    value={team?.name || ''}
                    onChange={(e) => setTeam({...team, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">創設年</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    value={team?.foundedYear || ''}
                    onChange={(e) => setTeam({...team, foundedYear: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coach">コーチ</Label>
                <Input
                  id="coach"
                  value={team?.coach || ''}
                  onChange={(e) => setTeam({...team, coach: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select
                  value={team?.status}
                  onValueChange={(value) => setTeam({...team, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">活動中</SelectItem>
                    <SelectItem value="inactive">非活動</SelectItem>
                    <SelectItem value="pending">承認待ち</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="league">リーグ</Label>
                <Select
                  value={team?.league}
                  onValueChange={(value) => setTeam({...team, league: value})}
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>所在地情報</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homeTown">本拠地</Label>
                <Input
                  id="homeTown"
                  value={team?.homeTown || ''}
                  onChange={(e) => setTeam({...team, homeTown: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">地域</Label>
                <Input
                  id="region"
                  value={team?.region || ''}
                  onChange={(e) => setTeam({...team, region: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  value={team?.address || ''}
                  onChange={(e) => setTeam({...team, address: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">ウェブサイト</Label>
                <Input
                  id="website"
                  value={team?.website || ''}
                  onChange={(e) => setTeam({...team, website: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={team?.email || ''}
                  onChange={(e) => setTeam({...team, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  value={team?.phone || ''}
                  onChange={(e) => setTeam({...team, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>戦績情報</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Season Selector */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="season">シーズン</Label>
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Win/Loss Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="wins">勝利数</Label>
                <Input
                  id="wins"
                  type="number"
                  value={team?.wins || ''}
                  onChange={(e) => setTeam({...team, wins: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="losses">敗北数</Label>
                <Input
                  id="losses"
                  type="number"
                  value={team?.losses || ''}
                  onChange={(e) => setTeam({...team, losses: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label>勝率</Label>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md font-bold">
                  {team?.wins && team?.losses ? 
                    ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%' : 
                    '0%'
                  }
                </div>
              </div>
            </div>

            {/* Game History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">過去の対戦カード ({selectedSeason}シーズン)</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>日付</TableHead>
                      <TableHead>対戦相手</TableHead>
                      <TableHead>会場</TableHead>
                      <TableHead>結果</TableHead>
                      <TableHead>スコア</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGameHistory.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{game.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">{game.opponent}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={game.homeAway === 'home' ? 'default' : 'secondary'}>
                            {game.homeAway === 'home' ? 'ホーム' : 'アウェイ'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={game.result === 'win' ? 'default' : 'destructive'}>
                            {game.result === 'win' ? '勝利' : '敗北'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{game.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Description */}
      <Card>
        <CardHeader>
          <CardTitle>チーム説明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] p-3 border rounded-md resize-none"
              value={team?.description || ''}
              onChange={(e) => setTeam({...team, description: e.target.value})}
              placeholder="チームの説明を入力してください..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Players */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>選手一覧</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Label htmlFor="playerSeason">シーズン</Label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              選手追加
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              {selectedSeason}シーズンの選手: {filteredPlayers.length}人
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>選手</TableHead>
                    <TableHead>背番号</TableHead>
                    <TableHead>ポジション</TableHead>
                    <TableHead>年齢</TableHead>
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
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {player.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {player.season}シーズン
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">#{player.jerseyNumber}</Badge>
                      </TableCell>
                      <TableCell>
                        {getPositionBadge(player.position)}
                      </TableCell>
                      <TableCell>{player.age}歳</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{player.height}</div>
                          <div className="text-muted-foreground">{player.weight}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(player.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
