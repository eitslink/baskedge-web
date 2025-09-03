'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { APP_CONFIG } from '@/constants'
import {
  Gamepad2,
  Users,
  BarChart3,
  Calendar,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
} from 'lucide-react'

export default function Home() {
  const [user, setUser] = useState<{
    name: string
    email: string
    avatar?: string
  } | null>(null)

  const handleLogin = () => {
    // ダミーログイン機能
    setUser({
      name: 'テストユーザー',
      email: 'test@example.com',
      avatar: undefined,
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const features = [
    {
      icon: Gamepad2,
      title: '試合管理',
      description: '試合の日程作成、会場割当、ロスター管理、結果入力まで一元管理',
    },
    {
      icon: Users,
      title: 'チーム・選手管理',
      description: 'チーム情報、選手登録、背番号管理、出場可否申請の効率化',
    },
    {
      icon: BarChart3,
      title: '統計・分析',
      description: 'リアルタイム統計、選手ランキング、チーム戦績の自動集計',
    },
    {
      icon: Calendar,
      title: 'スケジュール管理',
      description: '試合日程、会場予約、審判アサインの統合管理',
    },
    {
      icon: Trophy,
      title: '順位表・ランキング',
      description: 'リーグ順位表、個人成績ランキングの自動更新',
    },
    {
      icon: Star,
      title: 'タイムライン',
      description: 'プレイバイプレイ記録、得点・アシスト・リバウンドの詳細記録',
    },
  ]

  const benefits = [
    '試合運営の効率化と自動化',
    'リアルタイム統計の可視化',
    'チーム間の情報共有の促進',
    'ファン向け情報の公開',
    '審判・スタッフの連携強化',
    'データドリブンな運営',
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4">
                バスケットボール特化プラットフォーム
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                バスケットボール運営を
                <span className="text-primary"> デジタル化</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                {APP_CONFIG.DESCRIPTION}
                <br />
                試合管理から統計分析まで、リーグ運営に必要な機能を一元化
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" onClick={handleLogin} className="text-lg px-8">
                  無料で始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Play className="mr-2 h-5 w-5" />
                  デモを見る
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                リーグ運営に必要な機能がすべて揃っています
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                バスケットボール競技に特化した機能で、効率的な運営を実現
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                なぜBaskEdgeを選ぶのか
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                バスケットボール競技に特化した設計で、運営効率を最大化
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                今すぐ始めましょう
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                リーグ運営の効率化を実現するBaskEdgeで、新しいバスケットボール体験を
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" onClick={handleLogin} className="text-lg px-8">
                  無料で始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  お問い合わせ
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
