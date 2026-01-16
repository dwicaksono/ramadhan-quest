import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export interface NotificationOptions {
  body?: string
  icon?: string
  tag?: string
  silent?: boolean
}

// Persisted state for notification preference
const notificationEnabled = useStorage('rq-notification-enabled', false)

export function useNotification() {
  const isSupported = computed(() => 'Notification' in window)
  
  const notificationPermission = ref<NotificationPermission>(
    isSupported.value ? Notification.permission : 'denied'
  )

  /**
   * Request notification permission from the browser
   */
  async function requestPermission(): Promise<boolean> {
    if (!isSupported.value) {
      console.warn('[Notification] Not supported in this browser')
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      notificationPermission.value = permission
      notificationEnabled.value = permission === 'granted'
      
      if (permission === 'granted') {
        // Show test notification
        showNotification('Ramadhan Quest 🌙', {
          body: 'Notifikasi aktif! Kamu akan diingatkan saat waktu sholat.',
          icon: '/pwa-192x192.png'
        })
      }
      
      return permission === 'granted'
    } catch (error) {
      console.error('[Notification] Permission request failed:', error)
      return false
    }
  }

  /**
   * Show a native browser notification
   */
  function showNotification(title: string, options: NotificationOptions = {}): Notification | null {
    if (!isSupported.value) {
      console.warn('[Notification] Not supported in this browser')
      return null
    }

    if (notificationPermission.value !== 'granted') {
      console.warn('[Notification] Permission not granted')
      return null
    }

    try {
      const notification = new Notification(title, {
        icon: options.icon || '/pwa-192x192.png',
        body: options.body,
        tag: options.tag || 'ramadhan-quest',
        silent: options.silent ?? false
      })

      // Auto-close notification after 10 seconds
      setTimeout(() => notification.close(), 10000)

      // Focus the app when notification is clicked
      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      return notification
    } catch (error) {
      console.error('[Notification] Failed to show:', error)
      return null
    }
  }

  /**
   * Check if notifications are enabled and permitted
   */
  const isEnabled = computed(() => 
    isSupported.value && 
    notificationPermission.value === 'granted' && 
    notificationEnabled.value
  )

  /**
   * Toggle notification preference (after permission is granted)
   */
  function toggleNotification(enabled: boolean) {
    if (notificationPermission.value === 'granted') {
      notificationEnabled.value = enabled
    }
  }

  return {
    isSupported,
    notificationPermission,
    notificationEnabled,
    isEnabled,
    requestPermission,
    showNotification,
    toggleNotification
  }
}
