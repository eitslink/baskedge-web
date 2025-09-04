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
  ExternalLink,
  Calendar,
  MapPin,
  Eye,
  MousePointer,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Target
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

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
}

export default function SponsorsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [campaignFilter, setCampaignFilter] = useState('all')

  const sponsors = [
    {
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
      createdAt: '2024-02-15'
    },
    {
      id: 2,
      name: 'Gatorade',
      logo: null,
      website: 'https://gatorade.com',
      contactEmail: 'japan@gatorade.com',
      contactPhone: '03-2345-6789',
      category: '飲料',
      status: 'active',
      campaign: '2024春季大会',
      season: '2024春',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      budget: 3000000,
      spent: 1800000,
      adPosition: 'サイドバー',
      impressions: 89000,
      clicks: 890,
      ctr: 1.0,
      createdAt: '2024-02-20'
    },
    {
      id: 3,
      name: 'Toyota',
      logo: null,
      website: 'https://toyota.co.jp',
      contactEmail: 'sponsor@toyota.co.jp',
      contactPhone: '03-3456-7890',
      category: '自動車',
      status: 'active',
      campaign: '2024年シーズン',
      season: '2024年',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 10000000,
      spent: 7500000,
      adPosition: '本文内',
      impressions: 250000,
      clicks: 2500,
      ctr: 1.0,
      createdAt: '2023-12-01'
    },
    {
      id: 4,
      name: 'Under Armour',
      logo: null,
      website: 'https://underarmour.com',
      contactEmail: 'japan@underarmour.com',
      contactPhone: '03-4567-8901',
      category: 'スポーツ用品',
      status: 'pending',
      campaign: '2024夏季大会',
      season: '2024夏',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      budget: 2000000,
      spent: 0,
      adPosition: 'フッター',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      createdAt: '2024-05-15'
    },
    {
      id: 5,
      name: 'Coca-Cola',
      logo: null,
      website: 'https://coca-cola.com',
      contactEmail: 'sponsor@coca-cola.com',
      contactPhone: '03-5678-9012',
      category: '飲料',
      status: 'completed',
      campaign: '2023年シーズン',
      season: '2023年',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      budget: 8000000,
      spent: 8000000,
      adPosition: 'ヘッダー',
      impressions: 180000,
      clicks: 1800,
      ctr: 1.0,
      createdAt: '2022-11-01'
    },
    {
      id: 6,
      name: 'Adidas',
      logo: null,
      website: 'https://adidas.com',
      contactEmail: 'japan@adidas.com',
      contactPhone: '03-6789-0123',
      category: 'スポーツ用品',
      status: 'active',
      campaign: '2024年シーズン',
      season: '2024年',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 6000000,
      spent: 4500000,
      adPosition: 'サイドバー',
      impressions: 200000,
      clicks: 2000,
      ctr: 1.0,
      createdAt: '2023-10-01'
    }
  ]

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

  const getPositionBadge = (position: string) => {
    const colors = {
      'ヘッダー': 'bg-red-100 text-red-800',
      'サイドバー': 'bg-orange-100 text-orange-800',
      '本文内': 'bg-blue-100 text-blue-800',
      'フッター': 'bg-gray-100 text-gray-800',
    }
    return (
      <Badge className={colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {position}
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

  const handleEditSponsor = (sponsor: Sponsor) => {
    router.push(`/dashboard/sponsors/${sponsor.id}/edit`)
  }

  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.campaign.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || sponsor.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || sponsor.status === statusFilter
    const matchesCampaign = campaignFilter === 'all' || sponsor.campaign === campaignFilter

    return matchesSearch && matchesCategory && matchesStatus && matchesCampaign
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">スポンサー管理</h1>
          <p className="text-muted-foreground">
            スポンサーの登録、広告管理、効果測定を行えます
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新しいスポンサー
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
                placeholder="スポンサー名、メール、キャンペーンで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="カテゴリ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのカテゴリ</SelectItem>
                <SelectItem value="スポーツ用品">スポーツ用品</SelectItem>
                <SelectItem value="飲料">飲料</SelectItem>
                <SelectItem value="自動車">自動車</SelectItem>
                <SelectItem value="金融">金融</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="active">活動中</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
                <SelectItem value="completed">完了</SelectItem>
                <SelectItem value="cancelled">キャンセル</SelectItem>
              </SelectContent>
            </Select>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger>
                <SelectValue placeholder="キャンペーン" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのキャンペーン</SelectItem>
                <SelectItem value="2024春季大会">2024春季大会</SelectItem>
                <SelectItem value="2024夏季大会">2024夏季大会</SelectItem>
                <SelectItem value="2024年シーズン">2024年シーズン</SelectItem>
                <SelectItem value="2023年シーズン">2023年シーズン</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="justify-start">
              <Filter className="mr-2 h-4 w-4" />
              詳細フィルタ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sponsors Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>スポンサー一覧</CardTitle>
              <CardDescription>
                {filteredSponsors.length}件のスポンサーが見つかりました
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>スポンサー</TableHead>
                  <TableHead>カテゴリ</TableHead>
                  <TableHead>キャンペーン</TableHead>
                  <TableHead>掲載位置</TableHead>
                  <TableHead>予算・実績</TableHead>
                  <TableHead>効果測定</TableHead>
                  <TableHead>期間</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSponsors.map((sponsor) => (
                  <TableRow key={sponsor.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={sponsor.logo || undefined} alt={sponsor.name} />
                          <AvatarFallback>
                            {sponsor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{sponsor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {sponsor.contactEmail}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(sponsor.category)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{sponsor.campaign}</div>
                        <div className="text-xs text-muted-foreground">{sponsor.season}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getPositionBadge(sponsor.adPosition)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{formatCurrency(sponsor.spent)}</span>
                          <span className="text-muted-foreground">/ {formatCurrency(sponsor.budget)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${(sponsor.spent / sponsor.budget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span>{sponsor.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <MousePointer className="h-3 w-3 text-muted-foreground" />
                          <span>{sponsor.clicks.toLocaleString()}</span>
                          <span className="text-muted-foreground">({sponsor.ctr}%)</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{sponsor.startDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{sponsor.endDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sponsor.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditSponsor(sponsor)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            効果測定
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            ウェブサイト
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
