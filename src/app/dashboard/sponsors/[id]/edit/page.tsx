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
  ExternalLink,
  Calendar,
  MapPin,
  DollarSign,
  Target,
  BarChart3,
  Eye,
  MousePointer,
  Clock,
  Link,
  Settings
} from 'lucide-react'

interface AdArea {
  id: number
  name: string
  position: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  url: string
  isActive: boolean
  impressions: number
  clicks: number
  ctr: number
  startDate: string
  endDate: string
  maxImpressions?: number
  maxClicks?: number
}

interface Sponsor {
  id: number
  name: string
  logo: string | null
  website: string
  contactEmail: string
  contactPhone: string
  category: string
  status: string
  campaign: string
  season: string
  startDate: string
  endDate: string
  budget: number
  spent: number
  adPosition: string
  impressions: number
  clicks: number
  ctr: number
  createdAt: string
  bio: string
  adAreas: AdArea[]
}

export default function SponsorEditPage() {
  const router = useRouter()
  
  // Mock sponsor data
  const [sponsor, setSponsor] = useState<Sponsor>({
    id: 1,
    name: 'Nike Japan',
    logo: null,
    website: 'https://nike.com',
    contactEmail: 'sponsor@nike.com',
    contactPhone: '03-1234-5678',
    category: 'スポーツ用品',
    status: 'active',
    campaign: '2024春季大会',
    season: '2024春',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    budget: 5000000,
    spent: 3200000,
    adPosition: 'ヘッダー',
    impressions: 125000,
    clicks: 1250,
    ctr: 1.0,
    createdAt: '2024-02-15',
    bio: 'Nike Japanは、スポーツを通じて人々の可能性を引き出すことを使命としています。',
    adAreas: [
      {
        id: 1,
        name: 'ヘッダーバナー',
        position: 'ヘッダー',
        utmSource: 'baskedge',
        utmMedium: 'banner',
        utmCampaign: 'nike-spring-2024',
        url: 'https://nike.com/jp/spring-collection',
        isActive: true,
        impressions: 125000,
        clicks: 1250,
        ctr: 1.0,
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        maxImpressions: 200000,
        maxClicks: 2000
      },
      {
        id: 2,
        name: 'サイドバー広告',
        position: 'サイドバー',
        utmSource: 'baskedge',
        utmMedium: 'sidebar',
        utmCampaign: 'nike-spring-2024',
        url: 'https://nike.com/jp/basketball',
        isActive: true,
        impressions: 89000,
        clicks: 890,
        ctr: 1.0,
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        maxImpressions: 150000,
        maxClicks: 1500
      }
    ]
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">活動中</Badge>
      case 'pending':
        return <Badge variant="outline">承認待ち</Badge>
      case 'completed':
        return <Badge variant="secondary">完了</Badge>
      case 'cancelled':
        return <Badge variant="destructive">キャンセル</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      'スポーツ用品': 'bg-blue-100 text-blue-800',
      '飲料': 'bg-green-100 text-green-800',
      '自動車': 'bg-gray-100 text-gray-800',
      '金融': 'bg-yellow-100 text-yellow-800',
      'IT': 'bg-purple-100 text-purple-800',
    }
    return (
      <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {category}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleSave = () => {
    // Save logic here
    console.log('Saving sponsor:', sponsor)
    router.push('/dashboard/sponsors')
  }

  const handleCancel = () => {
    router.push('/dashboard/sponsors')
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
            <h1 className="text-3xl font-bold tracking-tight">スポンサー編集</h1>
            <p className="text-muted-foreground">
              {sponsor.name} の詳細情報を編集できます
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
          {/* Sponsor Logo & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>基本情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={sponsor.logo || undefined} alt={sponsor.name} />
                  <AvatarFallback className="text-lg">
                    {sponsor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  ロゴを変更
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">スポンサー名</Label>
                  <Input
                    id="name"
                    value={sponsor.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">ウェブサイト</Label>
                  <Input
                    id="website"
                    value={sponsor.website}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, website: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">連絡先メール</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={sponsor.contactEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, contactEmail: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">電話番号</Label>
                  <Input
                    id="contactPhone"
                    value={sponsor.contactPhone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, contactPhone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">カテゴリ</Label>
                  <Select value={sponsor.category} onValueChange={(value) => setSponsor({...sponsor, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="スポーツ用品">スポーツ用品</SelectItem>
                      <SelectItem value="飲料">飲料</SelectItem>
                      <SelectItem value="自動車">自動車</SelectItem>
                      <SelectItem value="金融">金融</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select value={sponsor.status} onValueChange={(value) => setSponsor({...sponsor, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">活動中</SelectItem>
                      <SelectItem value="pending">承認待ち</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="cancelled">キャンセル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>キャンペーン情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign">キャンペーン名</Label>
                <Input
                  id="campaign"
                  value={sponsor.campaign}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, campaign: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">シーズン</Label>
                <Select value={sponsor.season} onValueChange={(value) => setSponsor({...sponsor, season: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024春">2024春</SelectItem>
                    <SelectItem value="2024夏">2024夏</SelectItem>
                    <SelectItem value="2024秋">2024秋</SelectItem>
                    <SelectItem value="2024冬">2024冬</SelectItem>
                    <SelectItem value="2024年">2024年</SelectItem>
                    <SelectItem value="2023年">2023年</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">開始日</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={sponsor.startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">終了日</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={sponsor.endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adPosition">掲載位置</Label>
                <Select value={sponsor.adPosition} onValueChange={(value) => setSponsor({...sponsor, adPosition: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ヘッダー">ヘッダー</SelectItem>
                    <SelectItem value="サイドバー">サイドバー</SelectItem>
                    <SelectItem value="本文内">本文内</SelectItem>
                    <SelectItem value="フッター">フッター</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Budget Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>予算管理</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">総予算</Label>
                <Input
                  id="budget"
                  type="number"
                  value={sponsor.budget}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, budget: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spent">使用済み金額</Label>
                <Input
                  id="spent"
                  type="number"
                  value={sponsor.spent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSponsor({...sponsor, spent: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label>残り予算</Label>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(sponsor.budget - sponsor.spent)}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(sponsor.spent / sponsor.budget) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Ad Areas & Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ad Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>広告エリア管理</span>
              </CardTitle>
              <CardDescription>
                UTM設定、表示/クリック計測、上限設定を行えます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sponsor.adAreas.map((adArea) => (
                  <div key={adArea.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{adArea.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant={adArea.isActive ? "default" : "secondary"}>
                          {adArea.isActive ? "アクティブ" : "非アクティブ"}
                        </Badge>
                        <Switch
                          checked={adArea.isActive}
                          onCheckedChange={(checked) => {
                            const updatedAdAreas = sponsor.adAreas.map(area => 
                              area.id === adArea.id ? {...area, isActive: checked} : area
                            )
                            setSponsor({...sponsor, adAreas: updatedAdAreas})
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>UTM Source</Label>
                        <Input value={adArea.utmSource} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>UTM Medium</Label>
                        <Input value={adArea.utmMedium} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>UTM Campaign</Label>
                        <Input value={adArea.utmCampaign} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>広告URL</Label>
                        <div className="flex items-center space-x-2">
                          <Input value={adArea.url} readOnly />
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{adArea.impressions.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">表示数</div>
                        {adArea.maxImpressions && (
                          <div className="text-xs text-muted-foreground">
                            上限: {adArea.maxImpressions.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{adArea.clicks.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">クリック数</div>
                        {adArea.maxClicks && (
                          <div className="text-xs text-muted-foreground">
                            上限: {adArea.maxClicks.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{adArea.ctr}%</div>
                        <div className="text-sm text-muted-foreground">CTR</div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  広告エリアを追加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>効果測定サマリー</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{sponsor.impressions.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">総表示数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{sponsor.clicks.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">総クリック数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{sponsor.ctr}%</div>
                  <div className="text-sm text-muted-foreground">総CTR</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>スポンサー紹介</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bio">プロフィール</Label>
                <textarea
                  id="bio"
                  value={sponsor.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSponsor({...sponsor, bio: e.target.value})}
                  rows={4}
                  placeholder="スポンサーのプロフィールを入力してください..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
