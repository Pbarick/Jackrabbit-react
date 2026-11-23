// Components read data through these hooks, never by importing sample data directly.
import { useMemo } from 'react'
import * as service from '../services/dashboardService.js'

export function usePerformance() {
  return useMemo(() => service.getPerformance(), [])
}

export function useAssets() {
  return useMemo(() => service.getAssets(), [])
}

export function useTrades() {
  return useMemo(() => service.getTrades(), [])
}

export function useReports() {
  return useMemo(() => service.getReports(), [])
}

export function useStepper() {
  return useMemo(() => service.getStepper(), [])
}

export function useStages() {
  return useMemo(() => service.getStages(), [])
}

export function useAccountTotal() {
  return useMemo(() => service.getAccountTotal(), [])
}

export function useGaugePercent() {
  return useMemo(() => service.getGaugePercent(), [])
}
