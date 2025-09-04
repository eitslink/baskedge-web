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
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

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
}

export default function RefereesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [licenseFilter, setLicenseFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [associationFilter, setAssociationFilter] = useState('all')

  const referees = [
    {
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
      avatar: null
    },
    {
      id: 2,
      name: '佐藤花子',
      email: 'sato@example.com',
      phone: '090-2345-6789',
      license: 'B級',
      association: '関東バスケットボール協会',
      experience: 8,
      status: 'active',
      isPlayer: true,
      playerTeam: 'レイカーズ',
      assignments: 5,
      completedGames: 89,
      rating: 4.6,
      lastAssignment: '2024-01-12',
      createdAt: '2021-06-15',
      avatar: null
    },
    {
      id: 3,
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      phone: '090-3456-7890',
      license: 'A級',
      association: '日本バスケットボール協会',
      experience: 12,
      status: 'active',
      isPlayer: false,
      assignments: 6,
      completedGames: 134,
      rating: 4.7,
      lastAssignment: '2024-01-10',
      createdAt: '2019-09-01',
      avatar: null
    },
    {
      id: 4,
      name: '高橋美咲',
      email: 'takahashi@example.com',
      phone: '090-4567-8901',
      license: 'C級',
      association: '関西バスケットボール協会',
      experience: 3,
      status: 'active',
      isPlayer: true,
      playerTeam: 'ウォリアーズ',
      assignments: 2,
      completedGames: 23,
      rating: 4.2,
      lastAssignment: '2024-01-08',
      createdAt: '2022-04-01',
      avatar: null
    },
    {
      id: 5,
      name: '山田次郎',
      email: 'yamada@example.com',
      phone: '090-5678-9012',
      license: 'B級',
      association: '中部バスケットボール協会',
      experience: 6,
      status: 'inactive',
      isPlayer: false,
      assignments: 0,
      completedGames: 67,
      rating: 4.3,
      lastAssignment: '2023-12-20',
      createdAt: '2020-11-15',
      avatar: null
    },
    {
      id: 6,
      name: '伊藤三郎',
      email: 'ito@example.com',
      phone: '090-6789-0123',
      license: 'A級',
      association: '日本バスケットボール協会',
      experience: 20,
      status: 'active',
      isPlayer: false,
      assignments: 10,
      completedGames: 245,
      rating: 4.9,
      lastAssignment: '2024-01-14',
      createdAt: '2018-01-01',
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleEditReferee = (referee: Referee) => {
    router.push(`/dashboard/referees/${referee.id}/edit`)
  }

  const filteredReferees = referees.filter(referee => {
    const matchesSearch = referee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referee.association.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLicense = licenseFilter === 'all' || referee.license === licenseFilter
    const matchesStatus = statusFilter === 'all' || referee.status === statusFilter
    const matchesAssociation = associationFilter === 'all' || referee.association === associationFilter

    return matchesSearch && matchesLicense && matchesStatus && matchesAssociation
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">審判管理</h1>
          <p className="text-muted-foreground">
            審判員の登録、ライセンス管理、アサイン管理を行えます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新しい審判員
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
                placeholder="名前、メール、協会で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={licenseFilter} onValueChange={setLicenseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ライセンス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのライセンス</SelectItem>
                <SelectItem value="A級">A級</SelectItem>
                <SelectItem value="B級">B級</SelectItem>
                <SelectItem value="C級">C級</SelectItem>
                <SelectItem value="D級">D級</SelectItem>
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
            <Select value={associationFilter} onValueChange={setAssociationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="所属協会" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての協会</SelectItem>
                <SelectItem value="日本バスケットボール協会">日本バスケットボール協会</SelectItem>
                <SelectItem value="関東バスケットボール協会">関東バスケットボール協会</SelectItem>
                <SelectItem value="関西バスケットボール協会">関西バスケットボール協会</SelectItem>
                <SelectItem value="中部バスケットボール協会">中部バスケットボール協会</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="justify-start">
              <Filter className="mr-2 h-4 w-4" />
              詳細フィルタ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referees Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>審判員一覧</CardTitle>
              <CardDescription>
                {filteredReferees.length}名の審判員が見つかりました
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>審判員</TableHead>
                  <TableHead>ライセンス</TableHead>
                  <TableHead>所属協会</TableHead>
                  <TableHead>経験年数</TableHead>
                  <TableHead>選手兼任</TableHead>
                  <TableHead>実績</TableHead>
                  <TableHead>評価</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferees.map((referee) => (
                  <TableRow key={referee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={referee.avatar || undefined} alt={referee.name} />
                          <AvatarFallback>
                            {referee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{referee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            登録日: {referee.createdAt}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getLicenseBadge(referee.license)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{referee.association}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{referee.experience}年</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {referee.isPlayer ? (
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-600">{referee.playerTeam}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>今期: {referee.assignments}試合</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          <span>通算: {referee.completedGames}試合</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-medium ${getRatingColor(referee.rating)}`}>
                          {referee.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">/5.0</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(referee.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditReferee(referee)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            アサイン管理
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            レポート一覧
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
