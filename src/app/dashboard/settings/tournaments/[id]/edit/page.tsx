'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Trophy,
  Users,
  Palette,
  Save,
  Eye,
  Calendar,
  Settings,
  Plus,
  Edit,
  Trash2,
  Link
} from 'lucide-react'

interface Tournament {
  id: number
  name: string
  type: 'league' | 'tournament'
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  description: string
  rules: string
  maxTeams: number
  currentTeams: number
  isPublic: boolean
  createdAt: string
}

interface LeagueSettings {
  regularSeason: {
    enabled: boolean
    gamesPerTeam: number
    playoffTeams: number
  }
  playoffs: {
    enabled: boolean
    format: 'single-elimination' | 'double-elimination' | 'best-of-series'
    seriesLength: number
  }
  standings: {
    sortBy: 'wins' | 'winPercentage' | 'points'
    tiebreaker: 'headToHead' | 'pointDifferential' | 'pointsFor'
  }
}

interface PublicPageSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  logo: string | null
  favicon: string | null
  customCSS: string
  headerText: string
  footerText: string
  permalink: string
  seasonPermalinks: {
    [season: string]: string
  }
}

interface Season {
  id: string
  name: string
  displayName: string
  startDate: string
  endDate: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  description: string
  permalink: string
  isPublic: boolean
  createdAt: string
}

export default function TournamentEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basic')
  
  // Mock data
  const [tournament, setTournament] = useState<Tournament>({
    id: parseInt(params.id),
    name: '2024春季リーグ戦',
    type: 'league',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    description: '2024年春季のリーグ戦です。レギュラーシーズンとプレーオフを実施します。',
    rules: 'FIBAルールに準拠。各チーム20試合のレギュラーシーズン後、上位8チームがプレーオフに進出。',
    maxTeams: 16,
    currentTeams: 12,
    isPublic: true,
    createdAt: '2024-02-01'
  })

  const [leagueSettings, setLeagueSettings] = useState<LeagueSettings>({
    regularSeason: {
      enabled: true,
      gamesPerTeam: 20,
      playoffTeams: 8
    },
    playoffs: {
      enabled: true,
      format: 'single-elimination',
      seriesLength: 1
    },
    standings: {
      sortBy: 'winPercentage',
      tiebreaker: 'headToHead'
    }
  })

  const [publicPageSettings, setPublicPageSettings] = useState<PublicPageSettings>({
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#f59e0b',
    fontFamily: 'Inter',
    logo: null,
    favicon: null,
    customCSS: '',
    headerText: '2024春季リーグ戦 - BaskEdge',
    footerText: '© 2024 BaskEdge. All rights reserved.',
    permalink: 'xxxleague',
    seasonPermalinks: {
      '2024春': 'xxxleague/2024-spring/',
      '2024夏': 'xxxleague/2024-summer/',
      '2024秋': 'xxxleague/2024-autumn/',
      '2024冬': 'xxxleague/2024-winter/',
      '2025春': 'xxxleague/2025-spring/',
      '2025夏': 'xxxleague/2025-summer/'
    }
  })

  const [availableSeasons] = useState([
    '2024春', '2024夏', '2024秋', '2024冬',
    '2025春', '2025夏', '2025秋', '2025冬'
  ])

  const [seasons, setSeasons] = useState<Season[]>([
    {
      id: '1',
      name: '2024春',
      displayName: '2024春季',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'active',
      description: '2024年春季シーズンです。',
      permalink: '2024-spring',
      isPublic: true,
      createdAt: '2024-02-01'
    },
    {
      id: '2',
      name: '2024夏',
      displayName: '2024夏季',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'draft',
      description: '2024年夏季シーズンです。',
      permalink: '2024-summer',
      isPublic: false,
      createdAt: '2024-05-01'
    },
    {
      id: '3',
      name: '2025春',
      displayName: '2025春季',
      startDate: '2025-03-01',
      endDate: '2025-05-31',
      status: 'draft',
      description: '2025年春季シーズンです。',
      permalink: '2025-spring',
      isPublic: false,
      createdAt: '2024-12-01'
    }
  ])

  const [newSeason, setNewSeason] = useState<Partial<Season>>({
    name: '',
    displayName: '',
    startDate: '',
    endDate: '',
    status: 'draft',
    description: '',
    permalink: '',
    isPublic: false
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">活動中</Badge>
      case 'draft':
        return <Badge variant="outline">下書き</Badge>
      case 'completed':
        return <Badge variant="secondary">完了</Badge>
      case 'cancelled':
        return <Badge variant="destructive">キャンセル</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'league':
        return <Badge className="bg-blue-100 text-blue-800">リーグ戦</Badge>
      case 'tournament':
        return <Badge className="bg-green-100 text-green-800">トーナメント</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const handleSave = () => {
    console.log('Saving tournament settings...')
    // Save logic here
    router.push('/dashboard/settings')
  }

  const handleCancel = () => {
    router.push('/dashboard/settings')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
              <Trophy className="h-8 w-8" />
              <span>{tournament.name}</span>
            </h1>
            <p className="text-muted-foreground">
              大会の詳細設定と管理を行えます
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getTypeBadge(tournament.type)}
          {getStatusBadge(tournament.status)}
          <Badge variant={tournament.isPublic ? "default" : "secondary"}>
            {tournament.isPublic ? "公開" : "非公開"}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="basic" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>基本情報</span>
          </TabsTrigger>
          <TabsTrigger value="seasons" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>シーズン設定</span>
          </TabsTrigger>
          <TabsTrigger value="league-settings" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>リーグ設定</span>
          </TabsTrigger>
          <TabsTrigger value="public-page" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>公開ページ</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>プレビュー</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>基本情報</span>
              </CardTitle>
              <CardDescription>
                大会の基本情報を設定します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">大会名</Label>
                  <Input
                    id="name"
                    value={tournament.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTournament({
                      ...tournament,
                      name: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">大会タイプ</Label>
                  <Select 
                    value={tournament.type} 
                    onValueChange={(value: 'league' | 'tournament') => setTournament({
                      ...tournament,
                      type: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="league">リーグ戦</SelectItem>
                      <SelectItem value="tournament">トーナメント</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">開始日</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={tournament.startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTournament({
                      ...tournament,
                      startDate: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">終了日</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={tournament.endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTournament({
                      ...tournament,
                      endDate: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">大会説明</Label>
                <textarea
                  id="description"
                  value={tournament.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTournament({
                    ...tournament,
                    description: e.target.value
                  })}
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules">大会ルール</Label>
                <textarea
                  id="rules"
                  value={tournament.rules}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTournament({
                    ...tournament,
                    rules: e.target.value
                  })}
                  rows={4}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxTeams">最大参加チーム数</Label>
                  <Input
                    id="maxTeams"
                    type="number"
                    value={tournament.maxTeams}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTournament({
                      ...tournament,
                      maxTeams: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select 
                    value={tournament.status} 
                    onValueChange={(value: 'draft' | 'active' | 'completed' | 'cancelled') => setTournament({
                      ...tournament,
                      status: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">下書き</SelectItem>
                      <SelectItem value="active">活動中</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="cancelled">キャンセル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPublic">公開設定</Label>
                  <p className="text-sm text-muted-foreground">
                    この大会を公開ページで表示する
                  </p>
                </div>
                <Switch
                  id="isPublic"
                  checked={tournament.isPublic}
                  onCheckedChange={(checked) => setTournament({
                    ...tournament,
                    isPublic: checked
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seasons Tab */}
        <TabsContent value="seasons" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>シーズン管理</span>
                  </CardTitle>
                  <CardDescription>
                    大会のシーズンを管理し、パーマリンクを設定できます
                  </CardDescription>
                </div>
                <Button onClick={() => setNewSeason({
                  name: '',
                  displayName: '',
                  startDate: '',
                  endDate: '',
                  status: 'draft',
                  description: '',
                  permalink: '',
                  isPublic: false
                })}>
                  <Plus className="mr-2 h-4 w-4" />
                  新しいシーズン
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Seasons List */}
              <div className="space-y-4">
                {seasons.map((season) => (
                  <div key={season.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-semibold">{season.displayName}</h3>
                          <p className="text-sm text-muted-foreground">{season.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(season.status)}
                        <Badge variant={season.isPublic ? "default" : "secondary"}>
                          {season.isPublic ? "公開" : "非公開"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">期間</Label>
                        <div>{season.startDate} 〜 {season.endDate}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">パーマリンク</Label>
                        <div className="font-mono text-xs">
                          {publicPageSettings.permalink || 'xxxleague'}.com/{season.permalink}/
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">シーズン名</Label>
                        <div>{season.name}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">作成日</Label>
                        <div>{season.createdAt}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        編集
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="mr-2 h-4 w-4" />
                        公開ページ
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        削除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* New Season Form */}
              {newSeason.name && (
                <Card>
                  <CardHeader>
                    <CardTitle>新しいシーズンの追加</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newSeasonName">シーズン名</Label>
                        <Input
                          id="newSeasonName"
                          value={newSeason.name || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSeason({
                            ...newSeason,
                            name: e.target.value
                          })}
                          placeholder="2025春"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newSeasonDisplayName">表示名</Label>
                        <Input
                          id="newSeasonDisplayName"
                          value={newSeason.displayName || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSeason({
                            ...newSeason,
                            displayName: e.target.value
                          })}
                          placeholder="2025春季"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newSeasonStartDate">開始日</Label>
                        <Input
                          id="newSeasonStartDate"
                          type="date"
                          value={newSeason.startDate || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSeason({
                            ...newSeason,
                            startDate: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newSeasonEndDate">終了日</Label>
                        <Input
                          id="newSeasonEndDate"
                          type="date"
                          value={newSeason.endDate || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSeason({
                            ...newSeason,
                            endDate: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newSeasonDescription">説明</Label>
                      <textarea
                        id="newSeasonDescription"
                        value={newSeason.description || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewSeason({
                          ...newSeason,
                          description: e.target.value
                        })}
                        rows={3}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="シーズンの説明を入力してください"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newSeasonPermalink">パーマリンク</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {publicPageSettings.permalink || 'xxxleague'}.com/
                          </span>
                          <Input
                            id="newSeasonPermalink"
                            value={newSeason.permalink || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSeason({
                              ...newSeason,
                              permalink: e.target.value
                            })}
                            placeholder="2025-spring"
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">/</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newSeasonStatus">ステータス</Label>
                        <Select 
                          value={newSeason.status || 'draft'} 
                          onValueChange={(value: 'draft' | 'active' | 'completed' | 'cancelled') => setNewSeason({
                            ...newSeason,
                            status: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">下書き</SelectItem>
                            <SelectItem value="active">活動中</SelectItem>
                            <SelectItem value="completed">完了</SelectItem>
                            <SelectItem value="cancelled">キャンセル</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newSeasonIsPublic">公開設定</Label>
                        <p className="text-sm text-muted-foreground">
                          このシーズンを公開ページで表示する
                        </p>
                      </div>
                      <Switch
                        id="newSeasonIsPublic"
                        checked={newSeason.isPublic || false}
                        onCheckedChange={(checked) => setNewSeason({
                          ...newSeason,
                          isPublic: checked
                        })}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setNewSeason({})}
                      >
                        キャンセル
                      </Button>
                      <Button 
                        onClick={() => {
                          if (newSeason.name && newSeason.displayName && newSeason.permalink) {
                            const season: Season = {
                              id: Date.now().toString(),
                              name: newSeason.name,
                              displayName: newSeason.displayName,
                              startDate: newSeason.startDate || '',
                              endDate: newSeason.endDate || '',
                              status: newSeason.status || 'draft',
                              description: newSeason.description || '',
                              permalink: newSeason.permalink,
                              isPublic: newSeason.isPublic || false,
                              createdAt: new Date().toISOString().split('T')[0]
                            }
                            setSeasons([...seasons, season])
                            setNewSeason({})
                          }
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        シーズンを追加
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* League Settings Tab */}
        <TabsContent value="league-settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>リーグ戦設定</span>
              </CardTitle>
              <CardDescription>
                リーグ戦の形式とルールを設定できます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Regular Season Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">レギュラーシーズン</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="regularSeasonEnabled">レギュラーシーズンを有効にする</Label>
                    <p className="text-sm text-muted-foreground">
                      リーグ戦形式でレギュラーシーズンを実施する
                    </p>
                  </div>
                  <Switch
                    id="regularSeasonEnabled"
                    checked={leagueSettings.regularSeason.enabled}
                    onCheckedChange={(checked) => setLeagueSettings({
                      ...leagueSettings,
                      regularSeason: {...leagueSettings.regularSeason, enabled: checked}
                    })}
                  />
                </div>

                {leagueSettings.regularSeason.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gamesPerTeam">各チームの試合数</Label>
                      <Input
                        id="gamesPerTeam"
                        type="number"
                        value={leagueSettings.regularSeason.gamesPerTeam}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeagueSettings({
                          ...leagueSettings,
                          regularSeason: {...leagueSettings.regularSeason, gamesPerTeam: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="playoffTeams">プレーオフ進出チーム数</Label>
                      <Input
                        id="playoffTeams"
                        type="number"
                        value={leagueSettings.regularSeason.playoffTeams}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeagueSettings({
                          ...leagueSettings,
                          regularSeason: {...leagueSettings.regularSeason, playoffTeams: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Playoffs Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">プレーオフ</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="playoffsEnabled">プレーオフを有効にする</Label>
                    <p className="text-sm text-muted-foreground">
                      レギュラーシーズン後にプレーオフを実施する
                    </p>
                  </div>
                  <Switch
                    id="playoffsEnabled"
                    checked={leagueSettings.playoffs.enabled}
                    onCheckedChange={(checked) => setLeagueSettings({
                      ...leagueSettings,
                      playoffs: {...leagueSettings.playoffs, enabled: checked}
                    })}
                  />
                </div>

                {leagueSettings.playoffs.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="playoffFormat">プレーオフ形式</Label>
                      <Select 
                        value={leagueSettings.playoffs.format} 
                        onValueChange={(value: 'single-elimination' | 'double-elimination' | 'best-of-series') => setLeagueSettings({
                          ...leagueSettings,
                          playoffs: {...leagueSettings.playoffs, format: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-elimination">シングルエリミネーション</SelectItem>
                          <SelectItem value="double-elimination">ダブルエリミネーション</SelectItem>
                          <SelectItem value="best-of-series">ベストオブシリーズ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seriesLength">シリーズ長</Label>
                      <Input
                        id="seriesLength"
                        type="number"
                        value={leagueSettings.playoffs.seriesLength}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeagueSettings({
                          ...leagueSettings,
                          playoffs: {...leagueSettings.playoffs, seriesLength: parseInt(e.target.value) || 1}
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Standings Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">順位決定</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sortBy">順位の基準</Label>
                    <Select 
                      value={leagueSettings.standings.sortBy} 
                      onValueChange={(value: 'wins' | 'winPercentage' | 'points') => setLeagueSettings({
                        ...leagueSettings,
                        standings: {...leagueSettings.standings, sortBy: value}
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wins">勝利数</SelectItem>
                        <SelectItem value="winPercentage">勝率</SelectItem>
                        <SelectItem value="points">ポイント</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiebreaker">タイブレーカー</Label>
                    <Select 
                      value={leagueSettings.standings.tiebreaker} 
                      onValueChange={(value: 'headToHead' | 'pointDifferential' | 'pointsFor') => setLeagueSettings({
                        ...leagueSettings,
                        standings: {...leagueSettings.standings, tiebreaker: value}
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="headToHead">直接対戦</SelectItem>
                        <SelectItem value="pointDifferential">得失点差</SelectItem>
                        <SelectItem value="pointsFor">総得点</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Public Page Settings Tab */}
        <TabsContent value="public-page" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>公開ページ設定</span>
              </CardTitle>
              <CardDescription>
                この大会の公開ページのデザインとスタイルをカスタマイズできます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">カラーテーマ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">プライマリカラー</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={publicPageSettings.primaryColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          primaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={publicPageSettings.primaryColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          primaryColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">セカンダリカラー</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={publicPageSettings.secondaryColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          secondaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={publicPageSettings.secondaryColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          secondaryColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">アクセントカラー</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={publicPageSettings.accentColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          accentColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={publicPageSettings.accentColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          accentColor: e.target.value
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">タイポグラフィ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">フォントファミリー</Label>
                    <Select 
                      value={publicPageSettings.fontFamily} 
                      onValueChange={(value) => setPublicPageSettings({
                        ...publicPageSettings,
                        fontFamily: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Noto Sans JP">Noto Sans JP</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Permalink Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">パーマリンク設定</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="permalink">基本パーマリンク</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="permalink"
                        value={publicPageSettings.permalink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                          ...publicPageSettings,
                          permalink: e.target.value
                        })}
                        placeholder="xxxleague"
                        minLength={6}
                      />
                      <span className="text-sm text-muted-foreground">.com/</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      最低6文字以上で入力してください。未指定の場合はデータベースIDが使用されます。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">シーズン別パーマリンク</h4>
                    <div className="space-y-3">
                      {availableSeasons.map((season) => (
                        <div key={season} className="flex items-center space-x-2">
                          <Label htmlFor={`season-${season}`} className="w-20 text-sm">
                            {season}
                          </Label>
                          <div className="flex items-center space-x-2 flex-1">
                            <span className="text-sm text-muted-foreground">
                              {publicPageSettings.permalink || 'xxxleague'}.com/
                            </span>
                            <Input
                              id={`season-${season}`}
                              value={publicPageSettings.seasonPermalinks[season] || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const newSeasonPermalinks = {
                                  ...publicPageSettings.seasonPermalinks,
                                  [season]: e.target.value
                                }
                                setPublicPageSettings({
                                  ...publicPageSettings,
                                  seasonPermalinks: newSeasonPermalinks
                                })
                              }}
                              placeholder={`${season.toLowerCase()}/`}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      各シーズンの個別URLを設定できます。例: xxxleague/2025-spring/
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">コンテンツ</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerText">ヘッダーテキスト</Label>
                    <Input
                      id="headerText"
                      value={publicPageSettings.headerText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                        ...publicPageSettings,
                        headerText: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footerText">フッターテキスト</Label>
                    <Input
                      id="footerText"
                      value={publicPageSettings.footerText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPageSettings({
                        ...publicPageSettings,
                        footerText: e.target.value
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Custom CSS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">カスタムCSS</h3>
                <div className="space-y-2">
                  <Label htmlFor="customCSS">カスタムスタイルシート</Label>
                  <textarea
                    id="customCSS"
                    value={publicPageSettings.customCSS}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPublicPageSettings({
                      ...publicPageSettings,
                      customCSS: e.target.value
                    })}
                    rows={8}
                    placeholder="/* カスタムCSSをここに入力してください */"
                    className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>プレビュー</span>
              </CardTitle>
              <CardDescription>
                公開ページのプレビューを表示します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">公開URL</h3>
                <div className="space-y-2">
                  <Label>基本URL</Label>
                  <div className="p-3 bg-gray-50 rounded-md font-mono text-sm">
                    https://{publicPageSettings.permalink || 'xxxleague'}.com/
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>シーズン別URL</Label>
                  <div className="space-y-2">
                    {Object.entries(publicPageSettings.seasonPermalinks).map(([season, url]) => (
                      <div key={season} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span className="font-medium">{season}</span>
                        <span className="font-mono text-sm text-muted-foreground">
                          https://{publicPageSettings.permalink || 'xxxleague'}.com/{url}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">デザインレビュー</h3>
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="text-center text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-4" />
                    <p>プレビュー機能は開発中です</p>
                    <p className="text-sm">設定した内容が公開ページに反映されます</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleCancel}>
          キャンセル
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          保存
        </Button>
      </div>
    </div>
  )
}
