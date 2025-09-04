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
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  MapPin, 
  Users, 
  Target,
  Clock,
  Trophy
} from 'lucide-react'

interface Player {
  id: number
  name: string
  jerseyNumber: number
  position: string
  team: string
}

interface GameStats {
  playerId: number
  playerName: string
  jerseyNumber: number
  position: string
  team: string
  minutes: number
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  turnovers: number
  fouls: number
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  threePointersMade: number
  threePointersAttempted: number
  freeThrowsMade: number
  freeThrowsAttempted: number
}

export default function GameEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [game, setGame] = useState<any>(null)
  const [homePlayers, setHomePlayers] = useState<Player[]>([])
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([])
  const [homeStats, setHomeStats] = useState<GameStats[]>([])
  const [awayStats, setAwayStats] = useState<GameStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quarterScores, setQuarterScores] = useState({
    home: { q1: 0, q2: 0, q3: 0, q4: 0, ot: 0 },
    away: { q1: 0, q2: 0, q3: 0, q4: 0, ot: 0 }
  })

  // ダミーデータ
  const mockGame = {
    id: parseInt(params.id),
    homeTeam: 'レイカーズ',
    awayTeam: 'ウォリアーズ',
    date: '2024-01-15',
    time: '19:00',
    venue: 'クリプト・コム・アリーナ',
    court: 'Aコート',
    status: 'live',
    homeScore: 45,
    awayScore: 42,
    league: 'NBA',
    season: '2024',
  }

  const mockPlayers = [
    { id: 1, name: '田中太郎', jerseyNumber: 23, position: 'SF', team: 'レイカーズ' },
    { id: 2, name: '佐藤花子', jerseyNumber: 30, position: 'PG', team: 'ウォリアーズ' },
    { id: 3, name: '鈴木一郎', jerseyNumber: 7, position: 'PF', team: 'レイカーズ' },
    { id: 4, name: '山田次郎', jerseyNumber: 6, position: 'SG', team: 'ウォリアーズ' },
    { id: 5, name: '高橋三郎', jerseyNumber: 11, position: 'C', team: 'レイカーズ' },
    { id: 6, name: '伊藤四郎', jerseyNumber: 8, position: 'SG', team: 'ウォリアーズ' },
    { id: 7, name: '中村五郎', jerseyNumber: 15, position: 'PF', team: 'レイカーズ' },
    { id: 8, name: '小林六郎', jerseyNumber: 12, position: 'C', team: 'ウォリアーズ' },
  ]

  useEffect(() => {
    // ゲームデータの読み込み
    setGame(mockGame)
    
    // プレイヤーデータの読み込み
    const home = mockPlayers.filter(p => p.team === mockGame.homeTeam)
    const away = mockPlayers.filter(p => p.team === mockGame.awayTeam)
    setHomePlayers(home)
    setAwayPlayers(away)
    
    // 初期統計データの設定
    const initialHomeStats = home.map(player => ({
      playerId: player.id,
      playerName: player.name,
      jerseyNumber: player.jerseyNumber,
      position: player.position,
      team: player.team,
      minutes: 0,
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      threePointersMade: 0,
      threePointersAttempted: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
    }))
    
    const initialAwayStats = away.map(player => ({
      playerId: player.id,
      playerName: player.name,
      jerseyNumber: player.jerseyNumber,
      position: player.position,
      team: player.team,
      minutes: 0,
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      threePointersMade: 0,
      threePointersAttempted: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
    }))
    
    setHomeStats(initialHomeStats)
    setAwayStats(initialAwayStats)
    setIsLoading(false)
  }, [params.id])

  const updatePlayerStat = (playerId: number, stat: keyof GameStats, value: number, isHome: boolean) => {
    const updateStats = (stats: GameStats[]) => 
      stats.map(player => 
        player.playerId === playerId 
          ? { ...player, [stat]: value }
          : player
      )
    
    if (isHome) {
      setHomeStats(updateStats(homeStats))
    } else {
      setAwayStats(updateStats(awayStats))
    }
  }

  const calculateTotalStats = (stats: GameStats[]) => {
    return stats.reduce((total, player) => ({
      points: total.points + player.points,
      rebounds: total.rebounds + player.rebounds,
      assists: total.assists + player.assists,
      steals: total.steals + player.steals,
      blocks: total.blocks + player.blocks,
      turnovers: total.turnovers + player.turnovers,
      fouls: total.fouls + player.fouls,
      fieldGoalsMade: total.fieldGoalsMade + player.fieldGoalsMade,
      fieldGoalsAttempted: total.fieldGoalsAttempted + player.fieldGoalsAttempted,
      threePointersMade: total.threePointersMade + player.threePointersMade,
      threePointersAttempted: total.threePointersAttempted + player.threePointersAttempted,
      freeThrowsMade: total.freeThrowsMade + player.freeThrowsMade,
      freeThrowsAttempted: total.freeThrowsAttempted + player.freeThrowsAttempted,
    }), {
      points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
      turnovers: 0, fouls: 0, fieldGoalsMade: 0, fieldGoalsAttempted: 0,
      threePointersMade: 0, threePointersAttempted: 0, freeThrowsMade: 0, freeThrowsAttempted: 0
    })
  }

  const homeTotalStats = calculateTotalStats(homeStats)
  const awayTotalStats = calculateTotalStats(awayStats)

  const calculateTotalScore = (scores: { q1: number, q2: number, q3: number, q4: number, ot: number }) => {
    return scores.q1 + scores.q2 + scores.q3 + scores.q4 + scores.ot
  }

  const updateQuarterScore = (team: 'home' | 'away', quarter: 'q1' | 'q2' | 'q3' | 'q4' | 'ot', value: number) => {
    setQuarterScores(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [quarter]: value
      }
    }))
  }

  const homeTotalScore = calculateTotalScore(quarterScores.home)
  const awayTotalScore = calculateTotalScore(quarterScores.away)
  const winner = homeTotalScore > awayTotalScore ? game?.homeTeam : 
                 awayTotalScore > homeTotalScore ? game?.awayTeam : '引き分け'

  const handleSave = () => {
    // ここで実際の保存処理を行う
    console.log('Saving game:', game)
    console.log('Home stats:', homeStats)
    console.log('Away stats:', awayStats)
    router.push('/dashboard/games')
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
            <h1 className="text-3xl font-bold tracking-tight">試合編集</h1>
            <p className="text-muted-foreground">
              {game?.homeTeam} vs {game?.awayTeam}
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          保存
        </Button>
      </div>

      {/* Game Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>試合情報</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">日付</Label>
              <Input
                id="date"
                type="date"
                value={game?.date || ''}
                onChange={(e) => setGame({...game, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">時間</Label>
              <Input
                id="time"
                type="time"
                value={game?.time || ''}
                onChange={(e) => setGame({...game, time: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">会場</Label>
              <Input
                id="venue"
                value={game?.venue || ''}
                onChange={(e) => setGame({...game, venue: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="court">コート</Label>
              <Input
                id="court"
                value={game?.court || ''}
                onChange={(e) => setGame({...game, court: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>試合サマリー</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Quarter Scores */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">クォーター別得点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-center">{game?.homeTeam}</h4>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="text-center">
                      <Label className="text-xs">1Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.home.q1}
                        onChange={(e) => updateQuarterScore('home', 'q1', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">2Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.home.q2}
                        onChange={(e) => updateQuarterScore('home', 'q2', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">3Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.home.q3}
                        onChange={(e) => updateQuarterScore('home', 'q3', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">4Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.home.q4}
                        onChange={(e) => updateQuarterScore('home', 'q4', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">OT</Label>
                      <Input
                        type="number"
                        value={quarterScores.home.ot}
                        onChange={(e) => updateQuarterScore('home', 'ot', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs font-bold">合計</Label>
                      <div className="h-10 flex items-center justify-center bg-muted rounded-md font-bold">
                        {homeTotalScore}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-center">{game?.awayTeam}</h4>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="text-center">
                      <Label className="text-xs">1Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.away.q1}
                        onChange={(e) => updateQuarterScore('away', 'q1', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">2Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.away.q2}
                        onChange={(e) => updateQuarterScore('away', 'q2', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">3Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.away.q3}
                        onChange={(e) => updateQuarterScore('away', 'q3', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">4Q</Label>
                      <Input
                        type="number"
                        value={quarterScores.away.q4}
                        onChange={(e) => updateQuarterScore('away', 'q4', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs">OT</Label>
                      <Input
                        type="number"
                        value={quarterScores.away.ot}
                        onChange={(e) => updateQuarterScore('away', 'ot', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="text-center">
                      <Label className="text-xs font-bold">合計</Label>
                      <div className="h-10 flex items-center justify-center bg-muted rounded-md font-bold">
                        {awayTotalScore}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Winner Display */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">勝敗</h3>
              <div className="text-2xl font-bold text-primary">
                {winner}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {homeTotalScore} - {awayTotalScore}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Score Sheet */}
      <div className="space-y-4">
          {/* Home Team Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{game?.homeTeam} 統計</span>
                <Badge variant="outline">
                  合計: {homeTotalStats.points}点
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>選手</TableHead>
                      <TableHead>出場時間</TableHead>
                      <TableHead>得点</TableHead>
                      <TableHead>リバウンド</TableHead>
                      <TableHead>アシスト</TableHead>
                      <TableHead>スティール</TableHead>
                      <TableHead>ブロック</TableHead>
                      <TableHead>ターンオーバー</TableHead>
                      <TableHead>ファウル</TableHead>
                      <TableHead>FG</TableHead>
                      <TableHead>3P</TableHead>
                      <TableHead>FT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {homeStats.map((player) => (
                      <TableRow key={player.playerId}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">#{player.jerseyNumber} {player.playerName}</div>
                            <div className="text-sm text-muted-foreground">{player.position}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.minutes}
                            onChange={(e) => updatePlayerStat(player.playerId, 'minutes', parseInt(e.target.value) || 0, true)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.points}
                            onChange={(e) => updatePlayerStat(player.playerId, 'points', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.rebounds}
                            onChange={(e) => updatePlayerStat(player.playerId, 'rebounds', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.assists}
                            onChange={(e) => updatePlayerStat(player.playerId, 'assists', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.steals}
                            onChange={(e) => updatePlayerStat(player.playerId, 'steals', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.blocks}
                            onChange={(e) => updatePlayerStat(player.playerId, 'blocks', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.turnovers}
                            onChange={(e) => updatePlayerStat(player.playerId, 'turnovers', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.fouls}
                            onChange={(e) => updatePlayerStat(player.playerId, 'fouls', parseInt(e.target.value) || 0, true)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Input
                              type="number"
                              value={player.fieldGoalsMade}
                              onChange={(e) => updatePlayerStat(player.playerId, 'fieldGoalsMade', parseInt(e.target.value) || 0, true)}
                              className="w-12"
                              placeholder="M"
                            />
                            <span className="text-muted-foreground">/</span>
                            <Input
                              type="number"
                              value={player.fieldGoalsAttempted}
                              onChange={(e) => updatePlayerStat(player.playerId, 'fieldGoalsAttempted', parseInt(e.target.value) || 0, true)}
                              className="w-12"
                              placeholder="A"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Input
                              type="number"
                              value={player.threePointersMade}
                              onChange={(e) => updatePlayerStat(player.playerId, 'threePointersMade', parseInt(e.target.value) || 0, true)}
                              className="w-12"
                              placeholder="M"
                            />
                            <span className="text-muted-foreground">/</span>
                            <Input
                              type="number"
                              value={player.threePointersAttempted}
                              onChange={(e) => updatePlayerStat(player.playerId, 'threePointersAttempted', parseInt(e.target.value) || 0, true)}
                              className="w-12"
                              placeholder="A"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Input
                              type="number"
                              value={player.freeThrowsMade}
                              onChange={(e) => updatePlayerStat(player.playerId, 'freeThrowsMade', parseInt(e.target.value) || 0, true)}
                              className="w-12"
                              placeholder="M"
                            />
                            <span className="text-muted-foreground">/</span>
                            <Input
                              type="number"
                              value={player.freeThrowsAttempted}
                              onChange={(e) => updatePlayerStat(player.playerId, 'freeThrowsAttempted', parseInt(e.target.value) || 0, true)}
                              className="w-12"
                              placeholder="A"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Total Row */}
                    <TableRow className="bg-muted font-bold">
                      <TableCell className="font-bold">合計</TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeStats.reduce((sum, player) => sum + player.minutes, 0)}分
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold text-primary">
                          {homeTotalStats.points}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.rebounds}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.assists}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.steals}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.blocks}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.turnovers}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.fouls}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.fieldGoalsMade}/{homeTotalStats.fieldGoalsAttempted}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.threePointersMade}/{homeTotalStats.threePointersAttempted}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {homeTotalStats.freeThrowsMade}/{homeTotalStats.freeThrowsAttempted}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Away Team Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{game?.awayTeam} 統計</span>
                <Badge variant="outline">
                  合計: {awayTotalStats.points}点
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>選手</TableHead>
                      <TableHead>出場時間</TableHead>
                      <TableHead>得点</TableHead>
                      <TableHead>リバウンド</TableHead>
                      <TableHead>アシスト</TableHead>
                      <TableHead>スティール</TableHead>
                      <TableHead>ブロック</TableHead>
                      <TableHead>ターンオーバー</TableHead>
                      <TableHead>ファウル</TableHead>
                      <TableHead>FG</TableHead>
                      <TableHead>3P</TableHead>
                      <TableHead>FT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {awayStats.map((player) => (
                      <TableRow key={player.playerId}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">#{player.jerseyNumber} {player.playerName}</div>
                            <div className="text-sm text-muted-foreground">{player.position}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.minutes}
                            onChange={(e) => updatePlayerStat(player.playerId, 'minutes', parseInt(e.target.value) || 0, false)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.points}
                            onChange={(e) => updatePlayerStat(player.playerId, 'points', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.rebounds}
                            onChange={(e) => updatePlayerStat(player.playerId, 'rebounds', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.assists}
                            onChange={(e) => updatePlayerStat(player.playerId, 'assists', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.steals}
                            onChange={(e) => updatePlayerStat(player.playerId, 'steals', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.blocks}
                            onChange={(e) => updatePlayerStat(player.playerId, 'blocks', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.turnovers}
                            onChange={(e) => updatePlayerStat(player.playerId, 'turnovers', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={player.fouls}
                            onChange={(e) => updatePlayerStat(player.playerId, 'fouls', parseInt(e.target.value) || 0, false)}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Input
                              type="number"
                              value={player.fieldGoalsMade}
                              onChange={(e) => updatePlayerStat(player.playerId, 'fieldGoalsMade', parseInt(e.target.value) || 0, false)}
                              className="w-12"
                              placeholder="M"
                            />
                            <span className="text-muted-foreground">/</span>
                            <Input
                              type="number"
                              value={player.fieldGoalsAttempted}
                              onChange={(e) => updatePlayerStat(player.playerId, 'fieldGoalsAttempted', parseInt(e.target.value) || 0, false)}
                              className="w-12"
                              placeholder="A"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Input
                              type="number"
                              value={player.threePointersMade}
                              onChange={(e) => updatePlayerStat(player.playerId, 'threePointersMade', parseInt(e.target.value) || 0, false)}
                              className="w-12"
                              placeholder="M"
                            />
                            <span className="text-muted-foreground">/</span>
                            <Input
                              type="number"
                              value={player.threePointersAttempted}
                              onChange={(e) => updatePlayerStat(player.playerId, 'threePointersAttempted', parseInt(e.target.value) || 0, false)}
                              className="w-12"
                              placeholder="A"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Input
                              type="number"
                              value={player.freeThrowsMade}
                              onChange={(e) => updatePlayerStat(player.playerId, 'freeThrowsMade', parseInt(e.target.value) || 0, false)}
                              className="w-12"
                              placeholder="M"
                            />
                            <span className="text-muted-foreground">/</span>
                            <Input
                              type="number"
                              value={player.freeThrowsAttempted}
                              onChange={(e) => updatePlayerStat(player.playerId, 'freeThrowsAttempted', parseInt(e.target.value) || 0, false)}
                              className="w-12"
                              placeholder="A"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Total Row */}
                    <TableRow className="bg-muted font-bold">
                      <TableCell className="font-bold">合計</TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayStats.reduce((sum, player) => sum + player.minutes, 0)}分
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold text-primary">
                          {awayTotalStats.points}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.rebounds}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.assists}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.steals}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.blocks}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.turnovers}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.fouls}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.fieldGoalsMade}/{awayTotalStats.fieldGoalsAttempted}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.threePointersMade}/{awayTotalStats.threePointersAttempted}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold">
                          {awayTotalStats.freeThrowsMade}/{awayTotalStats.freeThrowsAttempted}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
