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
import { Switch } from '@/components/ui/switch'
import { 
  ArrowLeft, 
  Save, 
  X, 
  User, 
  Award, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

interface Referee {
  id: number
  name: string
  email: string
  phone: string
  license: string
  association: string
  experience: number
  status: string
  isPlayer: boolean
  playerTeam?: string
  assignments: number
  completedGames: number
  rating: number
  lastAssignment: string | null
  createdAt: string
  avatar: string | null
  bio: string
  specialties: string[]
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
}

export default function RefereeEditPage() {
  const router = useRouter()
  
  // Mock referee data
  const [referee, setReferee] = useState<Referee>({
    id: 1,
    name: '田中審判',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    license: 'A級',
    association: '日本バスケットボール協会',
    experience: 15,
    status: 'active',
    isPlayer: false,
    assignments: 8,
    completedGames: 156,
    rating: 4.8,
    lastAssignment: '2024-01-15',
    createdAt: '2020-03-01',
    avatar: null,
    bio: '長年にわたりバスケットボールの審判を務め、公平で正確なジャッジを心がけています。',
    specialties: ['ファウル判定', 'テクニカル判定', 'ゲーム管理'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    }
  })

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

  const getLicenseBadge = (license: string) => {
    const colors = {
      'A級': 'bg-red-100 text-red-800',
      'B級': 'bg-orange-100 text-orange-800',
      'C級': 'bg-yellow-100 text-yellow-800',
      'D級': 'bg-green-100 text-green-800',
    }
    return (
      <Badge className={colors[license as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {license}
      </Badge>
    )
  }

  const handleSave = () => {
    // Save logic here
    console.log('Saving referee:', referee)
    router.push('/dashboard/referees')
  }

  const handleCancel = () => {
    router.push('/dashboard/referees')
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
            <h1 className="text-3xl font-bold tracking-tight">審判員編集</h1>
            <p className="text-muted-foreground">
              {referee.name} の詳細情報を編集できます
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
          {/* Referee Photo & Basic Info */}
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
                  <AvatarImage src={referee.avatar || undefined} alt={referee.name} />
                  <AvatarFallback className="text-lg">
                    {referee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  写真を変更
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">氏名</Label>
                  <Input
                    id="name"
                    value={referee.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({...referee, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={referee.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({...referee, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={referee.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({...referee, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">ライセンス</Label>
                  <Select value={referee.license} onValueChange={(value) => setReferee({...referee, license: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A級">A級</SelectItem>
                      <SelectItem value="B級">B級</SelectItem>
                      <SelectItem value="C級">C級</SelectItem>
                      <SelectItem value="D級">D級</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="association">所属協会</Label>
                  <Select value={referee.association} onValueChange={(value) => setReferee({...referee, association: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="日本バスケットボール協会">日本バスケットボール協会</SelectItem>
                      <SelectItem value="関東バスケットボール協会">関東バスケットボール協会</SelectItem>
                      <SelectItem value="関西バスケットボール協会">関西バスケットボール協会</SelectItem>
                      <SelectItem value="中部バスケットボール協会">中部バスケットボール協会</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">経験年数</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={referee.experience}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferee({...referee, experience: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select value={referee.status} onValueChange={(value) => setReferee({...referee, status: value})}>
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
              </div>
            </CardContent>
          </Card>

          {/* Player Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>選手兼任</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPlayer">選手兼任</Label>
                  <p className="text-sm text-muted-foreground">
                    審判員が選手も兼任している場合
                  </p>
                </div>
                <Switch
                  id="isPlayer"
                  checked={referee.isPlayer}
                  onCheckedChange={(checked) => setReferee({...referee, isPlayer: checked})}
                />
              </div>

              {referee.isPlayer && (
                <div className="space-y-2">
                  <Label htmlFor="playerTeam">所属チーム</Label>
                  <Select value={referee.playerTeam || ''} onValueChange={(value) => setReferee({...referee, playerTeam: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="チームを選択" />
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
              )}
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>出勤可能日</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(referee.availability).map(([day, available]) => (
                <div key={day} className="flex items-center justify-between">
                  <Label htmlFor={day} className="capitalize">
                    {day === 'monday' && '月曜日'}
                    {day === 'tuesday' && '火曜日'}
                    {day === 'wednesday' && '水曜日'}
                    {day === 'thursday' && '木曜日'}
                    {day === 'friday' && '金曜日'}
                    {day === 'saturday' && '土曜日'}
                    {day === 'sunday' && '日曜日'}
                  </Label>
                  <Switch
                    id={day}
                    checked={available}
                    onCheckedChange={(checked) => setReferee({
                      ...referee, 
                      availability: {...referee.availability, [day]: checked}
                    })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Bio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>実績・評価</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{referee.assignments}</div>
                  <div className="text-sm text-muted-foreground">今期アサイン</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{referee.completedGames}</div>
                  <div className="text-sm text-muted-foreground">通算試合数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{referee.rating}</div>
                  <div className="text-sm text-muted-foreground">評価 (5.0満点)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>専門分野</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>得意分野</Label>
                <div className="flex flex-wrap gap-2">
                  {referee.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  専門分野を追加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>プロフィール</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <textarea
                  id="bio"
                  value={referee.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReferee({...referee, bio: e.target.value})}
                  rows={4}
                  placeholder="審判員のプロフィールを入力してください..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>アカウント情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>登録日</Label>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{referee.createdAt}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>最終アサイン</Label>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{referee.lastAssignment || '未アサイン'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
