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
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  Settings,
  Eye,
  EyeOff,
  Key,
  Users
} from 'lucide-react'

interface Staff {
  id: number
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: string
  loginEnabled: boolean
  publicVisible: boolean
  lastLogin: string | null
  createdAt: string
  avatar: string | null
  bio: string
  permissions: {
    canManageStaff: boolean
    canManageTeams: boolean
    canManagePlayers: boolean
    canManageGames: boolean
    canViewReports: boolean
    canManageSettings: boolean
  }
}

export default function StaffEditPage() {
  const router = useRouter()
  
  // Mock staff data
  const [staff, setStaff] = useState<Staff>({
    id: 1,
    name: '山田太郎',
    email: 'yamada@example.com',
    phone: '090-1234-5678',
    role: '会長',
    department: '運営部',
    status: 'active',
    loginEnabled: true,
    publicVisible: true,
    lastLogin: '2024-01-15 14:30',
    createdAt: '2023-04-01',
    avatar: null,
    bio: 'バスケットボール協会の会長として、協会の運営と発展に尽力しています。',
    permissions: {
      canManageStaff: true,
      canManageTeams: true,
      canManagePlayers: true,
      canManageGames: true,
      canViewReports: true,
      canManageSettings: true
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

  const getRoleBadge = (role: string) => {
    const colors = {
      '会長': 'bg-red-100 text-red-800',
      '副会長': 'bg-orange-100 text-orange-800',
      '会計': 'bg-green-100 text-green-800',
      '広報担当': 'bg-blue-100 text-blue-800',
      '技術担当': 'bg-purple-100 text-purple-800',
      '審判長': 'bg-yellow-100 text-yellow-800',
    }
    return (
      <Badge className={colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {role}
      </Badge>
    )
  }

  const handleSave = () => {
    // Save logic here
    console.log('Saving staff:', staff)
    router.push('/dashboard/staff')
  }

  const handleCancel = () => {
    router.push('/dashboard/staff')
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
            <h1 className="text-3xl font-bold tracking-tight">スタッフ編集</h1>
            <p className="text-muted-foreground">
              {staff.name} の詳細情報を編集できます
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
          {/* Staff Photo & Basic Info */}
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
                  <AvatarImage src={staff.avatar || undefined} alt={staff.name} />
                  <AvatarFallback className="text-lg">
                    {staff.name.charAt(0)}
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
                    value={staff.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({...staff, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={staff.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({...staff, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={staff.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({...staff, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">役割</Label>
                  <Select value={staff.role} onValueChange={(value) => setStaff({...staff, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="会長">会長</SelectItem>
                      <SelectItem value="副会長">副会長</SelectItem>
                      <SelectItem value="会計">会計</SelectItem>
                      <SelectItem value="広報担当">広報担当</SelectItem>
                      <SelectItem value="技術担当">技術担当</SelectItem>
                      <SelectItem value="審判長">審判長</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">部署</Label>
                  <Select value={staff.department} onValueChange={(value) => setStaff({...staff, department: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="運営部">運営部</SelectItem>
                      <SelectItem value="財務部">財務部</SelectItem>
                      <SelectItem value="広報部">広報部</SelectItem>
                      <SelectItem value="技術部">技術部</SelectItem>
                      <SelectItem value="競技部">競技部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select value={staff.status} onValueChange={(value) => setStaff({...staff, status: value})}>
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

          {/* Access Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>アクセス制御</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="loginEnabled">ログイン権限</Label>
                  <p className="text-sm text-muted-foreground">
                    システムへのログインを許可する
                  </p>
                </div>
                <Switch
                  id="loginEnabled"
                  checked={staff.loginEnabled}
                  onCheckedChange={(checked) => setStaff({...staff, loginEnabled: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="publicVisible">一般公開</Label>
                  <p className="text-sm text-muted-foreground">
                    一般ユーザーに情報を公開する
                  </p>
                </div>
                <Switch
                  id="publicVisible"
                  checked={staff.publicVisible}
                  onCheckedChange={(checked) => setStaff({...staff, publicVisible: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Permissions & Bio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>権限設定</span>
              </CardTitle>
              <CardDescription>
                各機能へのアクセス権限を設定できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="canManageStaff">スタッフ管理</Label>
                      <p className="text-sm text-muted-foreground">
                        スタッフの登録・編集・削除
                      </p>
                    </div>
                    <Switch
                      id="canManageStaff"
                      checked={staff.permissions.canManageStaff}
                      onCheckedChange={(checked) => setStaff({
                        ...staff, 
                        permissions: {...staff.permissions, canManageStaff: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="canManageTeams">チーム管理</Label>
                      <p className="text-sm text-muted-foreground">
                        チームの登録・編集・削除
                      </p>
                    </div>
                    <Switch
                      id="canManageTeams"
                      checked={staff.permissions.canManageTeams}
                      onCheckedChange={(checked) => setStaff({
                        ...staff, 
                        permissions: {...staff.permissions, canManageTeams: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="canManagePlayers">選手管理</Label>
                      <p className="text-sm text-muted-foreground">
                        選手の登録・編集・削除
                      </p>
                    </div>
                    <Switch
                      id="canManagePlayers"
                      checked={staff.permissions.canManagePlayers}
                      onCheckedChange={(checked) => setStaff({
                        ...staff, 
                        permissions: {...staff.permissions, canManagePlayers: checked}
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="canManageGames">試合管理</Label>
                      <p className="text-sm text-muted-foreground">
                        試合の登録・編集・削除
                      </p>
                    </div>
                    <Switch
                      id="canManageGames"
                      checked={staff.permissions.canManageGames}
                      onCheckedChange={(checked) => setStaff({
                        ...staff, 
                        permissions: {...staff.permissions, canManageGames: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="canViewReports">レポート閲覧</Label>
                      <p className="text-sm text-muted-foreground">
                        統計レポートの閲覧
                      </p>
                    </div>
                    <Switch
                      id="canViewReports"
                      checked={staff.permissions.canViewReports}
                      onCheckedChange={(checked) => setStaff({
                        ...staff, 
                        permissions: {...staff.permissions, canViewReports: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="canManageSettings">システム設定</Label>
                      <p className="text-sm text-muted-foreground">
                        システム全体の設定変更
                      </p>
                    </div>
                    <Switch
                      id="canManageSettings"
                      checked={staff.permissions.canManageSettings}
                      onCheckedChange={(checked) => setStaff({
                        ...staff, 
                        permissions: {...staff.permissions, canManageSettings: checked}
                      })}
                    />
                  </div>
                </div>
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
                  value={staff.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStaff({...staff, bio: e.target.value})}
                  rows={4}
                  placeholder="スタッフのプロフィールを入力してください..."
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
                    <span>{staff.createdAt}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>最終ログイン</Label>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{staff.lastLogin || '未ログイン'}</span>
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
