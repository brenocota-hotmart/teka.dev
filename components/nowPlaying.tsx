import useSWR from 'swr';

import { styled, keyframes } from '@theme'
import fetcher from '@/lib/fetcher';
import { NowPlayingSong } from '@/lib/types';
import { P } from '.';

function AnimatedBars() {
  const BarAnimation1 = keyframes({
    '0%': { transform: 'scaleY(1.0) translateY(0rem)' },
    '50%': { transform: 'scaleY(1.5) translateY(-0.082rem)' },
    '100%': { transform: 'scaleY(1.0) translateY(0rem)' },
  });

  const BarAnimation2 = keyframes({
    '0%': { transform: 'scaleY(1.0) translateY(0rem)' },
    '50%': { transform: 'scaleY(3) translateY(-0.083rem)' },
    '100%': { transform: 'scaleY(1.0) translateY(0rem)' },
  });

  const BarAnimation3 = keyframes({
    '0%': { transform: 'scaleY(1.0)  translateY(0rem)' },
    '50%': { transform: 'scaleY(0.5) translateY(0.37rem)' },
    '100%': { transform: 'scaleY(1.0)  translateY(0rem)' },
  });

  const AnimatedBarsStyled = styled('div', {
    width: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    gap: '3px'
  });
  
  const AnimatedBar = styled('span', {
    width: '$1',
    backgroundColor: '$slate11',
    willChange: 'transform',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  });

  return (
    <AnimatedBarsStyled>
      <AnimatedBar
        css={
          {
            height: '$2',
            opacity: .75,
            animationDuration: '1s',
            animationName: BarAnimation1.name,
          }
        }
      />

      <AnimatedBar
        css={
          {
            height: '$1',
            animationDelay: '.2s',
            animationDuration: '1.5s',
            animationName: BarAnimation2.name,
          }
        }
      />

      <AnimatedBar
        css={
          {
            height: '$3',
            opacity: .80,
            animationDelay: '.3s',
            animationDuration: '1.5s',
            animationName: BarAnimation3.name,
          }
        }
      />
    </AnimatedBarsStyled>
  );
}

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);

  const NowPlayingStyled = styled('div', {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    mb: '$8',
    width: '$full',
  
    '@desktop': {
      flexDirection: 'row',
      gap: '$2'
    },
  
    svg: {
      size: '$4'
    }
  });
  
  const NowPlayingInfo = styled('div', {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '$full',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  
    "@desktop": {
      flexDirection: 'row'
    }
  });
  
  const NowPlayingLink = styled('a', {
    color: '$slate12',
    textDecoration: 'underline',
    textDecorationColor: '$slate7',
    textUnderlineOffset: '.25rem',
    borderRadius: '$1',

  '&:hover': {
    backgroundColor: "$slate7",
    textDecoration: 'none',
  }
  });

  return (
    <NowPlayingStyled>
      {
        data?.songUrl ?
        (<AnimatedBars />) :
        (
          <svg className="h-4 w-4 ml-auto mt-[-2px]" viewBox="0 0 168 168">
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
        )
      }

      <NowPlayingInfo className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
        {
          data?.songUrl ? 
          (
            <NowPlayingLink
              className="capsize text-gray-800 dark:text-gray-200 font-medium  max-w-max truncate"
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </NowPlayingLink>
          ) :
          (
            <P margin={'none'}>
              Not Playing
            </P>
          )
        }

        <P
          css={{ color: '$slate11', mx: '$2', display: 'none', '@desktop': { display: 'block' } }}
          as="span"
          margin={'none'}
        >
          {' – '}
        </P>

        <P
          css={{ color: '$slate11' }}
          margin={'none'}
        >
          {data?.artist ?? 'Spotify'}
        </P>
      </NowPlayingInfo>
    </NowPlayingStyled>
  );
}
