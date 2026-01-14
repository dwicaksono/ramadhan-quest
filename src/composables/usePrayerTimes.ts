import { ref, computed } from 'vue'
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan'
import { useStorage } from '@vueuse/core'

const PRAYER_METHODS = [
  { id: 'Singapore', name: 'Singapore (Standar Asia Tenggara)', method: CalculationMethod.Singapore },
  { id: 'MuslimWorldLeague', name: 'Muslim World League', method: CalculationMethod.MuslimWorldLeague },
  { id: 'Egyptian', name: 'Egyptian General Authority', method: CalculationMethod.Egyptian },
  { id: 'Karachi', name: 'Karachi (Hanafi)', method: CalculationMethod.Karachi },
  { id: 'UmmAlQura', name: 'Umm Al-Qura (Makkah)', method: CalculationMethod.UmmAlQura },
  { id: 'Dubai', name: 'Dubai', method: CalculationMethod.Dubai },
  { id: 'Qatar', name: 'Qatar', method: CalculationMethod.Qatar },
  { id: 'Kuwait', name: 'Kuwait', method: CalculationMethod.Kuwait },
  { id: 'MoonsightingCommittee', name: 'Moonsighting Committee', method: CalculationMethod.MoonsightingCommittee },
  { id: 'NorthAmerica', name: 'North America (ISNA)', method: CalculationMethod.NorthAmerica },
]

export function usePrayerTimes() {
  // Persisted State
  const coords = useStorage('rq-user-coords', {
    lat: -6.2088, // Default: Jakarta
    lng: 106.8456
  })
  
  const locationName = useStorage('rq-location-name', 'Jakarta')
  const selectedMethodId = useStorage('rq-prayer-method', 'Singapore')
  
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Calculate Times
  const times = computed(() => {
    const coordinates = new Coordinates(coords.value.lat, coords.value.lng)
    const date = new Date()
    
    const methodDef = PRAYER_METHODS.find(m => m.id === selectedMethodId.value) || PRAYER_METHODS[0]
    const params = methodDef.method()
    
    return new PrayerTimes(coordinates, date, params)
  })

  // Format helper
  const formattedTimes = computed(() => {
    if (!times.value) return null
    return {
      subuh: formatTime(times.value.fajr),
      terbit: formatTime(times.value.sunrise),
      dzuhur: formatTime(times.value.dhuhr),
      ashar: formatTime(times.value.asr),
      maghrib: formatTime(times.value.maghrib),
      isya: formatTime(times.value.isha),
    }
  })

  // Determine Next Prayer
  const upcomingPrayer = computed(() => {
    if (!times.value) return null
    
    // const now = new Date()
    const next = times.value.nextPrayer()
    
    // Adhan library returns 'none' if all prayers passed -> Get Tomorrow's Fajr
    if (next === 'none') {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const coordinates = new Coordinates(coords.value.lat, coords.value.lng)
      const methodDef = PRAYER_METHODS.find(m => m.id === selectedMethodId.value) || PRAYER_METHODS[0]
      const params = methodDef.method()
      const tomorrowTimes = new PrayerTimes(coordinates, tomorrow, params)
      
      return { name: 'Subuh', time: tomorrowTimes.fajr }
    }

    // Proper capitalization helper
    const map: Record<string, string> = {
      fajr: 'Subuh',
      sunrise: 'Terbit',
      dhuhr: 'Dzuhur',
      asr: 'Ashar',
      maghrib: 'Maghrib',
      isha: 'Isya'
    }

    const time = (times.value as any)[next] as Date
    const name = map[next] || next

    return { name, time }
  })

  function formatTime(date: Date) {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  // Request GPS (One-time action)
  async function detectLocation() {
    if (!navigator.geolocation) {
      error.value = "Geolocation not supported"
      return
    }

    isLoading.value = true
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation('Lokasi Saya', pos.coords.latitude, pos.coords.longitude)
        isLoading.value = false
      },
      (err) => {
        console.error(err)
        error.value = "Gagal mendeteksi lokasi"
        isLoading.value = false
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }

  // Manual Override
  function setLocation(name: string, lat: number, lng: number) {
    locationName.value = name
    coords.value = { lat, lng }
  }

  function setMethod(methodId: string) {
    selectedMethodId.value = methodId
  }

  return {
    times,
    formattedTimes,
    upcomingPrayer,
    locationName,
    selectedMethodId,
    availableMethods: PRAYER_METHODS,
    detectLocation,
    setLocation,
    setMethod,
    isLoading
  }
}
