'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings,
  Trophy,
  Crown,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Download,
  Upload
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


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('tournaments')
  
  // Mock data
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: 1,
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
    },
    {
      id: 2,
      name: '2024夏季トーナメント',
      type: 'tournament',
      status: 'draft',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      description: '2024年夏季のトーナメント戦です。シングルエリミネーション方式で実施します。',
      rules: 'シングルエリミネーション方式。各試合は40分（10分×4クォーター）で実施。',
      maxTeams: 32,
      currentTeams: 0,
      isPublic: false,
      createdAt: '2024-05-01'
    }
  ])


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

  const handleSaveSettings = () => {
    console.log('Saving settings...')
    // Save logic here
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">設定</h1>
          <p className="text-muted-foreground">
            大会管理、リーグ戦・トーナメント設定、公開ページのカスタマイズを行えます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            設定エクスポート
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            設定インポート
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            保存
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="tournaments" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>大会管理</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>システム</span>
          </TabsTrigger>
        </TabsList>

        {/* Tournaments Tab */}
        <TabsContent value="tournaments" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>大会一覧</span>
                  </CardTitle>
                  <CardDescription>
                    登録されている大会の管理を行えます
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  新しい大会
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-semibold">{tournament.name}</h3>
                          <p className="text-sm text-muted-foreground">{tournament.description}</p>
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">期間</Label>
                        <div>{tournament.startDate} 〜 {tournament.endDate}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">参加チーム</Label>
                        <div>{tournament.currentTeams} / {tournament.maxTeams} チーム</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">ルール</Label>
                        <div className="truncate">{tournament.rules}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">作成日</Label>
                        <div>{tournament.createdAt}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = `/dashboard/settings/tournaments/${tournament.id}/edit`}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        編集
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        プレビュー
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        削除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* System Settings Tab */}
        <TabsContent value="system" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>システム設定</span>
              </CardTitle>
              <CardDescription>
                システム全体の設定を行えます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">プラン情報</h3>
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">プロプラン</span>
                  <Badge variant="outline">有料</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  現在のプランでは最大10個の大会を登録できます。
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">データ管理</h3>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    データバックアップ
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    データ復元
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
