'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Edit,
  MoreHorizontal,
  User,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

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
}

export default function StaffPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const staff = [
    {
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
      avatar: null
    },
    {
      id: 2,
      name: '佐藤花子',
      email: 'sato@example.com',
      phone: '090-2345-6789',
      role: '副会長',
      department: '運営部',
      status: 'active',
      loginEnabled: true,
      publicVisible: true,
      lastLogin: '2024-01-14 09:15',
      createdAt: '2023-04-01',
      avatar: null
    },
    {
      id: 3,
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      phone: '090-3456-7890',
      role: '会計',
      department: '財務部',
      status: 'active',
      loginEnabled: true,
      publicVisible: false,
      lastLogin: '2024-01-13 16:45',
      createdAt: '2023-05-15',
      avatar: null
    },
    {
      id: 4,
      name: '高橋美咲',
      email: 'takahashi@example.com',
      phone: '090-4567-8901',
      role: '広報担当',
      department: '広報部',
      status: 'active',
      loginEnabled: true,
      publicVisible: true,
      lastLogin: '2024-01-12 11:20',
      createdAt: '2023-06-01',
      avatar: null
    },
    {
      id: 5,
      name: '田中次郎',
      email: 'tanaka@example.com',
      phone: '090-5678-9012',
      role: '技術担当',
      department: '技術部',
      status: 'inactive',
      loginEnabled: false,
      publicVisible: false,
      lastLogin: '2023-12-20 10:30',
      createdAt: '2023-07-01',
      avatar: null
    },
    {
      id: 6,
      name: '伊藤三郎',
      email: 'ito@example.com',
      phone: '090-6789-0123',
      role: '審判長',
      department: '競技部',
      status: 'active',
      loginEnabled: true,
      publicVisible: true,
      lastLogin: '2024-01-10 08:45',
      createdAt: '2023-08-15',
      avatar: null
    }
  ]

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

  const handleEditStaff = (staff: Staff) => {
    router.push(`/dashboard/staff/${staff.id}/edit`)
  }

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter

    return matchesSearch && matchesRole && matchesStatus && matchesDepartment
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">スタッフ管理</h1>
          <p className="text-muted-foreground">
            スタッフの登録、役割管理、権限設定を行えます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新しいスタッフ
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
                placeholder="名前、メール、部署で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="役割" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての役割</SelectItem>
                <SelectItem value="会長">会長</SelectItem>
                <SelectItem value="副会長">副会長</SelectItem>
                <SelectItem value="会計">会計</SelectItem>
                <SelectItem value="広報担当">広報担当</SelectItem>
                <SelectItem value="技術担当">技術担当</SelectItem>
                <SelectItem value="審判長">審判長</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="active">活動中</SelectItem>
                <SelectItem value="inactive">非活動</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="部署" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての部署</SelectItem>
                <SelectItem value="運営部">運営部</SelectItem>
                <SelectItem value="財務部">財務部</SelectItem>
                <SelectItem value="広報部">広報部</SelectItem>
                <SelectItem value="技術部">技術部</SelectItem>
                <SelectItem value="競技部">競技部</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="justify-start">
              <Filter className="mr-2 h-4 w-4" />
              詳細フィルタ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>スタッフ一覧</CardTitle>
              <CardDescription>
                {filteredStaff.length}名のスタッフが見つかりました
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>スタッフ</TableHead>
                  <TableHead>役割</TableHead>
                  <TableHead>部署</TableHead>
                  <TableHead>連絡先</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>権限</TableHead>
                  <TableHead>最終ログイン</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || undefined} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            登録日: {member.createdAt}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(member.role)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{member.department}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(member.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          {member.loginEnabled ? (
                            <Shield className="h-3 w-3 text-green-600" />
                          ) : (
                            <Shield className="h-3 w-3 text-gray-400" />
                          )}
                          <span className="text-xs">
                            {member.loginEnabled ? 'ログイン可' : 'ログイン不可'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {member.publicVisible ? (
                            <Eye className="h-3 w-3 text-blue-600" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-gray-400" />
                          )}
                          <span className="text-xs">
                            {member.publicVisible ? '公開' : '非公開'}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {member.lastLogin ? member.lastLogin : '未ログイン'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditStaff(member)}>
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
    </div>
  )
}
