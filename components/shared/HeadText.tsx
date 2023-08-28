import { ADLaM_Display} from 'next/font/google'


const adlam = ADLaM_Display({ subsets: ['latin'] , weight: "400"})

function HeadText({content}: {content: string}) {
  return (<h1 className={`${adlam.className} head-text text-slate-600`}>{content}</h1>)
}

export default HeadText


       