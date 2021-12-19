module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["templates/**/*.twig","web/assets/js/main.js","web/assets/scss/*.scss"]
  },
  theme: {

    fontFamily: {
      sans: ['Moderne LL', 'sans-serif']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    },
    extend: {
      colors: {
        lightgrey: '#B8B8B8',
        lightergrey: '#E7E7E7',
        lightgreen: '#79D1B0',
        blockgreen: '#B2EABE',
        darkblue: '#0B3254',
        borderblue: 'rgba(11,50,84,0.5)',
        lightblue: '#C7C9D5',
        verylightblue: '#f4f3f7',
        hoverblue: '#7295AD',
        greyblue: 'rgba(199,201,213,0.44)',
        pastellyellow: '#F6EFA2',
        pastellbrown: '#ae7d74'
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 30s linear infinite',
      },
      // back to 25s
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      flex: {
        '0': '0 1 0%'
      },
      fontWeight: {
        500: 500
      },
      aspectRatio: {
        1280: '1280',
        568: '568',
        461: '461',
        575: '575',
        338: '338',
        1160: '1160',
        684: '684'
      },
      spacing: {
        gutter: '12px',
        'gutter-md': '15px',
        'gutter-lg': '15px',
        'gutter-xl': '20px',
        vsmall: '30px',
        'vsmall-md': '80px',
        vdefault: '58px',
        'vdefault-md': '131px',
        vbig: '80px',
        'vbig-md': '160px'
      },
      rotate: {
        '135': '135deg'
      },
      backgroundImage: {
        404: 'repeating-linear-gradient(#0B3254, #0B3254 15px, #79D1B0 15px, #79D1B0 30px)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens')
  ]
}