import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        'container': '1920px'
      },
      minWidth: {
        'container': '375px'
      },
      height: {
        'swiper': '73vh',
      },
      width: {
        'swiper': '100%',
      },
      colors: {
        'primary': '#202231',     // 用於最重要的互動元素和強調點
        'secondary': '#868A8E',   // 輔助主色，用於次要互動元素
        'tertiary': '#D3AC2B',    // 第三級色彩，用於有層次的背景色、邊框等
        'quaternary': '#F4F3EA',  // 第四級色彩，可能用於特定狀態或分類
        'quinary': '#E94B48',     // 第五級色彩，可能用於警告或錯誤訊息
        'success': '#487FEC',     // 成功狀態顏色，用於成功訊息或完成狀態指示
        'warning': '#E94B48',     // 警告狀態顏色，用於需要用戶注意的訊息
        'danger': '#dc3545',      // 錯誤或危險狀態顏色，用於錯誤訊息或危險操作
        'info': '#0D0E0D',        // 信息狀態顏色，用於一般訊息提示
        'light': '#D3AC2B',       // 用於背景色或低對比度元素
        'dark': '#D3AC2B',        // 暗色調，用於文字或深色背景
        'hover': '#D19C1D',       // 用於滑鼠懸停時的顏色變化
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
};
export default config;
