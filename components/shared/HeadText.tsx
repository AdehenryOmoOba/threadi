import { ADLaM_Display} from 'next/font/google'


const adlam = ADLaM_Display({ subsets: ['latin'] , weight: "400"})

function HeadText({content}: {content: string}) {
  return (<h1 className={`${adlam.className} head-text bg-gradient-to-t from-[#020617] via-[#334155] to-[#475569] bg-clip-text text-transparent inline-block`}>{content}</h1>)
}

export default HeadText