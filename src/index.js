import { Router } from '@core/router/Router'
import '@assets/scss/index.scss'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExcelPage } from '@/pages/ExcelPage'

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})


