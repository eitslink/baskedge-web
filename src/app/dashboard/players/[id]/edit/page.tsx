'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Save, 
  X, 
  User, 
  Target, 
  TrendingUp, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Trophy,
  Award
} from 'lucide-react'

interface Player {
  id: number
  name: string
  team: string
  jerseyNumber: number
  position: string
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  fieldGoalPercentage: number
  threePointPercentage: number
  freeThrowPercentage: number
  photo: string | null
  status: string
  league: string
  age: number
  height: string
  weight: string
  experience: number
  dominantHand: string
  hometown: string
  email: string
  phone: string
  bio: string
  achievements: string[]
}

export default function PlayerEditPage() {
  const router = useRouter()
  
  // Mock player data
  const [player, setPlayer] = useState<Player>({
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
    dominantHand: 'right',
    hometown: '東京',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    bio: 'バスケットボールに情熱を注ぐ選手。チームのエースとして活躍し、常に勝利を目指している。',
    achievements: ['NBA新人王', 'オールスター選出', 'シーズンMVP候補']
  })

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
    // Save logic here
    console.log('Saving player:', player)
    router.push('/dashboard/players')
  }

  const handleCancel = () => {
    router.push('/dashboard/players')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">選手編集</h1>
            <p className="text-muted-foreground">
              {player.name} の詳細情報を編集できます
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            キャンセル
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            保存
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Player Photo & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>基本情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={player.photo || undefined} alt={player.name} />
                  <AvatarFallback className="text-lg">
                    {player.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  写真を変更
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">選手名</Label>
                  <Input
                    id="name"
                    value={player.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jerseyNumber">背番号</Label>
                                      <Input
                    id="jerseyNumber"
                    type="number"
                    value={player.jerseyNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, jerseyNumber: parseInt(e.target.value) || 0})}
                  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">年齢</Label>
                    <Input
                      id="age"
                      type="number"
                      value={player.age}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, age: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">ポジション</Label>
                  <Select value={player.position} onValueChange={(value) => setPlayer({...player, position: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PG">PG (ポイントガード)</SelectItem>
                      <SelectItem value="SG">SG (シューティングガード)</SelectItem>
                      <SelectItem value="SF">SF (スモールフォワード)</SelectItem>
                      <SelectItem value="PF">PF (パワーフォワード)</SelectItem>
                      <SelectItem value="C">C (センター)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team">チーム</Label>
                  <Select value={player.team} onValueChange={(value) => setPlayer({...player, team: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="レイカーズ">レイカーズ</SelectItem>
                      <SelectItem value="ウォリアーズ">ウォリアーズ</SelectItem>
                      <SelectItem value="セルティックス">セルティックス</SelectItem>
                      <SelectItem value="ヒート">ヒート</SelectItem>
                      <SelectItem value="ネッツ">ネッツ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select value={player.status} onValueChange={(value) => setPlayer({...player, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">活動中</SelectItem>
                      <SelectItem value="inactive">非活動</SelectItem>
                      <SelectItem value="injured">怪我中</SelectItem>
                      <SelectItem value="suspended">出場停止</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>身体情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">身長</Label>
                  <Input
                    id="height"
                    value={player.height}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, height: e.target.value})}
                    placeholder="203cm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">体重</Label>
                  <Input
                    id="weight"
                    value={player.weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, weight: e.target.value})}
                    placeholder="98kg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dominantHand">利き手</Label>
                <Select value={player.dominantHand} onValueChange={(value) => setPlayer({...player, dominantHand: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">右利き</SelectItem>
                    <SelectItem value="left">左利き</SelectItem>
                    <SelectItem value="both">両利き</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">経験年数</Label>
                <Input
                  id="experience"
                  type="number"
                  value={player.experience}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, experience: parseInt(e.target.value) || 0})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>連絡先情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hometown">出身地</Label>
                <Input
                  id="hometown"
                  value={player.hometown}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, hometown: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={player.email}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  value={player.phone}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, phone: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Bio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Season Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>今シーズン成績</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="points">得点</Label>
                  <Input
                    id="points"
                    type="number"
                    step="0.1"
                    value={player.points}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, points: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rebounds">リバウンド</Label>
                  <Input
                    id="rebounds"
                    type="number"
                    step="0.1"
                    value={player.rebounds}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, rebounds: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assists">アシスト</Label>
                  <Input
                    id="assists"
                    type="number"
                    step="0.1"
                    value={player.assists}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, assists: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="steals">スティール</Label>
                  <Input
                    id="steals"
                    type="number"
                    step="0.1"
                    value={player.steals}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, steals: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blocks">ブロック</Label>
                  <Input
                    id="blocks"
                    type="number"
                    step="0.1"
                    value={player.blocks}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, blocks: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldGoalPercentage">FG%</Label>
                  <Input
                    id="fieldGoalPercentage"
                    type="number"
                    step="0.1"
                    value={player.fieldGoalPercentage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, fieldGoalPercentage: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threePointPercentage">3P%</Label>
                  <Input
                    id="threePointPercentage"
                    type="number"
                    step="0.1"
                    value={player.threePointPercentage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, threePointPercentage: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeThrowPercentage">FT%</Label>
                  <Input
                    id="freeThrowPercentage"
                    type="number"
                    step="0.1"
                    value={player.freeThrowPercentage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayer({...player, freeThrowPercentage: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>選手紹介</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bio">プロフィール</Label>
                <textarea
                  id="bio"
                  value={player.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPlayer({...player, bio: e.target.value})}
                  rows={4}
                  placeholder="選手のプロフィールを入力してください..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>主な実績</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>実績一覧</Label>
                <div className="space-y-2">
                  {player.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  実績を追加
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
