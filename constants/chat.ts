export const CHAT_CONSTANTS = {
  STORAGE_KEY: "chat-messages",
  TIME_FORMAT: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  ANIMATION_DELAYS: {
    FIRST: 0,
    SECOND: 100,
    THIRD: 200
  }
} as const;

export const CHAT_STYLES = {
  COLORS: {
    PRIMARY: 'purple-600',
    SECONDARY: 'purple-700',
    SUCCESS: 'green-400',
    GRAY: 'gray-200',
    GRAY_LIGHT: 'gray-100',
    GRAY_DARK: 'gray-400'
  },
  SIZES: {
    AVATAR_SM: 'w-8 h-8',
    AVATAR_MD: 'w-10 h-10',
    AVATAR_LG: 'w-12 h-12',
    AVATAR_XL: 'w-16 h-16'
  }
} as const; 