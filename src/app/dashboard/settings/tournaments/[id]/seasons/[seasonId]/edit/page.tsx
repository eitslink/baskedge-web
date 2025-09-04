'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { 
  ArrowLeft,
  Calendar,
  Save,
  Eye,
  Link,
  Settings,
  Trophy
} from 'lucide-react'

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
  isCurrent: boolean
  createdAt: string
  updatedAt: string
}

interface Tournament {
  id: number
  name: string
  permalink: string
}

export default function SeasonEditPage({ 
  params 
}: { 
  params: Promise<{ 
    id: string
    seasonId: string 
  }> 
}) {
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ id: string; seasonId: string } | null>(null)
  
  // paramsを解決
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])
  
  // Mock data
  const [tournament] = useState<Tournament>({
    id: resolvedParams ? parseInt(resolvedParams.id) : 0,
    name: '2024春季リーグ戦',
    permalink: 'xxxleague'
  })

  const [season, setSeason] = useState<Season>({
    id: resolvedParams?.seasonId || '',
    name: '2024春',
    displayName: '2024春季',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    status: 'active',
    description: '2024年春季シーズンです。レギュラーシーズンとプレーオフを実施します。',
    permalink: '2024-spring',
    isPublic: true,
    isCurrent: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15'
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

  const handleSave = () => {
    console.log('Saving season settings...')
    // Save logic here
    router.push(`/dashboard/settings/tournaments/${resolvedParams?.id}/edit?tab=seasons`)
  }

  const handleCancel = () => {
    router.push(`/dashboard/settings/tournaments/${resolvedParams?.id}/edit?tab=seasons`)
  }

  const handlePreview = () => {
    window.open(`/${tournament.permalink}/${season.permalink}`, '_blank')
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
              <Calendar className="h-8 w-8" />
              <span>{season.displayName}</span>
            </h1>
            <p className="text-muted-foreground">
              {tournament.name} - シーズン設定
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(season.status)}
          <Badge variant={season.isPublic ? "default" : "secondary"}>
            {season.isPublic ? "公開" : "非公開"}
          </Badge>
          {season.isCurrent && (
            <Badge className="bg-yellow-100 text-yellow-800">
              現在のシーズン
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>基本情報</span>
              </CardTitle>
              <CardDescription>
                シーズンの基本情報を設定します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">シーズン名</Label>
                  <Input
                    id="name"
                    value={season.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeason({
                      ...season,
                      name: e.target.value
                    })}
                    placeholder="2024春"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">表示名</Label>
                  <Input
                    id="displayName"
                    value={season.displayName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeason({
                      ...season,
                      displayName: e.target.value
                    })}
                    placeholder="2024春季"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">開始日</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={season.startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeason({
                      ...season,
                      startDate: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">終了日</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={season.endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeason({
                      ...season,
                      endDate: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <textarea
                  id="description"
                  value={season.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSeason({
                    ...season,
                    description: e.target.value
                  })}
                  rows={4}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="シーズンの説明を入力してください"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select 
                    value={season.status} 
                    onValueChange={(value: 'draft' | 'active' | 'completed' | 'cancelled') => setSeason({
                      ...season,
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
                <div className="space-y-2">
                  <Label htmlFor="permalink">パーマリンク</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {tournament.permalink}.com/
                    </span>
                    <Input
                      id="permalink"
                      value={season.permalink}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeason({
                        ...season,
                        permalink: e.target.value
                      })}
                      placeholder="2024-spring"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">/</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>設定</CardTitle>
              <CardDescription>
                シーズンの表示と動作に関する設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPublic">公開設定</Label>
                  <p className="text-sm text-muted-foreground">
                    このシーズンを公開ページで表示する
                  </p>
                </div>
                <Switch
                  id="isPublic"
                  checked={season.isPublic}
                  onCheckedChange={(checked) => setSeason({
                    ...season,
                    isPublic: checked
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isCurrent">現在のシーズン</Label>
                  <p className="text-sm text-muted-foreground">
                    このシーズンを現在のシーズンとして設定する（ゲーム・チーム登録時に自動選択される）
                  </p>
                </div>
                <Switch
                  id="isCurrent"
                  checked={season.isCurrent}
                  onCheckedChange={(checked) => setSeason({
                    ...season,
                    isCurrent: checked
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Season Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>シーズン情報</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">公開URL</Label>
                <div className="p-3 bg-gray-50 rounded-md font-mono text-sm">
                  https://{tournament.permalink}.com/{season.permalink}/
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground">作成日</Label>
                <div>{season.createdAt}</div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground">最終更新</Label>
                <div>{season.updatedAt}</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handlePreview}
              >
                <Eye className="mr-2 h-4 w-4" />
                公開ページをプレビュー
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigator.clipboard.writeText(`https://${tournament.permalink}.com/${season.permalink}/`)}
              >
                <Link className="mr-2 h-4 w-4" />
                URLをコピー
              </Button>
            </CardContent>
          </Card>

          {/* Current Season Warning */}
          {season.isCurrent && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">現在のシーズン</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-700">
                  このシーズンは現在のシーズンとして設定されています。
                  新しいゲームやチームを登録する際に、自動的にこのシーズンが選択されます。
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
